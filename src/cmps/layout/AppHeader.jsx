import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useMatch } from "react-router-dom";
import { HeaderStayIndex } from "./HeaderStayIndex";
import { HeaderStayDetails } from "./HeaderStayDetails";
import { HeaderOrderPage } from "./HeaderOrderPage";
export function AppHeader() {
  const location = useLocation();
  const pathname = location.pathname;
  const isStayDetailsPage = useMatch("stay/:stayId");
  const isOrderPage = useMatch("order/:stayId");
  const [pageClass, setPageClass] = useState(getPageClass());

  useEffect(() => {
    setPageClass(getPageClass());
  }, [location]);

  function getPageClass() {
    if (pathname === "/") return "stay-index-header";
    if (isStayDetailsPage) return "stay-details-header";
    if (isOrderPage) return "order-page-header";
  }

  function headerRenderSwitch() {
    if (pathname === "/") return <HeaderStayIndex />;
    if (isStayDetailsPage) return <HeaderStayDetails />;
    if (isOrderPage) return <HeaderOrderPage />;
  }

  return (
    <>
      <header className={`app-header ${pageClass} full`}>
        <div className="header-container">{headerRenderSwitch()}</div>
      </header>
    </>
  );
}
