import { useEffect, useState } from "react";
import { StayList } from "../../cmps/stay/StayList";
import { StayMultiLocationMap } from "../../cmps/stay/StayMultiLocationMap";
import { userService } from "../../services/user";
import { userActions } from "../../store/actions/user.actions";

export function Wishlist() {
  const [staysToShow, setStaysToShow] = useState([]);
  useEffect(() => {
    load();
  }, []);

  async function load() {
    const wishlistFromDB = await userService.getUserWishlist();
    setStaysToShow(wishlistFromDB);
    userActions.setUserWishlist(wishlistFromDB);
  }

  const [hoveredStayId, setHoveredStayId] = useState("");

  function onMapPinClick(stayId) {
    console.log({ stayId });
  }

  return (
    <section className="wishlist">
      <section className="list-container">
        <div className="title-container">
          <h2>My wishlist</h2>
        </div>
        <StayList
          stays={staysToShow}
          isWishlist
          onHoverStay={setHoveredStayId}
        />
      </section>
      <section className="map-container">
        <StayMultiLocationMap
          stays={staysToShow}
          hoveredStayId={hoveredStayId}
          onPinClick={onMapPinClick}
        />
      </section>
    </section>
  );
}
