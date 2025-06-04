import starIcon from "../../assets/img/rating-star.svg";
import { useEffect, useRef, useState } from "react";
import { useEffectUpdate } from "../../customHooks/useEffectUpdate";
import { Amenity } from "../../cmps/stay/Amenity";
import { StayDatePicker } from "../../cmps/stay/StayDatePicker";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { stayService } from "../../services/stay";
import { ReserveCard } from "../../cmps/order/ReserveCard";
import { StayDetailsMap } from "../../cmps/stay/StayDetailsMap";
import { format } from "date-fns";
import { Modal } from "../../cmps/general/Modal";
import { useSelector } from "react-redux";
import { LoginSignupModal } from "../loginSignup/LoginSignupModal";
import { ReviewList } from "../../cmps/review/ReviewList";
import { RatingsDisplay } from "../../cmps/review/RatingsDisplay";
import { ReviewDisplay } from "../../cmps/review/ReviewDisplay";
import { StayDetailsSkeleton } from "../../cmps/skeleton/StayDetailsSkeleton";
import { userActions } from "../../store/actions/user.actions";
import { userService } from "../../services/user";

export function StayDetails() {
  const user = useSelector((storeState) => storeState.userModule.user);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();
  const [stay, setStay] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [modalContentType, setModalContentType] = useState("");
  const [datesRange, setDatesRange] = useState([
    searchParams.get("startDate"),
    searchParams.get("endDate"),
  ]);
  const [isDatesChosen, setIsDatesChosen] = useState(checkDatesRange());
  const [isWishlisted, setIsWishlisted] = useState(checkIsWishlisted());
  const [showAnchorNav, setShowAnchorNav] = useState(false);
  const [showMiniReserve, setShowMiniReserve] = useState(false);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);

  const imgSectionRef = useRef();
  const datePickerSectionRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      initUserWishlist();
    }
  }, []);

  async function initUserWishlist() {
    const wishlistFromDB = await userService.getUserWishlist();
    userActions.setUserWishlist(wishlistFromDB);
  }

  useEffect(() => {
    loadStay();
  }, [params.stayId]);

  useEffect(() => {
    setIsWishlisted(checkIsWishlisted());
  }, [user, stay]);

  useEffect(() => {
    function handleScroll() {
      const el = imgSectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const isVisible = rect.bottom > 80;
      setShowAnchorNav(!isVisible);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsDatesChosen(checkDatesRange());
    if (datesRange[0] && datesRange[1]) {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set("startDate", datesRange[0]);
        params.set("endDate", datesRange[1]);
        return params;
      });
    }
  }, [datesRange]);

  useEffect(() => {
    setDatesRange([searchParams.get("startDate"), searchParams.get("endDate")]);
  }, [searchParams]);

  useEffectUpdate(() => {
    setIsDetailsModalOpen(modalContentType ? true : false);
  }, [modalContentType]);

  async function loadStay() {
    setIsLoading(true);
    try {
      const stay = await stayService.getById(params.stayId);
      setStay(stay);
    } catch (err) {
      alert("Error loading your request");
      navigate("/");
    } finally {
      setIsLoading(false);
    }
  }

  function checkIsWishlisted() {
    if (!user || !stay) return false;

    return user.wishlist.some((wishStay) => wishStay.stayId === stay._id);
  }

  function onHeartClick() {
    if (!user) {
      setIsLoginModalVisible(true);
      return;
    }
    triggerWishlistAction();
  }

  function triggerWishlistAction() {
    if (isWishlisted) {
      userActions.removeFromWishlist(stay._id);
    } else {
      userActions.addToWishlist(stay._id);
    }
  }

  function checkDatesRange() {
    return datesRange[0] && datesRange[1];
  }

  function toggleIsDetailsModalOpen() {
    setIsDetailsModalOpen((prev) => !prev);
  }

  function handleDatesSelect({ dates }) {
    setDatesRange([dates[0], dates[1]]);
  }

  function getNumberOfNights() {
    const [startDateStr, endDateStr] = datesRange;
    if (!startDateStr || !endDateStr) return 0;

    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    const msPerNight = 1000 * 60 * 60 * 24;
    const diffInMs = endDate - startDate;

    const nights = Math.round(diffInMs / msPerNight);
    return nights > 0 ? nights : 0;
  }

  function renderDatePickerTitle() {
    if (!datesRange[0] && !datesRange[1]) return "Select check-in date";
    if (datesRange[0] && !datesRange[1]) return "Select checkout date";
    const number = getNumberOfNights();
    if (datesRange[0] && datesRange[1])
      return `${number} night${number > 1 ? "s" : ""} in ${loc.city}`;
  }

  function renderDatePickerSubTitle() {
    if (!datesRange[0] && !datesRange[1])
      return "When do you want to start your stay?";
    if (datesRange[0] && !datesRange[1]) return "When do you wish to leave?";
    if (datesRange[0] && datesRange[1])
      return `${format(datesRange[0], "MMM d, yyyy")} - ${format(
        datesRange[1],
        "MMM d, yyyy"
      )}`;
  }

  if (isLoading || !stay) return <StayDetailsSkeleton />;

  const {
    name,
    imgUrls,
    price,
    summary,
    capacity,
    amenities,
    bathrooms,
    bedrooms,
    roomType,
    host,
    loc,
    reviewsData,
    occupancy,
  } = stay;

  function getBlockedRanges() {
    return occupancy.map(({ startDate, endDate }) => [
      new Date(startDate),
      new Date(endDate),
    ]);
  }

  function onReserveClick() {
    if (!isDatesChosen) {
      datePickerSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      const queryString = searchParams.toString();
      navigate(`/order/${stay._id}/?${queryString}`);
    }
  }

  function MiniReserve() {
    return (
      <div className="mini-reserve">
        <div className="mini-details">
          <h4 className="title">
            {isDatesChosen ? (
              <>
                ${price} <span>night</span>
              </>
            ) : (
              "Add dates for prices"
            )}
          </h4>
          <ol className="mini-details-ol">
            <li>
              <span className="mini-avg-rate">
                <img src={starIcon} />
                {reviewsData.avgStarsRate}
              </span>
            </li>
            <li>
              <span className="mini-reviews">
                {reviewsData.reviews.length
                  ? `${reviewsData.reviews.length} reviews`
                  : "no reviews"}
                {}
              </span>
            </li>
          </ol>
        </div>
        <button className="reserve-btn" onClick={onReserveClick}>
          <span>{isDatesChosen ? "Reserve" : "Check availability"}</span>
        </button>
      </div>
    );
  }

  function Conclusion({ conclusion }) {
    const { title, desc, svg } = conclusion;
    return (
      <div className="conclusion">
        <div className="conclusion-icon">{svg}</div>
        <div className="conclusion-details">
          <h3>{title}</h3>
          <span>{desc}</span>
        </div>
      </div>
    );
  }

  function Summary({ summary, onShowMore }) {
    const isSummaryLong = summary.length > 300;
    const summaryToDisplay = isSummaryLong
      ? summary.slice(0, 300) + "..."
      : summary;
    return (
      <div className="summary">
        <p>{summaryToDisplay}</p>
        {isSummaryLong && (
          <button className="show-more-btn" onClick={onShowMore}>
            Show more
          </button>
        )}
      </div>
    );
  }

  function AmenitiesPreview({ amenities, onShowMore }) {
    const isAmenitiesLong = amenities.length > 10;
    const amenitiesToDisplay = isAmenitiesLong
      ? amenities.slice(0, 10)
      : amenities;
    return (
      <div className="amenities-preview">
        <h2>What this place offers</h2>
        <div className="amenities-preview-display">
          {amenitiesToDisplay.map((amenity) => (
            <Amenity key={amenity} amenityName={amenity} />
          ))}
        </div>
        {isAmenitiesLong && (
          <button className="show-more-btn" onClick={onShowMore}>
            Show all {amenities.length} amenities
          </button>
        )}
      </div>
    );
  }

  function DynamicDetailsModal({ children }) {
    return (
      <Modal
        lockScroll
        isBackdrop
        onClose={() => {
          setIsDetailsModalOpen(false);
          setModalContentType("");
        }}
      >
        <section className="stay-details-modal">{children}</section>
      </Modal>
    );
  }

  function renderModalContent() {
    switch (modalContentType) {
      case "summary":
        return (
          <div className="summary-modal content">
            <div className="summary-container">
              <h2 className="title">About this space</h2>
              <p>{summary}</p>
            </div>
          </div>
        );

      case "amenities":
        return (
          <div className="amenities-modal content">
            <div className="amenities-container">
              <h2 className="title"> What this place offers</h2>
              {amenities.map((amenity) => (
                <div key={amenity} className="amenity-wrapper">
                  <Amenity amenityName={amenity} />
                </div>
              ))}
            </div>
          </div>
        );

      case "reviews":
        return (
          <div className="reviews-modal content">
            <div className="ratings-container">
              <h2 className="title">
                <img src={starIcon} />
                <span>{reviewsData.avgStarsRate}</span>
              </h2>
              <RatingsDisplay
                categoryRatings={reviewsData.categoryRatings}
                starsRatings={reviewsData.starsRatings}
              />
            </div>
            <div className="reviews-container">
              <h2 className="title">{`${reviewsData.reviews.length} reviews`}</h2>
              {reviewsData.reviews.length &&
                reviewsData.reviews.map((review) => (
                  <ReviewDisplay key={review.id} review={review} />
                ))}
            </div>
          </div>
        );

      default:
        break;
    }
  }

  return (
    <>
      {!isLoginModalVisible ? (
        ""
      ) : (
        <LoginSignupModal onClose={() => setIsLoginModalVisible(false)} />
      )}
      {showAnchorNav && (
        <header className="anchor-header layout secondary full">
          <div className="anchor-header-container">
            <nav className="anchor-nav">
              <a className="anchor-link" href="#img-section">
                <span className="anchor-name">Photos</span>
                <span className="anchor-hover-line"></span>
              </a>
              <a className="anchor-link" href="#amenities-container">
                <span className="anchor-name">Amenities</span>
                <span className="anchor-hover-line"></span>
              </a>
              <a className="anchor-link" href="#reviews-section">
                <span className="anchor-name">Reviews</span>
                <span className="anchor-hover-line"></span>
              </a>
              <a className="anchor-link" href="#map-section">
                <span className="anchor-name">Location</span>
                <span className="anchor-hover-line"></span>
              </a>
            </nav>
            {showMiniReserve && <MiniReserve />}
          </div>
        </header>
      )}
      <section className="stay-details">
        <section className="title-section">
          <h1>{name}</h1>
          <button className="save-btn" onClick={onHeartClick}>
            <div className={`heart-icon ${isWishlisted ? "clicked" : ""}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                aria-hidden="true"
                role="presentation"
                focusable="false"
              >
                <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path>
              </svg>
            </div>
            <span className="save-btn-text">{`Save${
              isWishlisted ? "d" : ""
            }`}</span>
          </button>
        </section>
        <section className="img-section" id="img-section" ref={imgSectionRef}>
          {imgUrls.slice(0, 5).map((url, idx) => (
            <div key={url} className={`img-wrapper img-${idx + 1}`}>
              <img src={url} alt={`stay-img-${idx}`} />
            </div>
          ))}
        </section>
        <section className="details-section">
          <div className="reserve-container">
            <ReserveCard
              stay={stay}
              datesRange={datesRange}
              blockedRanges={getBlockedRanges()}
              onDateSelect={handleDatesSelect}
              setShowMiniReserve={setShowMiniReserve}
            />
          </div>
          <div className="room-details-container">
            <h2 className="room-type">{`${roomType} in ${loc.city}, ${loc.country}`}</h2>
            <ol className="room-details-ol">
              <li>
                {`${capacity} guest`}
                {capacity > 1 && "s"}
              </li>
              <li>
                {`${bedrooms} bedroom`}
                {bedrooms > 1 && "s"}
              </li>
              <li>
                {`${bathrooms} bath`}
                {bathrooms > 1 && "s"}
              </li>
            </ol>
            <span className="avg-rate">
              <img src={starIcon} />
              {reviewsData.avgStarsRate}
            </span>
          </div>
          <div className="host-conclusions-grid">
            <div className="host-container">
              <img src={host.imgUrl} alt={"host-img"} />
              <div className="host-desc">
                <h2 className="host">{`Hosted by ${host.fullname}`}</h2>
                {host.isSuperhost && (
                  <span className="super-host">Superhost</span>
                )}
              </div>
            </div>
            <div className="conclusions-container">
              {conclusionList.map((conclusion) => (
                <Conclusion key={conclusion.title} conclusion={conclusion} />
              ))}
            </div>
          </div>
          <div className="summary-container">
            <Summary
              summary={summary}
              onShowMore={() => {
                setModalContentType("summary");
              }}
            />
          </div>
          <div className="amenities-container" id="amenities-container">
            <AmenitiesPreview
              amenities={amenities}
              onShowMore={() => {
                setModalContentType("amenities");
              }}
            />
          </div>
          <div ref={datePickerSectionRef} className="date-picker-container">
            <h2 className="date-picker-title">{renderDatePickerTitle()}</h2>
            <h2 className="date-picker-subtitle">
              {renderDatePickerSubTitle()}
            </h2>
            <StayDatePicker
              dates={datesRange}
              blockedRanges={getBlockedRanges()}
              onSelect={handleDatesSelect}
            />
          </div>
        </section>
        <section className="reviews-section" id="reviews-section">
          <h2 className="title reviews-title">
            <span className="avg-rate">
              <img src={starIcon} />
              {reviewsData.avgStarsRate}
            </span>
            <span className="dot"></span>
            <span>{`${reviewsData.reviews.length} reviews`}</span>
          </h2>
          <RatingsDisplay
            categoryRatings={reviewsData.categoryRatings}
            starsRatings={reviewsData.starsRatings}
          />
          <ReviewList
            reviews={reviewsData.reviews}
            isPreview
            onShowMore={() => setModalContentType("reviews")}
          />
          {reviewsData.reviews.length ? (
            <button
              className="show-more-btn"
              onClick={() => {
                setModalContentType("reviews");
              }}
            >
              Show all {reviewsData.reviews.length} reviews
            </button>
          ) : (
            ""
          )}
        </section>
        <section className="map-section" id="map-section">
          <StayDetailsMap
            city={loc.city}
            country={loc.country}
            lat={loc.lat}
            lng={loc.lng}
          />
        </section>
        {isDetailsModalOpen && (
          <DynamicDetailsModal>{renderModalContent()}</DynamicDetailsModal>
        )}
      </section>
    </>
  );
}

const conclusionList = [
  {
    title: "Peace and quiet",
    desc: "This home is in a quiet area.",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        aria-hidden="true"
        role="presentation"
        focusable="false"
        style={{
          display: "block",
          height: "24px",
          width: "24px",
          fill: "currentcolor",
        }}
      >
        <path d="M16 0a12 12 0 0 1 12 12c0 6.34-3.81 12.75-11.35 19.26l-.65.56-1.08-.93C7.67 24.5 4 18.22 4 12 4 5.42 9.4 0 16 0zm0 2C10.5 2 6 6.53 6 12c0 5.44 3.25 11.12 9.83 17.02l.17.15.58-.52C22.75 23 25.87 17.55 26 12.33V12A10 10 0 0 0 16 2zm0 5a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"></path>
      </svg>
    ),
  },
  {
    title: "Self check-in",
    desc: "Check yourself in with the lockbox.",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        aria-hidden="true"
        role="presentation"
        focusable="false"
        style={{
          display: "block",
          height: "24px",
          width: "24px",
          fill: "currentcolor",
        }}
      >
        <path d="M24.33 1.67a2 2 0 0 1 2 1.85v24.81h3v2H2.67v-2h3V3.67a2 2 0 0 1 1.85-2h.15zm-4 2H7.67v24.66h12.66zm4 0h-2v24.66h2zm-7 11a1.33 1.33 0 1 1 0 2.66 1.33 1.33 0 0 1 0-2.66z"></path>
      </svg>
    ),
  },
  {
    title: "Park for free",
    desc: "This is one of the few places in the area with free parking.",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        aria-hidden="true"
        role="presentation"
        focusable="false"
        style={{
          display: "block",
          height: "24px",
          width: "24px",
          fill: "currentcolor",
        }}
      >
        <path d="M16 1a15 15 0 1 1 0 30 15 15 0 0 1 0-30zm0 2a13 13 0 1 0 0 26 13 13 0 0 0 0-26zm2 5a5 5 0 0 1 .22 10H13v6h-2V8zm0 2h-5v6h5a3 3 0 0 0 .18-6z"></path>
      </svg>
    ),
  },
];
