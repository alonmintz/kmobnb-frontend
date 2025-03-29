import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, useRef } from "react";
import { SearchWherePicker } from "./SearchWherePicker";
import { SearchDatePicker } from "./SearchDatePicker";
import { SearchWhoPicker } from "./SearchWhoPicker";
import { useSelector } from "react-redux";
import { format } from "date-fns";

export function SearchBar() {
  //TODO: integrate filterBy from store
  // const filterBy = useSelector(storeState=> storeState.)
  const formRef = useRef(null);
  const [activeSearchControl, setActiveSearchControl] = useState("");
  const [hoveredSearchControl, setHoveredSearchControl] = useState("");
  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchDestination, setSearchDestination] = useState("");
  const [datesRange, setDatesRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
      color: "#000",
    },
  ]);
  //   const [checkInValue, setCheckInValue] = useState(null);
  //   const [checkOutValue, setCheckOutValue] = useState(null);

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
    if (searchDestination) {
      setSearchInputValue(searchDestination);
    }
  }, [searchDestination]);

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

  function handleWhereSelection({ city }) {
    setSearchDestination(`${city}`);
    setActiveSearchControl("check-in");
  }

  function handleDateSelection({ type, item }) {
    setDatesRange([item.selection]);
    if (type === "check-in") {
      setActiveSearchControl("check-out");
    }
  }

  function onSubmitSearch(event) {
    event.preventDefault();
    setActiveSearchControl("");
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
            onChange={(ev) => {
              setActiveSearchControl("where");
              setSearchInputValue(ev.target.value);
            }}
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
            {datesRange[0].startDate
              ? format(datesRange[0].startDate, "MMM d")
              : "Add dates"}
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
            {datesRange[0].endDate
              ? format(datesRange[0].endDate, "MMM d")
              : "Add dates"}
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
          <span className="subtitle">Add guests</span>
        </div>
        <button className="search-button">
          <FontAwesomeIcon icon={faSearch} />
        </button>
        {activeSearchControl && (
          <DynamicSearchPicker
            type={activeSearchControl}
            onSelect={handleSearchSelection}
            searchInputValue={searchInputValue}
            ranges={datesRange}
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
