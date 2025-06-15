import { useEffect, useState } from "react";
import { Modal } from "../general/Modal";
import { reviewService } from "../../services/review";
import starIcon from "../../assets/img/rating-star.svg";
import { RatingsDisplay } from "./RatingsDisplay";
import { ReviewDisplay } from "./ReviewDisplay";

export function ReviewsModal({ stayId, onClose }) {
  const [reviewsData, setReviewsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    loadReviews();
  }, []);

  async function loadReviews() {
    try {
      const data = await reviewService.getReviewsDataByStayId(stayId);
      setReviewsData(data);
      setIsLoading(false);
    } catch (err) {
      console.log(`Error loading reviews data for stayId: ${stayId}`);
    }
  }

  if (!reviewsData || isLoading)
    return (
      <Modal lockScroll isBackdrop onClose={onClose}>
        <section className="reviews-modal">skeleton</section>
      </Modal>
    );

  const { avgStarsRate, categoryRatings, starsRatings, reviewsCount, reviews } =
    reviewsData;

  return (
    <Modal lockScroll isBackdrop onClose={onClose}>
      <section className="reviews-modal">
        <div className="ratings-container">
          <h2 className="title">
            <img src={starIcon} />
            <span>{avgStarsRate}</span>
          </h2>
          <RatingsDisplay
            categoryRatings={categoryRatings}
            starsRatings={starsRatings}
          />
        </div>
        <div className="reviews-container">
          <h2 className="title">{`${reviewsCount} reviews`}</h2>
          {reviewsData.reviews.length &&
            reviews.map((review) => (
              <ReviewDisplay key={review._id} review={review} />
            ))}
        </div>
      </section>
    </Modal>
  );
}
