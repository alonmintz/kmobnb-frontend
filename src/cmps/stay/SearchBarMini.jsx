import { format } from "date-fns";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function SearchBarMini({ onSelect }) {
  const filterBy = useSelector((storeState) => storeState.stayModule.filterBy);
  useEffect(() => {
    console.log({ filterBy });
  }, [filterBy]);
  //TODO: work on the div styling and display
  return (
    <section className="search-bar-mini">
      <div
        className="mini-display destination"
        onClick={() => onSelect("where")}
      >
        <span className="filter-display">Anywhere</span>
        {/* {filterBy.city} */}
      </div>
      <span className="splitter"></span>
      <div
        className="mini-display dates-range"
        onClick={() => onSelect("check-in")}
      >
        <span className="filter-display">Any week</span>
        {/* {filterBy.startDateformat ? (
          <span>{format(filterBy.startDate, "MMM d")}</span>
        ) : (
          <span>No</span>
        )} */}
      </div>
      <span className="splitter"></span>
      <div className="mini-display capacity" onClick={() => onSelect("who")}>
        <span className="filter-display">Add guests</span>
        {/* {filterBy.capacity} */}
      </div>
      <button className="search-button" onClick={() => onSelect("")}>
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </section>
  );
}
