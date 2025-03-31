import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service";
import { logout } from "../../store/actions/user.actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { SearchBar } from "../stay/SearchBar";
import { useEffect, useRef, useState } from "react";

export function AppHeader() {
  const user = useSelector((storeState) => storeState.userModule.user);
  const topDiv = useRef();
  // const navigate = useNavigate();
  const [isSearchBarShow, setIsSearchBarShow] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setIsSearchBarShow(true);
      } else {
        setIsSearchBarShow(false);
      }
    });

    observer.observe(topDiv.current);
    return () => observer.disconnect();
  }, []);
  // async function onLogout() {
  //   try {
  //     await logout();
  //     navigate("/");
  //     showSuccessMsg(`Bye now`);
  //   } catch (err) {
  //     showErrorMsg("Cannot logout");
  //   }
  // }

  return (
    <>
      <div ref={topDiv} className="top-div"></div>
      <header className="app-header full">
        <section className="header-top flex">
          <div className="logo-container">
            <img className="logo" src="src/assets/img/logo.png" alt="logo" />
            <h3>kmobnb</h3>
          </div>
          <nav>
            <NavLink>Bnb your home</NavLink>
            <button className="user-info">
              <FontAwesomeIcon icon={faBars} />
              <img src="src/assets/img/guest-unknown.svg" alt="user-icon" />
            </button>
          </nav>
        </section>
        {isSearchBarShow && <SearchBar />}
      </header>
    </>
  );
}
