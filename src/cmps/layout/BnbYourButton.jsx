import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export function BnbYourButton() {
  const user = useSelector((storeState) => storeState.userModule.user);
  const showHostNotification = useSelector(
    (storeState) => storeState.userModule.showHostNotification
  );

  return (
    <>
      {user && user.isHost ? (
        <NavLink to="host/listings" className="bnb-your-button">
          {showHostNotification && <div className="notification-circle"></div>}
          Manage hosting
        </NavLink>
      ) : (
        <NavLink to="host/listing/edit" className="bnb-your-button">
          Bnb your home
        </NavLink>
      )}
    </>
  );
}
