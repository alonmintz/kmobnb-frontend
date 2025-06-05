import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import logo from "../../assets/img/logo.png";
import guestUnknown from "../../assets/img/guest-unknown.svg";
import { NavMenu } from "../layout/NavMenu";
import { BnbYourButton } from "./BnbYourButton";

export function HeaderUser({ viewport }) {
  const user = useSelector((storeState) => storeState.userModule.user);
  const showTripsNotification = useSelector(
    (storeState) => storeState.userModule.showTripsNotification
  );
  const [isNavMenuVisible, setIsNavMenuVisible] = useState(false);
  const userIconRef = useRef();

  function handleUserIconClick() {
    if (isNavMenuVisible) {
      setIsNavMenuVisible(false);
    } else {
      setIsNavMenuVisible(true);
    }
  }

  return (
    <>
      <section className="header-top">
        <NavLink className={"logo-link"} to={""}>
          <div className="logo-container">
            <img className="logo" src={logo} alt="logo" />
            {viewport === "desktop" && <h3>kmobnb</h3>}{" "}
          </div>
        </NavLink>
        <nav>
          <BnbYourButton />
          <button
            className="user-info"
            onClick={handleUserIconClick}
            ref={userIconRef}
          >
            {showTripsNotification && (
              <div className="notification-circle"></div>
            )}
            <FontAwesomeIcon icon={faBars} />
            <img src={user?.imgUrl ?? guestUnknown} alt="user-icon" />
          </button>
          {isNavMenuVisible ? (
            <NavMenu
              onClose={() => setIsNavMenuVisible(false)}
              triggeringButtonRef={userIconRef}
            />
          ) : (
            ""
          )}
        </nav>
      </section>
    </>
  );
}
