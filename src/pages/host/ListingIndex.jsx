import { useSelector } from "react-redux";
import { stayActions } from "../../store/actions/stay.actions";
import { useEffect, useState } from "react";

export function ListingIndex() {
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
      <div className="title-section">
        <h1>Hello, host{user ? " " + user.fullname : ""}!</h1>
      </div>
      <div className="listing-list">
          {}
          {listings.map((listing) =>
            <div key={listing._id} className="listing-preview">
              <img src={listing.imgUrls[0]} />
              <div className="listing-name">{listing.name}</div>
              <div className="listing-location">{listing.loc.country}, {listing.loc.city}</div>
            </div>
          )}
      </div>

    </section>
  );
}
