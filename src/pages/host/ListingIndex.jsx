import { useSelector } from "react-redux";
import { stayActions } from "../../store/actions/stay.actions";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

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

  function onViewListingAsGuestClick(ev, listingId) {
    ev.stopPropagation()
    navigate(`/stay/${listingId}`)
  }

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
      </div>
      <div className="listing-list">
        {listings.map((listing) =>
          <div
            key={listing._id}
            className="listing-preview"
            onClick={() => navigate(`/host/orders?listingId=${listing._id}`)}
          >
            <img src={listing.imgUrls[0]} />
            <div className="listing-name">{listing.name}</div>
            <div className="listing-location"> {listing.loc.country}, {listing.loc.city}</div>
            <Link
              to={`/host/listing/edit/${listing._id}`}
              onClick={(ev => ev.stopPropagation())}
              className="button"
            >
              Edit Listing
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
