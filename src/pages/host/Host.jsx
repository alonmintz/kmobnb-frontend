import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";

export function Host() {
  const user = useSelector(storeState => storeState.userModule.user)

  return (
    <section className="host-page">
      <header className="page-title">
        <h1>Hello, host{user ? " " + user.fullname : ""}!</h1>
      </header>
      <div className="anchor-header host-anchor-header">
        <div className="anchor-header-container">
          <nav className="anchor-nav">
            <Link to="listings" className="anchor-link">
              <span className="anchor-name">Listings</span>
              <span className="anchor-hover-line"></span>
            </Link>
            <Link to="orders" className="anchor-link">
              <span className="anchor-name">Orders</span>
              <span className="anchor-hover-line"></span>
            </Link>
            <Link to="dashboard" className="anchor-link">
              <span className="anchor-name">Dashboard</span>
              <span className="anchor-hover-line"></span>
            </Link>
          </nav>
        </div>
      </div>
      <Outlet />
    </section>
  );
}
