import { useEffect, useState } from "react";
import { StayList } from "../../cmps/stay/StayList";
import { StayMultiLocationMap } from "../../cmps/stay/StayMultiLocationMap";
import { userService } from "../../services/user";
import { userActions } from "../../store/actions/user.actions";
import { StayListSkeleton } from "../../cmps/skeleton/StayListSkeleton";

export function Wishlist() {
  const [isLoading, setIsLoading] = useState(true);
  const [staysToShow, setStaysToShow] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const wishlistFromDB = await userService.getUserWishlist();
    setStaysToShow(wishlistFromDB);
    userActions.setUserWishlist(wishlistFromDB);
    setIsLoading(false);
  }

  const [hoveredStayId, setHoveredStayId] = useState("");

  function onMapPinClick(stayId) {
    //opens a stay preview: TBD
  }

  return (
    <section className="wishlist">
      <section className="list-container">
        <div className="title-container">
          <h2>My wishlist</h2>
        </div>
        {isLoading ? (
          <StayListSkeleton />
        ) : (
          <StayList
            stays={staysToShow}
            isWishlist
            onHoverStay={setHoveredStayId}
          />
        )}
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
