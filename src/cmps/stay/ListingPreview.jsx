import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import {
  faBan,
  faPen,
  faRankingStar,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export function ListingPreview({
  listing,
  onChangeStatusClick,
  onRatingsButtonClick,
}) {
  const navigate = useNavigate();

  return (
    <div
      className={`listing-preview ${
        listing.status === "inactive" ? "inactive" : ""
      }`}
    >
      <div className="img-container">
        <img src={listing.imgUrls[0]} />
        <div className="hover-buttons">
          <button
            title="Ratings"
            className="round-btn ratings-btn"
            onClick={(ev) => {
              ev.stopPropagation();
              onRatingsButtonClick(listing._id);
            }}
          >
            <FontAwesomeIcon className="icon" icon={faRankingStar} />
          </button>
          <button
            title="Edit"
            className="round-btn edit-btn"
            onClick={(ev) => {
              ev.stopPropagation();
              navigate(`../listing/edit/${listing._id}`);
            }}
          >
            <FontAwesomeIcon icon={faPen} />
          </button>
          {listing.status === "active" ? (
            <button
              title="Deactivate"
              className="round-btn deactivate-btn"
              onClick={(ev) => onChangeStatusClick(ev, listing, "inactive")}
            >
              <FontAwesomeIcon className="icon" icon={faBan} />
            </button>
          ) : (
            <button
              title="Reactivate"
              className="round-btn reactivate-btn"
              onClick={(ev) => onChangeStatusClick(ev, listing, "active")}
            >
              <FontAwesomeIcon className="icon" icon={faRotateLeft} />
            </button>
          )}
        </div>
      </div>
      <div className="listing-name">{listing.name}</div>
      <div className="listing-location">
        {listing.loc.country}, {listing.loc.city}
      </div>
      <Link to={`../orders?listingId=${listing._id}`} className="button">
        View orders
      </Link>
      <Link
        to={`/stay/${listing._id}`}
        onClick={(ev) => ev.stopPropagation()}
        className="button"
      >
        View listing as guest
      </Link>
    </div>
  );
}
