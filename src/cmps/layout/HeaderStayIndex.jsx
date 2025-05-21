import { NavLink, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { SearchBar } from "../stay/SearchBar";
import { useEffect, useRef, useState } from "react";
import { stayActions } from "../../store/actions/stay.actions";
import { animateCSS, getExistingProperties } from "../../services/util.service";
import { SearchBarMini } from "../stay/SearchBarMini";
import logo from "../../assets/img/logo.png";
import guestUnknown from "../../assets/img/guest-unknown.svg";
import { stayService } from "../../services/stay";
import { addDays } from "date-fns";
import { NavMenu } from "../layout/NavMenu";

export function HeaderStayIndex({ viewport }) {
  const user = useSelector((storeState) => storeState.userModule.user);
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeSearchControl, setActiveSearchControl] = useState("");
  const city = useSelector((storeState) => storeState.stayModule.filterBy.city);
  const [destination, setDestination] = useState(city || "");
  const datesRange = useSelector(
    (storeState) => storeState.stayModule.datesRange
  );
  const guests = useSelector((storeState) => storeState.stayModule.guests);
  const [guestsDisplay, setGuestsDisplay] = useState("");
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(() => window.scrollY === 0);
  const [isManuallyTriggered, setIsManuallyTriggered] = useState(false);
  const [isNavMenuVisible, setIsNavMenuVisible] = useState(false);
  const isManuallyTriggeredRef = useRef(false);
  const justTriggeredManually = useRef(false);
  const shouldShowSearchBar = isAtTop || isManuallyTriggered;
  const searchBarRef = useRef();
  const miniSearchBarRef = useRef();
  const homesTitleRef = useRef();
  const userIconRef = useRef();

  useEffect(() => {
    stayActions.setFilterBy(
      stayService.getFilterByFromSearchParams(searchParams)
    );
    stayActions.setGuests(stayService.getGuestsFromSearchParams(searchParams));
    stayActions.setDatesRange(
      stayService.getDatesRangeFromSearchParams(searchParams)
    );
  }, [searchParams]);

  useEffect(() => {
    const handleScroll = () => {
      const atTop = window.scrollY === 0;
      setIsAtTop(atTop);

      if (
        !atTop &&
        isManuallyTriggeredRef.current &&
        !justTriggeredManually.current
      ) {
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
      animateCSS(homesTitleRef.current, "fadeInDown");
    }

    async function animateSearchBarLeave() {
      setIsSearchBarVisible(false);
    }
  }, [shouldShowSearchBar]);

  useEffect(() => {
    if (!isSearchBarVisible) {
      animateCSS(miniSearchBarRef.current, "fadeInUp");
    }
  }, [isSearchBarVisible]);

  useEffect(() => {
    setDestination(city);
  }, [city]);

  useEffect(() => {
    setGuestsDisplay(renderGuestsDisplay());
  }, [guests]);

  function onSetDatesRange(datesRange) {
    stayActions.setDatesRange(datesRange);
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

  async function updateFilterBy() {
    let endDate = datesRange[1];

    if (datesRange[0] && !datesRange[1]) {
      endDate = addDays(datesRange[0], 1);
      await stayActions.setDatesRange([datesRange[0], endDate]);
    }

    const capacity = guests.reduce((acc, guest) => acc + guest.count, 0);

    const newFilterBy = {
      city: destination,
      startDate: datesRange[0],
      endDate,
      capacity,
    };

    const isPetsAllowed = guests.some(
      (guest) => guest.type === "pets" && guest.count > 0
    );

    if (isPetsAllowed) {
      newFilterBy.isPetsAllowed = isPetsAllowed;
    }

    guests.forEach((guestObj) => {
      newFilterBy[guestObj.type] = guestObj.count;
    });

    const type = searchParams.get("type");
    if (type) {
      newFilterBy.type = type;
    }

    setSearchParams({ ...getExistingProperties(newFilterBy) });
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

  function handleUserIconClick() {
    if (isNavMenuVisible) {
      setIsNavMenuVisible(false);
    } else {
      setIsNavMenuVisible(true);
    }
  }

  return (
    <>
      <section className="header-top">
        <NavLink className={"logo-link"} to={""}>
          <div className="logo-container">
            <img className="logo" src={logo} alt="logo" />
            {viewport === "desktop" && <h3>kmobnb</h3>}
          </div>
        </NavLink>
        {isSearchBarVisible ? (
          <div ref={homesTitleRef} className="homes-title-container">
            <h2>Homes</h2>
          </div>
        ) : (
          <div ref={miniSearchBarRef} className="mini-search-bar-container">
            <SearchBarMini onSelect={handleMiniSearchBarClick} />
          </div>
        )}
        <nav>
          {/*this bnb your home is temporerally disabled*/}
          <NavLink
            to="#"
            className="disabled"
            onClick={(ev) => {
              ev.preventDefault();
            }}
          >
            Bnb your home
          </NavLink>
          <button
            className="user-info"
            onClick={handleUserIconClick}
            ref={userIconRef}
          >
            <FontAwesomeIcon icon={faBars} />
            <img src={user?.imgUrl ?? guestUnknown} alt="user-icon" />
          </button>
          {isNavMenuVisible ? (
            <NavMenu
              onClose={() => setIsNavMenuVisible(false)}
              triggeringButtonRef={userIconRef}
            />
          ) : (
            ""
          )}
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
    </>
  );
}
