import { useSelector } from "react-redux";
import { stayActions } from "../../store/actions/stay.actions";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faPen, faRotateLeft } from "@fortawesome/free-solid-svg-icons";

export function ListingIndex() {
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate();
  const user = useSelector((storeState) => storeState.userModule.user);
  const listings = useSelector((storeState) => storeState.stayModule.hostListings);

  useEffect(() => {
    if (user) {
      loadListings()
    }
  }, [user])

  async function loadListings() {
    await stayActions.loadHostListings();
    setIsLoading(false)
  }

  async function onChangeStatusClick(ev, listing, status) {
    ev.stopPropagation();
    try {
      await stayActions.updateListingStatus(listing, status);
    } catch (err) {
      console.log("Failed updating listing's", listing._id, "status:", err);
    }
  }

  if (!user) {
    return (
      <div className="listings">
        <div className="section-title">
          <h1>Please log in</h1>
        </div>
      </div>
    )
  }

  return (
    <section className="listings">
      <div className="section-title">
        <h1>Your Listings</h1>
        <Link to="../listing/edit" className="button">
          Add listing
        </Link>
      </div>
      {isLoading ?
        <div className="listings">
          <div className="section-title">
            <h1>Loading . . .</h1>
          </div>
        </div>
        :
        <div className="listing-list">
          {listings.map((listing) => (
            <div key={listing._id} className={`listing-preview ${listing.status === "inactive" ? "inactive" : ""}`}>
              <div className="img-container">
                <img src={listing.imgUrls[0]} />
                <div className="hover-buttons">
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
                      onClick={(ev) =>
                        onChangeStatusClick(ev, listing, "inactive")
                      }
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
          ))}
        </div>
      }
    </section>
  );
}
