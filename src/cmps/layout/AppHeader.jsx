import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service";
import { logout } from "../../store/actions/user.actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { SearchBar } from "../stay/SearchBar";
import { useEffect, useRef, useState } from "react";
import { stayActions } from "../../store/actions/stay.actions";
import { animateCSS } from "../../services/util.service";
import { SearchBarMini } from "../stay/SearchBarMini";

export function AppHeader() {
  // const user = useSelector((storeState) => storeState.userModule.user);

  const [filterByToEdit, setFilterByToEdit] = useState({});
  const [activeSearchControl, setActiveSearchControl] = useState("");
  const [destination, setDestination] = useState("");
  const datesRange = useSelector(
    (storeState) => storeState.stayModule.datesRange
  );
  const guests = useSelector((storeState) => storeState.stayModule.guests);
  const [guestsDisplay, setGuestsDisplay] = useState("");
  const [isSearchBarShow, setIsSearchBarShow] = useState(true);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(() => window.scrollY === 0);
  const [isManuallyTriggered, setIsManuallyTriggered] = useState(false);
  const isManuallyTriggeredRef = useRef(false);
  const justTriggeredManually = useRef(false);
  const shouldShowSearchBar = isAtTop || isManuallyTriggered;
  const searchBarRef = useRef();
  const miniSearchBarRef = useRef();
  // const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const atTop = window.scrollY === 0;
      setIsAtTop(atTop);

      if (
        !atTop &&
        isManuallyTriggeredRef.current &&
        !justTriggeredManually.current
      ) {
        console.log("here");
        setIsManuallyTriggered(false);
        isManuallyTriggeredRef.current = false;
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initialize
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isAtTop) {
      setIsManuallyTriggered(false); // clear manual override when back at top
    }
  }, [isAtTop]);

  useEffect(() => {
    if (shouldShowSearchBar) {
      animateSearchBarEntrance();
    } else {
      animateSearchBarLeave();
    }
    async function animateSearchBarEntrance() {
      await setIsSearchBarVisible(true);
      animateCSS(searchBarRef.current, "fadeInDown");
    }

    async function animateSearchBarLeave() {
      // animateCSS(searchBarRef.current, "fadeOutUp");
      setIsSearchBarVisible(false);
    }
  }, [shouldShowSearchBar]);

  useEffect(() => {
    if (isSearchBarVisible) {
      animateCSS(miniSearchBarRef.current, "fadeOut");
    } else {
      animateCSS(miniSearchBarRef.current, "fadeInUp");
    }
  }, [isSearchBarVisible]);

  useEffect(() => {
    updateDestinationFilter();
  }, [destination]);

  useEffect(() => {
    updateDatesRangeFilter();
  }, [datesRange]);

  useEffect(() => {
    setGuestsDisplay(renderGuestsDisplay());
    updateGuestsFilter();
  }, [guests]);

  function updateDestinationFilter() {
    setFilterByToEdit((prevFilterByToEdit) => ({
      ...prevFilterByToEdit,
      city: destination,
    }));
  }

  function onSetDatesRange(datesRange) {
    stayActions.setDatesRange(datesRange);
  }

  function updateDatesRangeFilter() {
    setFilterByToEdit((prevFilterByToEdit) => ({
      ...prevFilterByToEdit,
      startDate: datesRange[0],
      endDate: datesRange[1],
    }));
  }

  function updateGuestsFilter() {
    const hasPets = (guestsArray) => {
      const petGuest = guestsArray.find((guest) => guest.type === "pets");
      return petGuest ? petGuest.count > 0 : false;
    };
    setFilterByToEdit((prevFilterByToEdit) => ({
      ...prevFilterByToEdit,
      capacity: guests.reduce(
        (totalCount, guest) => totalCount + guest.count,
        0
      ),
      isPetsAllowed: hasPets(guests),
    }));
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

  function onSetGuests(newGuests) {
    stayActions.setGuests([...newGuests]);
  }

  function updateFilterBy() {
    stayActions.setFilterBy(filterByToEdit);
  }

  function handleMiniSearchBarClick(controlType) {
    setIsManuallyTriggered(true);
    isManuallyTriggeredRef.current = true;
    justTriggeredManually.current = true;

    setTimeout(() => {
      justTriggeredManually.current = false;
    }, 100);
    setActiveSearchControl(controlType);
  }
  // async function onLogout() {
  //   try {
  //     await logout();
  //     navigate("/");
  //     showSuccessMsg(`Bye now`);
  //   } catch (err) {
  //     showErrorMsg("Cannot logout");
  //   }
  // }

  return (
    <>
      <header className="app-header full">
        <div className="header-container">
          <section className="header-top">
            <div className="logo-container">
              <img className="logo" src="src/assets/img/logo.png" alt="logo" />
              <h3>kmobnb</h3>
            </div>
            {!isSearchBarVisible && (
              <div ref={miniSearchBarRef} className="mini-search-bar-container">
                <SearchBarMini onSelect={handleMiniSearchBarClick} />
              </div>
            )}
            <nav>
              <NavLink>Bnb your home</NavLink>
              <button className="user-info">
                <FontAwesomeIcon icon={faBars} />
                <img src="src/assets/img/guest-unknown.svg" alt="user-icon" />
              </button>
            </nav>
          </section>
          {isSearchBarVisible && (
            <div ref={searchBarRef}>
              <SearchBar
                activeSearchControl={activeSearchControl}
                setActiveSearchControl={setActiveSearchControl}
                destination={destination}
                setDestination={setDestination}
                datesRange={datesRange}
                onSetDatesRange={onSetDatesRange}
                guests={guests}
                guestsDisplay={guestsDisplay}
                onSetGuests={onSetGuests}
                updateFilterBy={updateFilterBy}
              />
            </div>
          )}
        </div>
      </header>
    </>
  );
}
