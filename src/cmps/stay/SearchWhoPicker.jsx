import { useEffect, useState } from "react";
import { SearchPickerWrapper } from "./SearchPickerWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

export function SearchWhoPicker({ type, guests, onSetGuests }) {
  const [guestsToEdit, setGuestsToEdit] = useState([...guests]);
  const [nonAdultsIncluded, setNonAdultsIncluded] = useState();

  useEffect(() => {
    checkForNonAdults(guestsToEdit);
    onSetGuests(guestsToEdit);
  }, [guestsToEdit]);

  function checkForNonAdults(guestsArray) {
    const hasNonAdults = guestsArray.some(
      (guest) => guest.type !== "adults" && guest.count > 0
    );

    setNonAdultsIncluded(hasNonAdults);
  }

  function onSelect({ actionType, type }) {
    setGuestsToEdit((prevGuests) => {
      const updatedGuests = prevGuests.map((guest) => {
        if (guest.type === type) {
          return {
            ...guest,
            count:
              actionType === "increase"
                ? guest.count + 1
                : Math.max(0, guest.count - 1),
          };
        }
        return guest;
      });

      if (actionType === "increase" && type !== "adults") {
        const adultsObj = updatedGuests.find((g) => g.type === "adults");

        if (adultsObj && adultsObj.count === 0) {
          return updatedGuests.map((guest) => {
            if (guest.type === "adults") {
              return { ...guest, count: 1 };
            }
            return guest;
          });
        }
      }

      return updatedGuests;
    });
  }

  return (
    <SearchPickerWrapper type={type}>
      <section className="search-who-picker">
        {guestsToEdit.map((guest) => (
          <GuestSelectionBracket
            key={guest.type}
            guest={guest}
            onSelect={onSelect}
            nonAdultsIncluded={nonAdultsIncluded}
          />
        ))}
      </section>
    </SearchPickerWrapper>
  );
}

function GuestSelectionBracket({ guest, onSelect, nonAdultsIncluded }) {
  const { type, desc, count } = guest;
  function determineDisabledButton() {
    return type === "adults" ? nonAdultsIncluded && count <= 1 : count === 0;
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
            onSelect({ actionType: "increase", type });
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </section>
  );
}
