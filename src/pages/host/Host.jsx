import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";

export function Host() {
  const user = useSelector(storeState => storeState.userModule.user)

  return (
    <section className="host-page layout secondary full">

      <div className="anchor-header host-anchor-header">
        {!user?.isHost ? "" :
          <div className="anchor-header-container">
            <h1>{user ? "Hello, host " + user.fullname : "Please log in"}</h1>
            <nav className="anchor-nav">
              <NavLink to="listings" className="anchor-link">
                <span className="anchor-name">Listings</span>
                <span className="anchor-hover-line"></span>
              </NavLink>
              <NavLink to="orders" className="anchor-link">
                <span className="anchor-name">Orders</span>
                <span className="anchor-hover-line"></span>
              </NavLink>
              <NavLink to="dashboard" className="anchor-link">
                <span className="anchor-name">Dashboard</span>
                <span className="anchor-hover-line"></span>
              </NavLink>
            </nav>
          </div>
        }
      </div>
      <Outlet />
    </section>
  );
}
