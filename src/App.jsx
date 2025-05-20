import { Routes, Route } from "react-router";
import { StayIndex } from "./pages/stay/StayIndex";
import { StayDetails } from "./pages/stay/StayDetails";
import { OrderPage } from "./pages/stay/OrderPage";
import { UserDetails } from "./pages/user/UserDetails";
import { Trips } from "./pages/user/Trips";
import { WishLists } from "./pages/user/WishLists";
import { Host } from "./pages/host/Host";
import { Dashboard } from "./pages/host/Dashboard";
import { Listings } from "./pages/host/Listings";
import { StayEdit } from "./pages/host/StayEdit";
import { AppHeader } from "./cmps/layout/AppHeader";
import { AppFooter } from "./cmps/layout/AppFooter";
import { UserMsg } from "./cmps/general/UserMsg";
import { NotFound } from "./pages/NotFound";

export function App() {
  return (
    //todo: fix main layout!!! critical!!!
    // <div className="root">
    <main className="main-container">
      <AppHeader />
      <Routes>
        <Route path="" element={<StayIndex />} />
        <Route path="stay/:stayId" element={<StayDetails />} />
        <Route path="order/:stayId" element={<OrderPage />} />
        <Route path="user/:userId" element={<UserDetails />} />
        <Route path="trips/:userId" element={<Trips />} />
        <Route path="wishlists/:userId" element={<WishLists />} />
        <Route path="host/:userId" element={<Host />}>
          <Route index element={<Dashboard />} />
          <Route path="Listings" element={<Listings />} />
          <Route path="stay/edit" element={<StayEdit />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <AppFooter />
      <UserMsg />
    </main>
    // </div>
  );
}
