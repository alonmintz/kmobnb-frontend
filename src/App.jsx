import React from "react";
import { Routes, Route } from "react-router";
import { StayIndex } from "./pages/stay/StayIndex";
import { StayDetails } from "./pages/stay/StayDetails";
import { OrderPage } from "./pages/stay/OrderPage";
import { UserDetails } from "./pages/user/UserDetails";
import { LoginSignup } from "./pages/loginSignup/LoginSignup";
import { Login } from "./pages/loginSignup/Login";
import { Signup } from "./pages/loginSignup/Signup";
import { Trips } from "./pages/user/Trips";
import { WishLists } from "./pages/user/WishLists";
import { Host } from "./pages/host/Host";
import { Dashboard } from "./pages/host/Dashboard";
import { Listings } from "./pages/host/Listings";
import { StayEdit } from "./pages/host/StayEdit";

export function App() {
  return (
    <div className="main-container">
      <AppHeader />
      <main>
        <Routes>
          <Route path="" element={<StayIndex />} />
          <Route path="stay/:stayId" element={<StayDetails />} />
          <Route path="order/:stayId" element={<OrderPage />} />
          <Route path="login" element={<LoginSignup />}>
            <Route index element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
          <Route path="user/:userId" element={<UserDetails />} />
          <Route path="trips/:userId" element={<Trips />} />
          <Route path="wishlists/:userId" element={<WishLists />} />
          <Route path="host/:hostId" element={<Host />}>
            <Route index element={<Dashboard />} />
            <Route path="Listings" element={<Listings />} />
            <Route path="stay/edit" element={<StayEdit />} />
          </Route>
        </Routes>
      </main>
      <AppFooter />
      <UserMsg />
    </div>
  );
}
