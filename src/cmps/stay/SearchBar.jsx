import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, useRef } from "react";
import { SearchWherePicker } from "./SearchWherePicker";
import { SearchDatePicker } from "./SearchDatePicker";
import { SearchWhoPicker } from "./SearchWhoPicker";
import { useSelector } from "react-redux";
import { format } from "date-fns";

export function SearchBar({
  destination,
  setDestination,
  datesRange,
  setDatesRange,
  guests,
  guestsDisplay,
  onSetGuests,
  updateFilterBy,
}) {
  const formRef = useRef(null);
  const [activeSearchControl, setActiveSearchControl] = useState("");
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
    };
  }, []);

  useEffect(() => {
    if (destination) {
      setSearchInputValue(destination);
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
    setDatesRange(dates);

    if (type === "check-in") {
      setActiveSearchControl("check-out");
    }
  }

  function onSubmitSearch(event) {
    event.preventDefault();
    setActiveSearchControl("");
    updateFilterBy();
    console.log("search");
  }

  return (
    <section className={`search-bar`}>
      <form
        ref={formRef}
        className={activeSearchControl ? "active" : ""}
        onSubmit={onSubmitSearch}
      >
        <div
          className={`search-control ${
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
            type="search"
            placeholder="Search destinations"
            value={searchInputValue}
            onChange={onDestinationSearchChange}
          />
        </div>
        <span
          className={`splitter ${renderSplitterActiveClass(
            "where",
            "check-in"
          )}`}
        ></span>
        <div
          className={`search-control ${
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
        </div>
        <span
          className={`splitter ${renderSplitterActiveClass(
            "check-in",
            "check-out"
          )}`}
        ></span>
        <div
          className={`search-control ${
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
        </div>
        <span
          className={`splitter ${renderSplitterActiveClass(
            "check-out",
            "who"
          )}`}
        ></span>
        <div
          className={`search-control ${
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
        </div>
        <button className="search-button">
          <FontAwesomeIcon icon={faSearch} />
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
