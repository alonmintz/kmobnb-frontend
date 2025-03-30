import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function SearchBar() {
  function onSubmitSearch() {
    console.log("search");
  }
  return (
    <section className="search-bar">
      <form onSubmit={onSubmitSearch}>
        <div className="search-control">
          <span className="title">Where</span>
          <input type="search" placeholder="Search destinations" />
        </div>
        <span className="splitter"></span>
        <div className="search-control">
          <span className="title">Check in</span>
          <span className="subtitle">Add dates</span>
        </div>
        <span className="splitter"></span>
        <div className="search-control">
          <span className="title"> Check Out</span>
          <span className="subtitle">Add dates</span>
        </div>
        <span className="splitter"></span>
        <div className="search-control">
          <span className="title">Who</span>
          <span className="subtitle">Add guests</span>
        </div>
        <button>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
    </section>
  );
}
