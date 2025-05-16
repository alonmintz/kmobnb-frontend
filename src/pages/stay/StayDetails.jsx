import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import starIcon from "../../assets/img/rating-star.svg";
import guestUnknown from "../../assets/img/guest-unknown.svg";
import { useEffect, useState } from "react";
import { useEffectUpdate } from "../../customHooks/useEffectUpdate";
import { Amenity } from "../../cmps/stay/Amenity";
import { StayDatePicker } from "../../cmps/stay/StayDatePicker";
import { useParams, useSearchParams } from "react-router-dom";
import { stayService } from "../../services/stay/stay.service.local";
import { useSelector } from "react-redux";
import { ReserveCard } from "../../cmps/order/ReserveCard";
import { StayDetailsMap } from "../../cmps/stay/StayDetailsMap";
import { format } from "date-fns";

const conclusionList = [
  {
    title: "Peace and quiet",
    desc: "This home is in a quiet area.",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        aria-hidden="true"
        role="presentation"
        focusable="false"
        style={{
          display: "block",
          height: "24px",
          width: "24px",
          fill: "currentcolor",
        }}
      >
        <path d="M16 0a12 12 0 0 1 12 12c0 6.34-3.81 12.75-11.35 19.26l-.65.56-1.08-.93C7.67 24.5 4 18.22 4 12 4 5.42 9.4 0 16 0zm0 2C10.5 2 6 6.53 6 12c0 5.44 3.25 11.12 9.83 17.02l.17.15.58-.52C22.75 23 25.87 17.55 26 12.33V12A10 10 0 0 0 16 2zm0 5a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"></path>
      </svg>
    ),
  },
  {
    title: "Self check-in",
    desc: "Check yourself in with the lockbox.",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        aria-hidden="true"
        role="presentation"
        focusable="false"
        style={{
          display: "block",
          height: "24px",
          width: "24px",
          fill: "currentcolor",
        }}
      >
        <path d="M24.33 1.67a2 2 0 0 1 2 1.85v24.81h3v2H2.67v-2h3V3.67a2 2 0 0 1 1.85-2h.15zm-4 2H7.67v24.66h12.66zm4 0h-2v24.66h2zm-7 11a1.33 1.33 0 1 1 0 2.66 1.33 1.33 0 0 1 0-2.66z"></path>
      </svg>
    ),
  },
  {
    title: "Park for free",
    desc: "This is one of the few places in the area with free parking.",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        aria-hidden="true"
        role="presentation"
        focusable="false"
        style={{
          display: "block",
          height: "24px",
          width: "24px",
          fill: "currentcolor",
        }}
      >
        <path d="M16 1a15 15 0 1 1 0 30 15 15 0 0 1 0-30zm0 2a13 13 0 1 0 0 26 13 13 0 0 0 0-26zm2 5a5 5 0 0 1 .22 10H13v6h-2V8zm0 2h-5v6h5a3 3 0 0 0 .18-6z"></path>
      </svg>
    ),
  },
];

