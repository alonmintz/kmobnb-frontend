import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import { stayService } from "../../services/stay";
import { subDays, format } from "date-fns";
import starIcon from "../../assets/img/rating-star.svg";
import visaIcon from "../../assets/img/order/visa.svg";
import { orderService } from "../../services/order/order.service.local";
import { LoginSignupModal } from "../loginSignup/LoginSignupModal";

//TODO: move to order service:
const DAILY_FEE = 4;

export function OrderPage() {
  const [isLoading, setIsLoading] = useState(true);
  const loggedInUser = useSelector((storeState) => storeState.userModule.user);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();
  const [stayToOrder, setStayToOrder] = useState();
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const startDate = new Date(searchParams.get("startDate")) || null;
  const endDate = new Date(searchParams.get("endDate")) || null;
  const adultsCount = +searchParams.get("adults") || 0;
  const childrenCount = +searchParams.get("children") || 0;
  const infantsCount = +searchParams.get("infants") || 0;
  const petsCount = +searchParams.get("pets") || 0;

  const nightsCount = getNumberOfNights();
  const guestsDisplayStr = getGuestsDisplayStr();
  const datesDisplayStr = getDatesDisplayStr();

  useEffect(() => {
    loadStay();
  }, [params.stayId]);

  async function loadStay() {
    setIsLoading(true);
    try {
      const stay = await stayService.getById(params.stayId);
      setStayToOrder(stay);
    } catch (err) {
      alert("Error loading your request");
    } finally {
      setIsLoading(false);
    }
  }

  function getNumberOfNights() {
    if (!startDate || !endDate) return 0;

    const msPerNight = 1000 * 60 * 60 * 24;
    const diffInMs = endDate - startDate;

    const nights = Math.round(diffInMs / msPerNight);
    return nights > 0 ? nights : 0;
  }

  function getGuestsDisplayStr() {
    const guestsDisplayArray = [];
    if (adultsCount > 0) {
      guestsDisplayArray.push(
        `${adultsCount} adult${adultsCount > 1 ? "s" : ""}`
      );
    }
    if (childrenCount > 0) {
      guestsDisplayArray.push(
        `${childrenCount} child${childrenCount > 1 ? "ren" : ""}`
      );
    }
    if (infantsCount > 0) {
      guestsDisplayArray.push(
        `${infantsCount} infant${infantsCount > 1 ? "s" : ""}`
      );
    }
    if (petsCount > 0) {
      guestsDisplayArray.push(`${petsCount} pet${petsCount > 1 ? "s" : ""}`);
    }
    return guestsDisplayArray.length > 0
      ? guestsDisplayArray.join(", ")
      : "No guests to show";
  }

  function getDatesDisplayStr() {
    if (!startDate || !endDate || isNaN(startDate) || isNaN(endDate))
      return "No dates to show";

    const sameMonth = startDate.getMonth() === endDate.getMonth();
    const sameYear = startDate.getFullYear() === endDate.getFullYear();

    if (sameMonth && sameYear) {
      return `${format(startDate, "MMM d")} - ${format(endDate, "d, yyyy")}`;
    } else if (sameYear) {
      return `${format(startDate, "MMM d")} – ${format(
        endDate,
        "MMM d, yyyy"
      )}`;
    } else {
      return `${format(startDate, "MMM d, yyyy")} – ${format(
        endDate,
        "MMM d, yyyy"
      )}`;
    }
  }

  function getDayBeforeStr() {
    if (!startDate || isNaN(startDate)) return "";

    const dayBefore = subDays(startDate, 1);
    return format(dayBefore, "MMM d");
  }

  if (isLoading || !stayToOrder) return <div className="loader">loading</div>;

  const {
    _id,
    name,
    imgUrls,
    price: pricePerNight,
    host,
    reviews,
  } = stayToOrder;

  function getAverageRate() {
    const starSum = reviews.reduce((acc, review) => acc + review.starsRate, 0);
    const avg = starSum / reviews.length;
    return parseFloat(avg.toFixed(2));
  }

  const averageRate = getAverageRate();
  const stayImgUrl = imgUrls[0];
  const pricePerNights = Math.imul(pricePerNight, nightsCount);
  const servicePrice = Math.imul(DAILY_FEE, nightsCount);
  const totalPrice = pricePerNights + servicePrice;

  const Payment = () => {
    const [selected, setSelected] = useState("full");
    const firstPayment = Math.ceil(totalPrice * 0.3);
    const secondPayment = totalPrice - firstPayment;

    function getWeekBeforeStr() {
      if (!startDate || isNaN(startDate)) return "";

      const weekBefore = subDays(startDate, 7);
      return format(weekBefore, "MMM d");
    }

    return (
      <section className="payment">
        <section className="payment-radio payment-item">
          <h2 className="payment-title"> Choose when to pay</h2>
          <div className="payment-options">
            <label
              className={`option ${selected === "full" ? "selected" : ""}`}
            >
              <div className="content">
                <div className="title">{`Pay $${totalPrice} now`}</div>
              </div>
              <input
                type="radio"
                name="payment"
                value="full"
                checked={selected === "full"}
                onChange={() => setSelected("full")}
              />
            </label>

            <label
              className={`option ${selected === "partial" ? "selected" : ""}`}
            >
              <div className="content">
                <div className="title">Pay part now, part later</div>
                <div className="subtitle">
                  <span>{`$${firstPayment} now, $${secondPayment} charged on ${getWeekBeforeStr()}. No extra fees.`}</span>{" "}
                  <span className="link">More info</span>
                </div>
              </div>
              <input
                type="radio"
                name="payment"
                value="partial"
                checked={selected === "partial"}
                onChange={() => setSelected("partial")}
              />
            </label>
          </div>
        </section>
        <section className="payment-method payment-item">
          <h2 className="payment-title"> Payment method</h2>
          <span className="method">
            <img className="method-icon" src={visaIcon} alt="method-icon" />
            <span className="method-number">****</span>
          </span>
          <button className="change-btn">change</button>
        </section>
      </section>
    );
  };

  const MiniStayPreview = () => (
    <section className="mini-stay-preview order-item">
      <img className="stay-img" src={stayImgUrl} alt="stay-img" />
      <div className="details">
        <h2 className="stay-name">{name}</h2>
        <span className="avg-rate">
          <img src={starIcon} />
          <span>
            {averageRate}
            {`(${reviews.length})`}
          </span>
        </span>
        {host.isSuperhost && <span className="super-host">Superhost</span>}
      </div>
      <div className="cancel-desc">
        <h4 className="title">Free cancellation</h4>
        <span className="desc">{`Cancel before ${getDayBeforeStr()} for a full refund.`}</span>
      </div>
    </section>
  );

  const PriceDetails = () => (
    <section className="price-details order-item">
      <div className="trip-details">
        <h4 className="title">Trip details</h4>
        <h4 className="desc">{datesDisplayStr}</h4>
        <h4 className="desc">{guestsDisplayStr}</h4>
      </div>
      <div className="price-calc">
        <h4 className="title">price details</h4>
        <h4 className="desc">
          <span>{`$${pricePerNight}x${nightsCount} night${
            nightsCount > 1 && "s"
          }`}</span>
          <span>{`$${pricePerNights}`}</span>
        </h4>
        <h4 className="desc">
          <span>Service fee</span>
          <span>{`$${servicePrice}`}</span>
        </h4>
      </div>
      <div className="total">
        <h4 className="title">
          <span>Total</span>
          <span>{`$${totalPrice}`}</span>
        </h4>
      </div>
    </section>
  );

  function onSubmit() {
    if (isOrderComplete) {
      navigate("/");
    } else {
      submitOrder();
    }
  }

  async function submitOrder() {
    const orderToSave = {
      userId: loggedInUser._id,
      userFullname: loggedInUser.fullname,
      userImgUrl: loggedInUser.imgUrl,
      stayName: name,
      stayId: _id,
      startDate,
      endDate,
      price: totalPrice,
      guests: +searchParams.get("capacity") || 0,
    };
    await orderService.save(orderToSave);
    setIsOrderComplete(true);
  }

  function renderOrderButton() {
    if (!loggedInUser) {
      return (
        <button className="submit-btn" onClick={() => setIsLoginModalVisible(true)}>
          Please login
        </button>
      );
    }
    return isOrderComplete ? (
      <button className="submit-btn completed" onClick={onSubmit}>
        Reservation completed
      </button>
    ) : (
      <button className="submit-btn" onClick={onSubmit}>
        Confirm and pay
      </button>
    );
  }

  return (
    <section className="order-page">
      {!isLoginModalVisible ? "" : <LoginSignupModal onClose={() => setIsLoginModalVisible(false)} />}
      <div className="back-container">
        <Link
          className="back-link"
          to={{ pathname: `/stay/${_id}`, search: location.search }}
        >
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              aria-hidden="true"
              role="presentation"
              focusable="false"
              style={{
                display: "block",
                fill: "none",
                height: "16px",
                width: "16px",
                stroke: "currentcolor",
                strokeWidth: "4",
                overflow: "visible",
              }}
            >
              <g fill="none">
                <path d="M4 16h26M15 28 3.7 16.7a1 1 0 0 1 0-1.4L15 4"></path>
              </g>
            </svg>
          </button>
        </Link>
      </div>
      <div className="order-container">
        <h1 className="title">Confirm and pay</h1>
        <div className="payment-details-container">
          <div className="payment-container">
            <Payment />
            {renderOrderButton()}
          </div>
          <div className="details-container">
            <MiniStayPreview />
            <PriceDetails />
          </div>
        </div>
      </div>
    </section>
  );
}
