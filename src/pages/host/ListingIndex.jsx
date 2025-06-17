import { useSelector } from "react-redux";
import { stayActions } from "../../store/actions/stay.actions";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListingPreview } from "../../cmps/stay/ListingPreview";
import { ReviewsModal } from "../../cmps/review/ReviewsModal";
import { useEffectUpdate } from "../../customHooks/useEffectUpdate";

export function ListingIndex() {
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((storeState) => storeState.userModule.user);
  const listings = useSelector(
    (storeState) => storeState.stayModule.hostListings
  );
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);
  const [selectedListingId, setSelectedListingId] = useState(null);

  useEffect(() => {
    if (user) {
      loadListings();
    }
  }, [user]);

  async function loadListings() {
    await stayActions.loadHostListings();
    setIsLoading(false);
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
    );
  }

  return (
    <section className="listings">
      {selectedListingId && (
        <ReviewsModal
          stayId={selectedListingId}
          onClose={() => setSelectedListingId(null)}
        />
      )}
      <div className="section-title">
        <h1>Your Listings</h1>
        <Link to="../listing/edit" className="button">
          Add listing
        </Link>
      </div>
      {isLoading ? (
        <div className="listings">
          <div className="section-title">
            <h1>Loading . . .</h1>
          </div>
        </div>
      ) : (
        <div className="listing-list">
          {listings.map((listing) => (
            <ListingPreview
              key={listing._id}
              listing={listing}
              onChangeStatusClick={onChangeStatusClick}
              onRatingsButtonClick={(id) => setSelectedListingId(id)}
            />
          ))}
        </div>
      )}
      {!isLoading && !listings.length && (
        <div className="section-title">
          <h1>No listings</h1>
        </div>
      )}
    </section>
  );
}
