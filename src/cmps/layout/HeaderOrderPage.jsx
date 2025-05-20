import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import logo from "../../assets/img/logo.png";
import guestUnknown from "../../assets/img/guest-unknown.svg";
import { NavMenu } from "../layout/NavMenu";

//TODO: complete bnb your home link functionality and then undo the disable
export function HeaderOrderPage() {
  const user = useSelector((storeState) => storeState.userModule.user);
  const [isNavMenuVisible, setIsNavMenuVisible] = useState(false);

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
            <h3>kmobnb</h3>
          </div>
        </NavLink>
        <nav>
          {/*this bnb your home is temporerally disabled*/}
          <NavLink
            to="#"
            className="disabled"
            onClick={(ev) => {
              ev.preventDefault();
            }}
          >
            Bnb your home
          </NavLink>
          <button className="user-info" onClick={handleUserIconClick}>
            <FontAwesomeIcon icon={faBars} />
            <img src={user?.imgUrl ?? guestUnknown} alt="user-icon" />
          </button>
          {isNavMenuVisible ? <NavMenu onClose={() => setIsNavMenuVisible(false)} /> : ""}
        </nav>
      </section>
    </>
  );
}
