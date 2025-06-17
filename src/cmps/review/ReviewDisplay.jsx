import starIcon from "../../assets/img/rating-star.svg";
import { getTimeAgoFromNow } from "../../services/util.service";

export function ReviewDisplay({ review, isPreview = false, onShowMore }) {
  const { at, by, txt, starsRate } = review;
  const isTxtLong = txt.length > 120;

  function getTxtToDisplay() {
    if (!isPreview) return txt;
    return isTxtLong ? txt.slice(0, 120) + "..." : txt;
  }
  return (
    <section className="review-display">
      <div className="review-by">
        <div className="user-container">
          <img className="user-img" src={by.imgUrl} alt={"user-img"} />
          <div className="user-details">
            <h4 className="user-fullname">{by.fullname}</h4>
            <span className="user-location">{by.location || "Israel"}</span>
          </div>
        </div>
        <ol className="rate-date-list">
          <li className="stars">
            {[...Array(starsRate)].map((_, idx) => (
              <img key={idx} src={starIcon} alt="star" className="star-icon" />
            ))}
          </li>
          <li className="dot"></li>
          <li className="time-ago">
            <span>{getTimeAgoFromNow(at)}</span>
          </li>
        </ol>
      </div>
      <p className="review-txt">
        {getTxtToDisplay()}
        {isTxtLong && isPreview && (
          <button className="review-show-more-btn" onClick={onShowMore}>
            Show more
          </button>
        )}
      </p>
    </section>
  );
}
