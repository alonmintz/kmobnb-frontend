import { StayPreview } from "./StayPreview";
import { StayWishlistPreview } from "./StayWishlistPreview";

export function StayList({
  stays,
  isWishlist = false,
  // onWishlistHeartClick,
  onHoverStay,
}) {
  if (!stays || !stays.length)
    return <div className="stay-list">No stays to show</div>;
  //debug:
  // console.log({ stays });

  //   const wishlistClass = isWishlist ? "wishlist-list" : "";

  return (
    <div className={`stay-list`}>
      {isWishlist
        ? stays.map((stay) => (
            <StayWishlistPreview
              key={stay.stayId}
              stay={stay}
              // onWishlistHeartClick={onWishlistHeartClick}
              onHoverStay={onHoverStay}
            />
          ))
        : stays.map((stay) => <StayPreview key={stay._id} stay={stay} />)}
    </div>
  );
}
