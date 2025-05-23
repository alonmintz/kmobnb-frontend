import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useMatch } from "react-router-dom";
import { HeaderStayIndex } from "./HeaderStayIndex";
import { HeaderStayDetails } from "./HeaderStayDetails";
import { HeaderOrderPage } from "./HeaderOrderPage";
import { HeaderHost } from "./HeaderHost"
import { useViewport } from "../../context/ViewportContext";
import { StayFilter } from "../stay/StayFilter";

export function AppHeader() {
  const location = useLocation();
  const pathname = location.pathname;
  const isStayDetailsPage = useMatch("stay/:stayId");
  const isOrderPage = useMatch("order/:stayId");
  const [pageClass, setPageClass] = useState(getPageClass());
  const { viewport } = useViewport();

  useEffect(() => {
    setPageClass(getPageClass());
  }, [location]);

  function getPageClass() {
    if (pathname === "/") return "stay-index-header";
    if (pathname === "/host/listings") return "host-listings-header"
    if (isStayDetailsPage) return "stay-details-header";
    if (isOrderPage) return "order-page-header";
  }

  function headerRenderSwitch() {
    if (pathname === "/") return <HeaderStayIndex viewport={viewport} />;
    if (pathname === "/host/listings") return <HeaderHost viewport={viewport} />;
    if (isStayDetailsPage) return <HeaderStayDetails viewport={viewport} />;
    if (isOrderPage) return <HeaderOrderPage viewport={viewport} />;
  }

  return (
    <>
      <header className={`app-header ${pageClass} full`}>
        <div className="header-container">{headerRenderSwitch()}</div>
        <div
          className="app-header-bottom full"
          style={{ gridColumn: "1/-1", borderBottom: "1px solid lightgray" }}
        ></div>
        {pathname === "/" && <StayFilter />}
      </header>
    </>
  );
}
