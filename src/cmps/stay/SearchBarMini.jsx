import { format } from "date-fns";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function SearchBarMini({ onSelect }) {
  const filterBy = useSelector((storeState) => storeState.stayModule.filterBy);
  const { city, startDate, endDate, capacity } = filterBy;

  function formatDatesDisplay() {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const sameMonth = start.getMonth() === end.getMonth();

    if (sameMonth) {
      return `${format(start, "MMM d")} - ${format(end, "d")}`;
    } else {
      return `${format(start, "MMM d")} - ${format(end, "MMM d")}`;
    }
  }

  return (
    <section className="search-bar-mini">
      <div
        className="mini-display destination"
        onClick={() => onSelect("where")}
      >
        <span className="filter-display">{city ? city : "Anywhere"}</span>
        {/* {filterBy.city} */}
      </div>
      <span className="splitter"></span>
      <div
        className="mini-display dates-range"
        onClick={() => onSelect("check-in")}
      >
        <span className="filter-display">
          {startDate && endDate ? formatDatesDisplay() : "Any week"}
        </span>
      </div>
      <span className="splitter"></span>
      <div className="mini-display capacity" onClick={() => onSelect("who")}>
        <span className="filter-display">
          {capacity ? `${capacity} guests` : "Add guests"}
        </span>
        {/*  */}
      </div>
      <button className="search-button" onClick={() => onSelect("")}>
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </section>
  );
}
