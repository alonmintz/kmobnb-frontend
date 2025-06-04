import { useSelector } from "react-redux";
import { Modal } from "../general/Modal";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router";
import { LoginSignupModal } from "../../pages/loginSignup/LoginSignupModal";
import { useEffect, useState } from "react";
import { reviewService } from "../../services/review";
import { svgService } from "../../services/svg.service";

const CATEGORIES = [
  { rateKey: "cleanliness", displayName: "Cleanliness" },
  { rateKey: "accuracy", displayName: "Accuracy" },
  { rateKey: "checkIn", displayName: "Check-in" },
  { rateKey: "communications", displayName: "Communication" },
  { rateKey: "location", displayName: "Location" },
  { rateKey: "value", displayName: "Value" },
];

const starsStyle = {
  color: "black",
  "& .MuiRating-iconEmpty": {
    color: "lightgray",
  },
};

export function ReviewForm({ stayId, onClose }) {
  const user = useSelector((storeState) => storeState.userModule.user);
  const [reviewToEdit, setReviewToEdit] = useState(
    reviewService.getEmptyReviewWithLoggedinUser()
  );
  const [isSubmiting, setIsSubmiting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log({ reviewToEdit });
  }, [reviewToEdit]);

  if (!user) return <LoginSignupModal onClose={onclose} />;

  function onRatingClick(rateKey, value) {
    setReviewToEdit((prevReviewToSubmit) => ({
      ...prevReviewToSubmit,
      categoryRatings: {
        ...prevReviewToSubmit.categoryRatings,
        [rateKey]: value,
      },
    }));
  }

  function handleInputChange({ target }) {
    const field = target.name;
    let value = target.value;

    switch (target.type) {
      case "number":
      case "range":
        value = +value || "";
        break;

      case "checkbox":
        value = target.checked;
        break;

      default:
        break;
    }

    setReviewToEdit((prevReviewToSubmit) => ({
      ...prevReviewToSubmit,
      [field]: value,
    }));
  }

  async function onSubmit() {
    const reviewToSubmit = { ...reviewToEdit, stayId, at: new Date() };
    try {
      setIsSubmiting(true);
      const addedReview = await reviewService.save(reviewToSubmit);
      console.log({ addedReview });
      if (addedReview._id) {
        console.log("review saved");
        onClose();
      }
    } catch (err) {
      console.log("error saving review");
    } finally {
      setIsSubmiting(false);
    }
  }

  return (
    <Modal lockScroll isBackdrop onClose={onclose}>
      <section className="review-form-container">
        <section className="review-form">
          <h2 className="title">How was your experience</h2>
          <div className="stars-rate-container">
            <Rating
              name="starsRate"
              value={reviewToEdit.starsRate}
              onChange={(event, newValue) =>
                setReviewToEdit((prevReviewToSubmit) => ({
                  ...prevReviewToSubmit,
                  starsRate: newValue,
                }))
              }
              size="large"
              sx={starsStyle}
            />
          </div>
          <div className="category-ratings-container">
            <h4 className="rate-title">Rate your stay</h4>
            {CATEGORIES.map(({ rateKey, displayName }) => (
              <CategoryRateBracket
                key={rateKey}
                rateKey={rateKey}
                displayName={displayName}
                starValue={reviewToEdit.categoryRatings[rateKey]}
                onStarClick={onRatingClick}
              />
            ))}
          </div>
          <div className="txt-container">
            <textarea
              className="txt"
              name="txt"
              placeholder="Help others by sharing your experience"
              value={reviewToEdit.txt}
              onChange={handleInputChange}
            />
          </div>
          <button
            className="submit-btn"
            onClick={onSubmit}
            disabled={isSubmiting}
          >
            Submit
          </button>
        </section>
      </section>
    </Modal>
  );
}

function CategoryRateBracket({ rateKey, displayName, starValue, onStarClick }) {
  return (
    <div className="category-rate-bracket">
      {svgService.getGenericSvg(displayName, "category-icon")}
      <span className="category">{displayName}</span>
      <Rating
        className="rating"
        name={rateKey}
        value={starValue}
        onChange={(event, newValue) => onStarClick(rateKey, newValue)}
        sx={starsStyle}
      />
    </div>
  );
}
