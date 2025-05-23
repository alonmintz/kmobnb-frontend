import { ReviewDisplay } from "./ReviewDisplay";

export function ReviewList({ reviews, isPreview = false, onShowMore }) {
  if (!reviews || !reviews.length)
    return <div className="review-list">No reviews to show</div>;
  return (
    <div className="review-list">
      {reviews.map((review) => (
        <ReviewDisplay
          key={review._id}
          review={review}
          isPreview={isPreview}
          onShowMore={onShowMore}
        />
      ))}
    </div>
  );
}
