import { useSelector } from "react-redux";
import { stayActions } from "../../store/actions/stay.actions";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faPen, faRotateLeft } from "@fortawesome/free-solid-svg-icons";

export function ListingIndex() {
  const navigate = useNavigate()
  const user = useSelector(storeState => storeState.userModule.user)
  const [listings, setListings] = useState([])

  useEffect(() => {
    if (user) {
      stayActions.loadStays({ hostId: user._id })
        .then(setListings)
        .catch(err => console.log('Failed to load listings:', err))
    }
  }, [user])

  if (!listings || !listings.length || !user) {
    return (
      <div className="listings">
        <div className="title-section">
          <h1>No listings to show</h1>
        </div>
      </div>
    )
  }

  return (
    <section className="listings">
      <div className="section-title">
        <h1>Your Listings</h1>
        <Link className="button">Add listing</Link>
      </div>
      <div className="listing-list">
        {listings.map((listing) =>
          <div key={listing._id} className={`listing-preview`}>
            <div className="img-container">
              <img src={listing.imgUrls[0]} />
              <div className="hover-buttons">
                <button title="Edit" className="round-btn edit-btn" onClick={(ev) => {
                  ev.stopPropagation()
                  navigate(`/host/listing/edit/${listing._id}`)
                }}>
                  <FontAwesomeIcon icon={faPen} />
                </button>
                {listing.status === 'active' ? (
                  <button
                    title="Deactivate"
                    className="round-btn deactivate-btn"
                    onClick={(ev) => {
                      ev.stopPropagation()
                      // TODO: add deactivate functionality here
                    }}
                  >
                    <FontAwesomeIcon className="icon" icon={faBan} />
                  </button>
                ) : (
                  <button
                    title="Reactivate"
                    className="round-btn reactivate-btn"
                    onClick={(ev) => {
                      ev.stopPropagation()
                      // TODO: add reactivate functionality here
                    }}
                  >
                    <FontAwesomeIcon className="icon" icon={faRotateLeft} />
                  </button>
                )}
              </div>
            </div>
            <div className="listing-name">{listing.name}</div>
            <div className="listing-location">{listing.loc.country}, {listing.loc.city}</div>
            <Link
              to={`/host/orders?listingId=${listing._id}`}
              className="button"
            >View orders
            </Link>
            <Link
              to={`/stay/${listing._id}`}
              onClick={(ev => ev.stopPropagation())}
              className="button"
            >
              View listing as guest
            </Link>
          </div>
        )
        }
      </div >
    </section >
  );
}
