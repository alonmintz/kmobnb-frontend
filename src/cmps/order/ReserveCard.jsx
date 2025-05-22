import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { format } from "date-fns";
import {
  faX,
  faMinus,
  faPlus,
  faAngleDown,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { StayDatePicker } from "../stay/StayDatePicker";

//TODO: move to order service:
const DAILY_FEE = 4;

export function ReserveCard({
  stay,
  datesRange,
  blockedRanges,
  onDateSelect,
  setShowMiniReserve,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDatesChosen, setIsDatesChosen] = useState(checkDatesRange());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [nightsCount, setNightsCount] = useState(0);
  const guests = useSelector((storeState) => storeState.stayModule.guests);
  const [guestsDisplay, setGuestsDisplay] = useState(renderGuestsDisplay());
  const [showGuestPicker, setShowGuestPicker] = useState(false);
  const [nonAdultsIncluded, setNonAdultsIncluded] = useState();
  const dateWrapperRef = useRef();
  const guestsRef = useRef();
  const guestPickerRef = useRef();
  const reserveButtonRef = useRef();
  const navigate = useNavigate();

  const { price: pricePerNight } = stay;

  useEffect(() => {
    setIsDatesChosen(checkDatesRange());
    setNightsCount(getNumberOfNights());
    if (checkDatesRange()) setShowDatePicker(false);
  }, [datesRange]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        showDatePicker &&
        dateWrapperRef.current &&
        !dateWrapperRef.current.contains(event.target)
      ) {
        setShowDatePicker(false);
      }
      if (
        showGuestPicker &&
        guestPickerRef.current &&
        !guestPickerRef.current.contains(event.target) &&
        guestsRef.current &&
        !guestsRef.current.contains(event.target)
      ) {
        setShowGuestPicker(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDatePicker, showGuestPicker]);

  useEffect(() => {
    setGuestsDisplay(renderGuestsDisplay());
    checkForNonAdults();
  }, [guests]);

  useEffect(() => {
    function handleScroll() {
      const el = reserveButtonRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const isVisible = rect.bottom > 0;
      setShowMiniReserve(!isVisible);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function checkDatesRange() {
    return datesRange[0] && datesRange[1];
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

  function onDateBlockClick() {
    if (!showDatePicker) setShowDatePicker(true);
  }

  function onResetClick(ev) {
    ev.stopPropagation();
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.delete("startDate");
      params.delete("endDate");
      return params;
    });
  }

  function renderGuestsDisplay() {
    const guestsDisplayArray = [];
    let guestCount = 0;
    guests.forEach(({ type, count }) => {
      switch (type) {
        case "adults":
          guestCount += count;
          break;
        case "children":
          guestCount += count;
          break;
        case "infants":
          {
            if (count > 0) {
              guestsDisplayArray.push(`${count} infant${count > 1 ? "s" : ""}`);
            }
          }
          break;
        case "pets":
          {
            if (count > 0) {
              guestsDisplayArray.push(`${count} pet${count > 1 ? "s" : ""}`);
            }
          }
          break;
        default:
          break;
      }
    });

    if (guestCount > 0)
      guestsDisplayArray.unshift(
        `${guestCount} guest${guestCount > 1 ? "s" : ""}`
      );

    return !guestsDisplayArray.length
      ? "Add guests"
      : guestsDisplayArray.join(", ");
  }

  function toggleGuestsPicker() {
    setShowGuestPicker((prev) => !prev);
  }

  function checkForNonAdults() {
    const hasNonAdults = guests.some(
      (guest) => guest.type !== "adults" && guest.count > 0
    );

    setNonAdultsIncluded(hasNonAdults);
  }

  function onDecreaseIncreaseGuests({ actionType, type: guestType }) {
    const current = parseInt(searchParams.get(guestType)) || 0;
    const currentCapacity = parseInt(searchParams.get("capacity")) || 0;

    let updatedGuestCount;
    let updatedCapacity;

    if (actionType === "increase") {
      updatedGuestCount = current + 1;
      updatedCapacity = currentCapacity + 1;
      if (
        guestType != "adults" &&
        (!searchParams.get("adults") || searchParams.get("adults") === "0")
      ) {
        searchParams.set("adults", 1);
        updatedCapacity += 1;
      }
    } else if (actionType === "decrease" && current > 0) {
      updatedGuestCount = current - 1;
      if (currentCapacity > 0) updatedCapacity = currentCapacity - 1;
    } else {
      return;
    }

    searchParams.set(guestType, updatedGuestCount);
    searchParams.set("capacity", updatedCapacity);
    setSearchParams(searchParams);
  }

  function onReserveClick() {
    if (!isDatesChosen) {
      setShowDatePicker(true);
    } else {
      const queryString = searchParams.toString();
      navigate(`/order/${stay._id}/?${queryString}`);
    }
  }

  return (
    <section className="reserve-card">
      <div className="price-title">
        {isDatesChosen ? (
          <h2>
            <span className="price-title-number">${pricePerNight}</span>
            <span> night</span>
          </h2>
        ) : (
          <h2 className="dates-missing-title">Add dates for prices</h2>
        )}
      </div>
      <section className="reserve-picker">
        <div className="reserve-item check-in" onClick={onDateBlockClick}>
          <span className="title">CHECK-IN</span>
          <span className="subtitle">
            {datesRange[0] ? format(datesRange[0], "dd/MM/yyyy") : "Add dates"}
          </span>
        </div>
        <div className="reserve-item check-out" onClick={onDateBlockClick}>
          <span className="title">CHECKOUT</span>
          <span className="subtitle">
            {datesRange[1] ? format(datesRange[1], "dd/MM/yyyy") : "Add dates"}
          </span>
        </div>
        {showDatePicker && (
          <section ref={dateWrapperRef} className="date-picker-wrapper">
            <div className="date-brackets">
              <div className="date-bracket check-in">
                <span className="title">Check-in</span>
                <span className="subtitle">
                  {datesRange[0]
                    ? format(datesRange[0], "dd/MM/yyyy")
                    : "Add dates"}
                </span>
                {isDatesChosen && showDatePicker && (
                  <button
                    type="button"
                    className="reset-btn"
                    onClick={onResetClick}
                  >
                    <FontAwesomeIcon icon={faX} />
                  </button>
                )}
              </div>
              <div className="date-bracket check-out">
                <span className="title">Checkout</span>
                <span className="subtitle">
                  {datesRange[1]
                    ? format(datesRange[1], "dd/MM/yyyy")
                    : "Add dates"}
                </span>
                {isDatesChosen && showDatePicker && (
                  <button
                    type="button"
                    className="reset-btn"
                    onClick={onResetClick}
                  >
                    <FontAwesomeIcon icon={faX} />
                  </button>
                )}
              </div>
            </div>
            <div>
              <StayDatePicker
                dates={datesRange}
                blockedRanges={blockedRanges}
                onSelect={onDateSelect}
              />
            </div>
            <button
              className="close-btn"
              onClick={() => setShowDatePicker(false)}
            >
              close
            </button>
          </section>
        )}
        <div
          ref={guestsRef}
          className="reserve-item guests"
          onClick={toggleGuestsPicker}
        >
          <span className="title">GUESTS</span>
          <span className="subtitle">{guestsDisplay}</span>
          <span className="arrow">
            {showGuestPicker ? (
              <FontAwesomeIcon icon={faAngleUp} />
            ) : (
              <FontAwesomeIcon icon={faAngleDown} />
            )}
          </span>
          {showGuestPicker && (
            <section
              ref={guestPickerRef}
              onClick={(ev) => ev.stopPropagation()}
              className="reserve-guest-picker"
            >
              {guests.map((guest) => (
                <GuestSelectionBracket
                  key={guest.type}
                  guest={guest}
                  onSelect={onDecreaseIncreaseGuests}
                  nonAdultsIncluded={nonAdultsIncluded}
                />
              ))}
            </section>
          )}
        </div>
      </section>
      <button
        ref={reserveButtonRef}
        className="reserve-btn"
        onClick={onReserveClick}
      >
        <span>{isDatesChosen ? "Reserve" : "Check availability"}</span>
      </button>
      {isDatesChosen && (
        <section className="price-calc-section">
          <div className="price-row total-nights">
            <span className="price-desc">{`$${pricePerNight} x ${nightsCount} night${
              nightsCount > 1 ? "s" : ""
            }`}</span>
            <span className="price-sum">
              {`$${Math.imul(pricePerNight, nightsCount)}`}
            </span>
          </div>
          <div className="price-row service-fee">
            <span className="price-desc">Service fee</span>
            <span className="price-sum">{`$${Math.imul(
              DAILY_FEE,
              nightsCount
            )}`}</span>
          </div>
          <div className="price-row total-price">
            <span className="price-desc">Total</span>
            <span className="price-sum">{`$${
              Math.imul(pricePerNight, nightsCount) +
              Math.imul(DAILY_FEE, nightsCount)
            }`}</span>
          </div>
        </section>
      )}
    </section>
  );
}

function GuestSelectionBracket({ guest, onSelect, nonAdultsIncluded }) {
  const { type, desc, count } = guest;
  function determineDisabledButton() {
    return type === "adults" ? adultCountCheck() : count === 0;
  }

  function adultCountCheck() {
    return nonAdultsIncluded ? count <= 1 : count === 0;
  }

  return (
    <section className="guest-selection-bracket">
      <div className="guest-details">
        <span className="guest-type">{type}</span>
        <span className="guest-description">{desc}</span>
      </div>
      <div className="guest-count-container">
        <button
          className="action-btn decrease-btn"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onSelect({ actionType: "decrease", type });
          }}
          disabled={determineDisabledButton()}
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <span className="guest-count">{count}</span>
        <button
          className="action-btn increase-btn"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onSelect({ actionType: "increase", type });
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </section>
  );
}
