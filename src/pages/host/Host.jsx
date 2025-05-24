import { useSelector } from "react-redux";
import { Outlet } from "react-router";

export function Host() {
  const user = useSelector(storeState => storeState.userModule.user)

  return (
    <section className="host-page">
      <header className="title-section">
        <h1>Hello, host{user ? " " + user.fullname : ""}!</h1>
      </header>
      <div className="anchor-header host-anchor-header">
        <div className="anchor-header-container">
          <nav className="anchor-nav">
            <a className="anchor-link">
              <span className="anchor-name">Listings</span>
              <span className="anchor-hover-line"></span>
            </a>
            <a className="anchor-link">
              <span className="anchor-name">Orders</span>
              <span className="anchor-hover-line"></span>
            </a>
            <a className="anchor-link">
              <span className="anchor-name">Dashboard</span>
              <span className="anchor-hover-line"></span>
            </a>
          </nav>
        </div>
      </div>
      <Outlet />
    </section>
  );
}