export function StayDetails() {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();
  const [stay, setStay] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [modalContentType, setModalContentType] = useState(false);
  const [datesRange, setDatesRange] = useState([
    searchParams.get("startDate"),
    searchParams.get("endDate"),
  ]);
  const [heartClicked, setHeartClicked] = useState(false);

  useEffect(() => {
    loadStay();
  }, [params.stayId]);

  useEffect(() => {
    if (datesRange[0] && datesRange[1]) {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set("startDate", datesRange[0]);
        params.set("endDate", datesRange[1]);
        return params;
      });
    }
  }, [datesRange]);

  useEffect(() => {
    setDatesRange([searchParams.get("startDate"), searchParams.get("endDate")]);
  }, [searchParams]);

  useEffectUpdate(() => {
    toggleIsDetailsModalOpen();
  }, [modalContentType]);

  async function loadStay() {
    setIsLoading(true);
    try {
      const stay = await stayService.getById(params.stayId);
      console.log({ stay });

      setStay(stay);
    } catch (err) {
      alert("Error loading your request");
      //todo: add navigation back to home including the search params
    } finally {
      setIsLoading(false);
    }
  }

  function toggleIsDetailsModalOpen() {
    setIsDetailsModalOpen((prev) => !prev);
  }

  function handleDatesSelect({ dates }) {
    setDatesRange([dates[0], dates[1]]);
  }

  function onHeartClick() {
    if (heartClicked) {
      setHeartClicked(false);
    } else {
      setHeartClicked(true);
    }
  }

  function getNumberOfNights() {
    const [startDateStr, endDateStr] = datesRange;
    if (!startDateStr || !endDateStr) return 0;

    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    const msPerNight = 1000 * 60 * 60 * 24;
    const diffInMs = endDate - startDate;

    const nights = Math.round(diffInMs / msPerNight);
    return nights > 0 ? nights : 0;
  }

  function renderDatePickerTitle() {
    if (!datesRange[0] && !datesRange[1]) return "Select check-in date";
    if (datesRange[0] && !datesRange[1]) return "Select checkout date";
    const number = getNumberOfNights();
    if (datesRange[0] && datesRange[1])
      return `${number} night${number > 1 ? "s" : ""} in ${loc.city}`;
  }

  function renderDatePickerSubTitle() {
    if (!datesRange[0] && !datesRange[1])
      return "When do you want to start your stay?";
    if (datesRange[0] && !datesRange[1]) return "When do you wish to leave?";
    if (datesRange[0] && datesRange[1])
      return `${format(datesRange[0], "MMM d, yyyy")} - ${format(
        datesRange[1],
        "MMM d, yyyy"
      )}`;
  }

  if (isLoading || !stay) return <div className="loader">loading</div>;

  const {
    name,
    imgUrls,
    price,
    summary,
    capacity,
    amenities,
    bathrooms,
    bedrooms,
    roomType,
    host,
    loc,
    reviews,
    likedByUsers,
    occupancy,
  } = stay;

  function getAverageRate() {
    const starSum = reviews.reduce((acc, review) => acc + review.starsRate, 0);
    const avg = starSum / reviews.length;
    return parseFloat(avg.toFixed(2));
  }

  function getBlockedRanges() {
    return occupancy.map(({ startDate, endDate }) => [
      new Date(startDate),
      new Date(endDate),
    ]);
  }

  return (
    <section className="stay-details">
      <section className="title-section">
        <h1>{name}</h1>
        <button className="save-btn" onClick={onHeartClick}>
          <div className={`heart-icon ${heartClicked ? "clicked" : ""}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              aria-hidden="true"
              role="presentation"
              focusable="false"
            >
              <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path>
            </svg>
          </div>
          <span className="save-btn-text">{`Save${
            heartClicked ? "d" : ""
          }`}</span>
        </button>
      </section>
      <section className="img-section">
        {imgUrls.slice(0, 5).map((url, idx) => (
          <div key={url} className={`img-wrapper img-${idx + 1}`}>
            <img src={url} alt={`stay-img-${idx}`} />
          </div>
        ))}
      </section>
      <section className="details-section">
        <div className="reserve-container">
          <ReserveCard
            stay={stay}
            datesRange={datesRange}
            blockedRanges={getBlockedRanges()}
            onDateSelect={handleDatesSelect}
          />
        </div>
        <div className="room-details-container">
          <h2 className="room-type">{`${roomType} in ${loc.city}, ${loc.country}`}</h2>
          <ol className="room-details-ol">
            <li>
              {`${capacity} guest`}
              {capacity > 1 && "s"}
            </li>
            <li>
              {`${bedrooms} bedroom`}
              {bedrooms > 1 && "s"}
            </li>
            <li>
              {`${bathrooms} bath`}
              {bathrooms > 1 && "s"}
            </li>
          </ol>
          <span className="avg-rate">
            <img src={starIcon} />
            {getAverageRate()}
          </span>
        </div>
        <div className="host-conclusions-grid">
          <div className="host-container">
            {/* <img src={host.pictureUrl} alt={"host-img"} /> */}
            <img src={guestUnknown} alt={"host-img"} />
            <div className="host-dec">
              <h2 className="host">{`Hosted by ${host.fullname}`}</h2>
              {host.isSuperhost && <span>Superhost</span>}
            </div>
          </div>
          <div className="conclusions-container">
            {conclusionList.map((conclusion) => (
              <Conclusion key={conclusion.title} conclusion={conclusion} />
            ))}
          </div>
        </div>
        <div className="summary-container">
          <Summary
            summary={summary}
            onShowMore={() => {
              setModalContentType("summary");
            }}
          />
        </div>
        <div className="amenities-container">
          <AmenitiesPreview
            amenities={amenities}
            onShowMore={() => {
              setModalContentType("amenities");
            }}
          />
        </div>
        <div className="date-picker-container">
          <h2 className="date-picker-title">{renderDatePickerTitle()}</h2>
          <h2 className="date-picker-subtitle">{renderDatePickerSubTitle()}</h2>
          <StayDatePicker
            dates={datesRange}
            blockedRanges={getBlockedRanges()}
            onSelect={handleDatesSelect}
          />
        </div>
      </section>
      <section className="reviews-section">reviews section</section>
      <section className="map-section">
        <StayDetailsMap
          city={loc.city}
          country={loc.country}
          lat={loc.lat}
          lng={loc.lan}
        />
      </section>
    </section>
  );
}

function Conclusion({ conclusion }) {
  const { title, desc, svg } = conclusion;
  return (
    <div className="conclusion">
      <div className="conclusion-icon">{svg}</div>
      <div className="conclusion-details">
        <h3>{title}</h3>
        <span>{desc}</span>
      </div>
    </div>
  );
}

function Summary({ summary, onShowMore }) {
  const isSummaryLong = summary.length > 300;
  const summaryToDisplay = isSummaryLong
    ? summary.slice(0, 300) + "..."
    : summary;
  return (
    <div className="summary">
      <p>{summaryToDisplay}</p>
      {isSummaryLong && (
        <button className="show-more-btn" onClick={onShowMore}>
          Show more
        </button>
      )}
    </div>
  );
}

function AmenitiesPreview({ amenities, onShowMore }) {
  const isAmenitiesLong = amenities.length > 10;
  const amenitiesToDisplay = isAmenitiesLong
    ? amenities.slice(0, 10)
    : amenities;
  return (
    <div className="amenities-preview">
      <h2>What this place offers</h2>
      <div className="amenities-preview-display">
        {amenitiesToDisplay.map((amenity) => (
          <Amenity key={amenity} amenityName={amenity} />
        ))}
      </div>
      {isAmenitiesLong && (
        <button className="show-more-btn" onClick={onShowMore}>
          Show all {amenities.length} amenities
        </button>
      )}
    </div>
  );
}
