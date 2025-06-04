import { useState } from "react";
import { ReviewForm } from "../review/ReviewForm";

export function StayTripPreview({ trip, isPast = false }) {
  const [showReviewsForm, setShowReviewForm] = useState(false);

  const { city, startDate, endDate, stayImgUrl, stayId, status } = trip;

  function formatTripDates() {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const sameMonth =
      start.getMonth() === end.getMonth() &&
      start.getFullYear() === end.getFullYear();

    const optionsMonth = { month: "short" };
    const optionsDay = { day: "numeric" };
    const optionsYear = { year: "numeric" };

    if (sameMonth) {
      // Example: Jun 4-7, 2025
      return `${start.toLocaleString(
        "en-US",
        optionsMonth
      )} ${start.getDate()}-${end.getDate()}, ${start.getFullYear()}`;
    } else {
      // Example: Jun 28-Jul 2, 2025
      return `${start.toLocaleString(
        "en-US",
        optionsMonth
      )} ${start.getDate()}-${end.toLocaleString(
        "en-US",
        optionsMonth
      )} ${end.getDate()}, ${start.getFullYear()}`;
    }
  }
  return (
    <section className={`stay-trip-preview ${status}`}>
      {showReviewsForm && (
        <ReviewForm stayId={stayId} onClose={() => setShowReviewForm(false)} />
      )}
      <div className="status">{status}</div>
      <div className={`image-container ${status}`}>
        <img src={stayImgUrl} alt="stay-image" />
      </div>
      <div className="bottom-container">
        <div className="text-container">
          <h4 className="city">{city}</h4>
          <span className="dates">{formatTripDates()}</span>
        </div>
        {isPast && (
          <button
            className="review-btn"
            onClick={() => setShowReviewForm(true)}
          >
            Add review
          </button>
        )}
      </div>
    </section>
  );
}
