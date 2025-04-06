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
      <div className="destination" onClick={() => onSelect("where")}>
        {filterBy.city}
      </div>
      <span className="splitter"></span>
      <div className="dates-range" onClick={() => onSelect("check-in")}>
        {format(filterBy.startDate, "MMM d")}
        {/* {filterBy.startDate}-{filterBy.endDate} */}
      </div>
      <span className="splitter"></span>
      <div className="capacity" onClick={() => onSelect("who")}>
        {filterBy.capacity}
      </div>
      <button className="search-button">
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </section>
  );
}
