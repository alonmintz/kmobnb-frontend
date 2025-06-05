import pastTripsIcon from "../../assets/img/trips/past-trips-icon.png";
import activeTripsIcon from "../../assets/img/trips/active-trips-icon.png";
import futureTripsIcon from "../../assets/img/trips/future-trips-icon.png";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { orderService } from "../../services/order";
import { StayTripPreview } from "../../cmps/stay/StayTripPreview";
import {
  TRIP_NOTIFICATION,
  userActions,
} from "../../store/actions/user.actions";

export function Trips() {
  const user = useSelector((storeState) => storeState.userModule.user);
  const [userOrders, setUserOrders] = useState(
    orderService.getEmptyUserOrders()
  );
  const [tripsToDisplay, setTripsToDisplay] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [timeChosen, setTimeChosen] = useState("future");

  useEffect(() => {
    userActions.setUserNotification({
      notificationType: TRIP_NOTIFICATION,
      isNotified: false,
    });
    loadOrders();
  }, []);

  useEffect(() => {
    setTripsToDisplay(userOrders[timeChosen]);
  }, [userOrders, timeChosen]);

  async function loadOrders() {
    if (user) {
      setIsLoading(true);
      try {
        const orders = await orderService.getOrdersByUserId(user._id);
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
                key={trip._id}
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
