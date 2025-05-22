import guestUnknown from "../../assets/img/guest-unknown.svg";
import starIcon from "../../assets/img/rating-star.svg";
import { getTimeAgoFromNow } from "../../services/util.service";

const dataModel = {
  _id: "654564564",
  at: "2016-06-12T04:00:00.000Z",
  stayId: "123456789",
  by: {
    _id: "622f3407e36c59e6164fc004",
    fullname: "Kiesha",
    imgUrl: "https://robohash.org/10711825?set=set1",
    location: "Tel Aviv",
    id: "10711825",
  },
  txt: "I had a great experience working with Patty and Peter.  Both were very attentive in sorting out the booking details and following up directly when I had questions.  I rented a 2 bedroom unit at the Westin Villas  in Maui and both the unit and property was absolutely amazing.  I think we had the best unit on the resort complete with 2 outdoor patios with direct access  to  the  beach.  I would HIGHLY recommend renting with Patty and Peter.",
  starsRate: 4,
};

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
          {/* <img src={by.imgUrl} alt={"user-img"} /> */}
          <img className="user-img" src={guestUnknown} alt={"host-img"} />
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
          <li className="dot">{/* <span></span> */}</li>
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
