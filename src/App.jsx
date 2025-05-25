import { Routes, Route, useLocation } from "react-router";
import { StayIndex } from "./pages/stay/StayIndex";
import { StayDetails } from "./pages/stay/StayDetails";
import { OrderPage } from "./pages/stay/OrderPage";
import { UserDetails } from "./pages/user/UserDetails";
import { Trips } from "./pages/user/Trips";
import { WishLists } from "./pages/user/WishLists";
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

export function App() {
  const location = useLocation();
  const [layoutClass, setLayoutClass] = useState(getLayoutClass());

  useEffect(() => {
    setLayoutClass(getLayoutClass());
  }, [location]);

  function getLayoutClass() {
    return location.pathname === "/" ? "main" : "secondary";
  }

  return (
    <main className={`layout ${layoutClass}`}>
      <AppHeader />
      <Routes>
        <Route path="" element={<StayIndex />} />
        <Route path="stay/:stayId" element={<StayDetails />} />
        <Route path="order/:stayId" element={<OrderPage />} />
        <Route path="user/:userId" element={<UserDetails />} />
        <Route path="trips/:userId" element={<Trips />} />
        <Route path="wishlists" element={<WishLists />} />
        <Route path="host" element={<Host />} >
          <Route path="dashboard" index element={<HostDashboard />} />
          <Route path="listings" element={<ListingIndex />} />
          <Route path="listing/edit" element={<StayEdit />} />
          <Route path="listing/edit/:listingId" element={<StayEdit />} />
          <Route path="orders" element={<OrderIndex />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <AppFooter />
      <UserMsg />
    </main>
  );
}
