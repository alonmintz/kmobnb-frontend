import { StayPreview } from "./StayPreview";
import { StayWishlistPreview } from "./StayWishlistPreview";

export function StayList({ stays, isWishlist = false, onHoverStay }) {
  if (!stays || !stays.length)
    return <div className="stay-list">No stays to show</div>;

  return (
    <div className={`stay-list`}>
      {isWishlist
        ? stays.map((stay) => (
            <StayWishlistPreview
              key={stay.stayId}
              stay={stay}
              onHoverStay={onHoverStay}
            />
          ))
        : stays.map((stay) => <StayPreview key={stay._id} stay={stay} />)}
    </div>
  );
}
