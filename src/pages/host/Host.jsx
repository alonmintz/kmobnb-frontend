import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";
import { useEffect, useRef } from "react";

export function Host() {
  const user = useSelector((storeState) => storeState.userModule.user);
  const showHostNotification = useSelector(
    (storeState) => storeState.userModule.showHostNotification
  );
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current) return;
      if (window.scrollY === 0) {
        headerRef.current.classList.remove("scrolled");
      } else {
        headerRef.current.classList.add("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="host-page layout secondary full">
      <div className="anchor-header layout secondary full" ref={headerRef}>
        {!user?.isHost ? (
          ""
        ) : (
          <div className="anchor-header-container">
            <h1>{user ? "Hello, host " + user.fullname : "Please log in"}</h1>
            <nav className="anchor-nav">
              <NavLink to="listings" className="anchor-link">
                <span className="anchor-name">Listings</span>
                <span className="anchor-hover-line"></span>
              </NavLink>
              <NavLink to="orders" className="anchor-link">
                <span className="anchor-name">
                  {" "}
                  {showHostNotification && (
                    <div className="notification-circle"></div>
                  )}
                  Orders
                </span>
                <span className="anchor-hover-line"></span>
              </NavLink>
              {/* <NavLink to="dashboard" className="anchor-link">
                <span className="anchor-name">Dashboard</span>
                <span className="anchor-hover-line"></span>
              </NavLink> */}
            </nav>
          </div>
        )}
      </div>
      <Outlet />
    </section>
  );
}
