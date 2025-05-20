import { faSearch, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, useRef } from "react";
import { SearchWherePicker } from "./SearchWherePicker";
import { SearchDatePicker } from "./SearchDatePicker";
import { SearchWhoPicker } from "./SearchWhoPicker";
import { format } from "date-fns";
import { INITIAL_GUESTS } from "../../services/stay/stay.service.local";

export function SearchBar({
  activeSearchControl,
  setActiveSearchControl,
  destination,
  setDestination,
  datesRange,
  onSetDatesRange,
  guests,
  guestsDisplay,
  onSetGuests,
  updateFilterBy,
}) {
  const formRef = useRef(null);
  const [hoveredSearchControl, setHoveredSearchControl] = useState("");
  const [searchInputValue, setSearchInputValue] = useState("");

  useEffect(() => {
    function handleClickOutside(event) {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setActiveSearchControl("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      setActiveSearchControl("");
    };
  }, []);

  useEffect(() => {
    if (destination) {
      setSearchInputValue(destination);
    } else {
      setSearchInputValue("");
    }
  }, [destination]);

  function renderSplitterActiveClass(leftControl, rightControl) {
    return activeSearchControl === leftControl ||
      activeSearchControl === rightControl ||
      hoveredSearchControl === leftControl ||
      hoveredSearchControl === rightControl
      ? "active"
      : "";
  }

  function handleSearchSelection(selection) {
    switch (selection.type) {
      case "where":
        handleWhereSelection(selection);
        break;
      case "check-in":
      case "check-out":
        handleDateSelection(selection);
        break;
      case "who":
        break;
      default:
        break;
    }
  }

  function onDestinationSearchChange(ev) {
    setActiveSearchControl("where");
    if (!ev.target.value) setDestination("");
    setSearchInputValue(ev.target.value);
  }

  function handleWhereSelection({ city }) {
    setDestination(`${city}`);
    setActiveSearchControl("check-in");
  }

  function handleDateSelection({ type, dates }) {
    onSetDatesRange(dates);

    if (type === "check-in") {
      setActiveSearchControl("check-out");
    }
  }

  function onResetClick(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    switch (activeSearchControl) {
      case "where":
        setSearchInputValue("");
        setDestination("");
        break;
      case "check-in":
        onSetDatesRange([]);
        break;
      case "check-out":
        onSetDatesRange([]);
        setActiveSearchControl("check-in");
        break;
      case "who":
        onSetGuests(structuredClone(INITIAL_GUESTS));
        break;
      default:
        break;
    }
  }

  async function onSubmitSearch(event) {
    event.preventDefault();
    setActiveSearchControl("");
    await updateFilterBy();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const guestsCount = guests.reduce(
    (totalCount, guest) => totalCount + guest.count,
    0
  );

  return (
    <section className={`search-bar`}>
      <form
        ref={formRef}
        className={activeSearchControl ? "active" : ""}
        onSubmit={onSubmitSearch}
      >
        <div
          className={`search-control where ${
            activeSearchControl === "where" ? "active" : ""
          }`}
          onMouseEnter={() => setHoveredSearchControl("where")}
          onMouseLeave={() => setHoveredSearchControl("")}
          onClick={() =>
            setActiveSearchControl(
              activeSearchControl === "where" ? "" : "where"
            )
          }
        >
          <span className="title">Where</span>
          <input
            type="text"
            placeholder="Search destinations"
            value={searchInputValue}
            onChange={onDestinationSearchChange}
          />
          {activeSearchControl === "where" && searchInputValue && (
            <button type="button" className="reset-btn" onClick={onResetClick}>
              <FontAwesomeIcon icon={faX} />
            </button>
          )}
        </div>
        <span
          className={`splitter ${renderSplitterActiveClass(
            "where",
            "check-in"
          )}`}
        ></span>
        <div
          className={`search-control check-in ${
            activeSearchControl === "check-in" ? "active" : ""
          }`}
          onMouseEnter={() => setHoveredSearchControl("check-in")}
          onMouseLeave={() => setHoveredSearchControl("")}
          onClick={() =>
            setActiveSearchControl(
              activeSearchControl === "check-in" ? "" : "check-in"
            )
          }
        >
          <span className="title">Check in</span>
          <span className="subtitle">
            {datesRange[0] ? format(datesRange[0], "MMM d") : "Add dates"}
          </span>
          {activeSearchControl === "check-in" && datesRange.length !== 0 && (
            <button type="button" className="reset-btn" onClick={onResetClick}>
              <FontAwesomeIcon icon={faX} />
            </button>
          )}
        </div>
        <span
          className={`splitter ${renderSplitterActiveClass(
            "check-in",
            "check-out"
          )}`}
        ></span>
        <div
          className={`search-control check-out ${
            activeSearchControl === "check-out" ? "active" : ""
          }`}
          onMouseEnter={() => setHoveredSearchControl("check-out")}
          onMouseLeave={() => setHoveredSearchControl("")}
          onClick={() =>
            setActiveSearchControl(
              activeSearchControl === "check-out" ? "" : "check-out"
            )
          }
        >
          <span className="title"> Check Out</span>
          <span className="subtitle">
            {datesRange[1] ? format(datesRange[1], "MMM d") : "Add dates"}
          </span>
          {activeSearchControl === "check-out" && datesRange.length !== 0 && (
            <button type="button" className="reset-btn" onClick={onResetClick}>
              <FontAwesomeIcon icon={faX} />
            </button>
          )}
        </div>
        <span
          className={`splitter ${renderSplitterActiveClass(
            "check-out",
            "who"
          )}`}
        ></span>
        <div
          className={`search-control who ${
            activeSearchControl === "who" ? "active" : ""
          }`}
          onMouseEnter={() => setHoveredSearchControl("who")}
          onMouseLeave={() => setHoveredSearchControl("")}
          onClick={() =>
            setActiveSearchControl(activeSearchControl === "who" ? "" : "who")
          }
        >
          <span className="title">Who</span>
          <span className="subtitle">{guestsDisplay}</span>
          {activeSearchControl === "who" && guestsCount > 0 && (
            <button type="button" className="reset-btn" onClick={onResetClick}>
              <FontAwesomeIcon icon={faX} />
            </button>
          )}
        </div>
        <button
          className={`search-button ${activeSearchControl ? "active" : ""}`}
        >
          <FontAwesomeIcon icon={faSearch} />
          {activeSearchControl && <span>Search</span>}
          <span></span>
        </button>
        {activeSearchControl && (
          <DynamicSearchPicker
            type={activeSearchControl}
            onSelect={handleSearchSelection}
            searchInputValue={searchInputValue}
            dates={datesRange}
            onSetGuests={onSetGuests}
            guests={guests}
          />
        )}
      </form>
    </section>
  );
}
function DynamicSearchPicker(props) {
  switch (props.type) {
    case "where":
      return <SearchWherePicker {...props} />;
    case "check-in":
    case "check-out":
      return <SearchDatePicker {...props} />;
    case "who":
      return <SearchWhoPicker {...props} />;
  }
}
