import pastTripsIcon from "../../assets/img/trips/past-trips-icon.png";
import activeTripsIcon from "../../assets/img/trips/active-trips-icon.png";
import futureTripsIcon from "../../assets/img/trips/future-trips-icon.png";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { orderService } from "../../services/order";
import { StayTripPreview } from "../../cmps/stay/StayTripPreview";

export function Trips() {
  const user = useSelector((storeState) => storeState.userModule.user);
  const [userOrders, setUserOrders] = useState(
    orderService.getEmptyUserOrders()
  );
  const [tripsToDisplay, setTripsToDisplay] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [timeChosen, setTimeChosen] = useState("future");

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    console.log(timeChosen);

    setTripsToDisplay(userOrders[timeChosen]);
    // window.scrollTo(0, 0);
  }, [userOrders, timeChosen]);

  useEffect(() => {
    console.log({ tripsToDisplay });
  }, [tripsToDisplay]);

  async function loadOrders() {
    if (user) {
      setIsLoading(true);
      try {
        const orders = await orderService.getOrdersByUserId(user._id);
        console.log({ orders });
        setUserOrders(orders);
      } catch (err) {
        console.log("error loading user orders");
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <section className="trips">
      <nav className="trips-side-nav">
        <h2 className="title">My trips</h2>
        <div className="category-container">
          <div
            className={`trip-time-category ${
              timeChosen === "future" ? "chosen" : ""
            }`}
            onClick={() => setTimeChosen("future")}
          >
            <img
              className="time-category-icon"
              src={futureTripsIcon}
              alt="future-trips-icon"
            />
            <span>Future trips</span>
          </div>

          <div
            className={`trip-time-category ${
              timeChosen === "active" ? "chosen" : ""
            }`}
            onClick={() => setTimeChosen("active")}
          >
            <img
              className="time-category-icon"
              src={activeTripsIcon}
              alt="active-trips-icon"
            />
            <span>Active trips</span>
          </div>
          <div
            className={`trip-time-category ${
              timeChosen === "past" ? "chosen" : ""
            }`}
            onClick={() => setTimeChosen("past")}
          >
            <img
              className="time-category-icon"
              src={pastTripsIcon}
              alt="past-trips-icon"
            />
            <span>Past trips</span>
          </div>
        </div>
      </nav>
      <div className="trips-list-container">
        <h2 className="title">{`${timeChosen} trips`}</h2>
        <div className="trips-list">
          {tripsToDisplay.length ? (
            tripsToDisplay.map((trip) => (
              <StayTripPreview
                key={trip.stayId}
                trip={trip}
                isPast={timeChosen === "past"}
              />
            ))
          ) : (
            <span>{`No ${timeChosen} trips to show`}</span>
          )}
        </div>
      </div>
    </section>
  );
}
