import { format } from "date-fns";
import { useSelector } from "react-redux";
import { StayPhotoGallery } from "./StayPhotoGallery";
import { useEffect, useState } from "react";
import { LoginSignupModal } from "../../pages/loginSignup/LoginSignupModal";
import starIcon from "../../assets/img/rating-star.svg";
import { userActions } from "../../store/actions/user.actions";
import { useEffectUpdate } from "../../customHooks/useEffectUpdate";

export function StayWishlistPreview({
  stay,
  // onWishlistHeartClick,
  onHoverStay,
}) {
  const userWishlist = useSelector(
    (storeState) => storeState.userModule.user.wishlist
  );
  const [isWishlisted, setIsWishlisted] = useState(checkIsWishlisted());
  // const [isColored, setIsColored] = useState(true);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);

  useEffect(() => {
    setIsWishlisted(checkIsWishlisted());
  }, [userWishlist]);

  // useEffectUpdate(() => {
  //   triggerWishlistAction(isWishlisted);
  // }, [isWishlisted]);

  function checkIsWishlisted() {
    return userWishlist.some((wishStay) => wishStay.stayId === stay.stayId);
  }

  function triggerWishlistAction() {
    if (isWishlisted) {
      //call delete action
      console.log("here on remove");

      userActions.removeFromWishlist_noDisplayEffect(stay.stayId);
    } else {
      //call add action
      console.log("here on add");

      userActions.addToWishlist_noDisplayEffect(stay.stayId);
    }
  }

  //todo: connect to users api- wishlist EP
  function onHeartClick(ev) {
    ev.stopPropagation();
    ev.preventDefault();
    triggerWishlistAction();
    // setIsColored((prev) => !prev);
    // setIsWishlisted((prev) => !prev);
    // if (!user) {
    //   setIsLoginModalVisible(true);
    //   return;
    // }
    // if (heartClicked) {
    //   setHeartClicked(false);
    // } else {
    //   setHeartClicked(true);
    // }
  }

  function onPreviewClick() {
    window.open(`/stay/${stay.stayId}` + window.location.search);
  }

  if (!stay) return <div className="stay-wishlist-preview">Loading...</div>;
  return (
    <div
      className="stay-wishlist-preview"
      onClick={onPreviewClick}
      onMouseEnter={() => {
        onHoverStay(stay.stayId);
      }}
      onMouseLeave={() => {
        onHoverStay("");
      }}
    >
      {!isLoginModalVisible ? (
        ""
      ) : (
        <LoginSignupModal onClose={() => setIsLoginModalVisible(false)} />
      )}
      <div className="image-container">
        <img src={stay.imgUrl} alt="stay-image" />
      </div>
      <div
        className={`heart-button ${isWishlisted ? "clicked" : ""}`}
        onClick={onHeartClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          aria-hidden="true"
          role="presentation"
          focusable="false"
        >
          <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path>
        </svg>
      </div>
      <div className="text-container">
        <div className="bold-text">
          {stay.loc.city}, {stay.loc.country}
        </div>
        <div className="rating">
          <span>
            <img className="star-image" src={starIcon} />{" "}
            {/* {stay.starsRate} */}6
          </span>
        </div>
      </div>
      {/* <button
        onClick={(ev) => {
          ev.stopPropagation();
          ev.preventDefault();
          userActions.addToWishlist_noDisplayEffect(stay.stayId);
        }}
      >
        add
      </button>
      <button
        onClick={(ev) => {
          ev.stopPropagation();
          ev.preventDefault();
          userActions.removeFromWishlist_noDisplayEffect(stay.stayId);
        }}
      >
        remove
      </button> */}
    </div>
  );
}
