import { Routes, Route, useLocation } from "react-router";
import { StayIndex } from "./pages/stay/StayIndex";
import { StayDetails } from "./pages/stay/StayDetails";
import { OrderPage } from "./pages/stay/OrderPage";
import { UserDetails } from "./pages/user/UserDetails";
import { Trips } from "./pages/user/Trips";
import { Host } from "./pages/host/Host";
import { HostDashboard } from "./pages/host/HostDashboard";
import { ListingIndex } from "./pages/host/ListingIndex";
import { StayEdit } from "./pages/host/StayEdit";
import { AppHeader } from "./cmps/layout/AppHeader";
import { AppFooter } from "./cmps/layout/AppFooter";
import { UserMsg } from "./cmps/general/UserMsg";
import { NotFound } from "./pages/NotFound";
import { useEffect, useState } from "react";
import { OrderIndex } from "./pages/host/OrderIndex";
import { HostOrderPage } from "./pages/host/HostOrderPage";
import { Wishlist } from "./pages/user/WishList";

export function App() {
  const location = useLocation();
  const [layoutClass, setLayoutClass] = useState(getLayoutClass());

  useEffect(() => {
    setLayoutClass(getLayoutClass());
    window.scrollTo(0, 0);
  }, [location]);

  function getLayoutClass() {
    const layoutClass =
      location.pathname === "/" || location.pathname.startsWith("/wishlist")
        ? "main"
        : "secondary";
    return layoutClass;
  }

  return (
    <main className={`layout ${layoutClass}`}>
      <AppHeader />
      <Routes>
        <Route path="" element={<StayIndex />} />
        <Route path="stay/:stayId" element={<StayDetails />} />
        <Route path="order/:stayId" element={<OrderPage />} />
        <Route path="profile" element={<UserDetails />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="trips" element={<Trips />} />
        <Route path="host" element={<Host />}>
          <Route path="dashboard" index element={<HostDashboard />} />
          <Route path="listings" element={<ListingIndex />} />
          <Route path="listing/edit" element={<StayEdit />} />
          <Route path="listing/edit/:listingId" element={<StayEdit />} />
          <Route path="orders" element={<OrderIndex />} />
          <Route path="order/:orderId" element={<HostOrderPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <AppFooter />
      <UserMsg />
    </main>
  );
}
