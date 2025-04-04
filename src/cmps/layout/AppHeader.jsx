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

export function AppHeader() {
  // const user = useSelector((storeState) => storeState.userModule.user);
  const filterBy = useSelector((storeState) => storeState.stayModule.filterBy);
  const [filterByToEdit, setFilterByToEdit] = useState({});
  const [destination, setDestination] = useState("");
  //TODO: move date ranges and guests to store
  const [datesRange, setDatesRange] = useState([]);
  const guests = useSelector((storeState) => storeState.stayModule.guests);
  const [guestsDisplay, setGuestsDisplay] = useState("");

  const topDiv = useRef();
  // const navigate = useNavigate();
  const [isSearchBarShow, setIsSearchBarShow] = useState(true);

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

  //TODO: convert to scroll listener
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setIsSearchBarShow(true);
      } else {
        setIsSearchBarShow(false);
      }
    });

    observer.observe(topDiv.current);
    return () => observer.disconnect();
  }, []);

  function updateDestinationFilter() {
    setFilterByToEdit((prevFilterByToEdit) => ({
      ...prevFilterByToEdit,
      city: destination,
    }));
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
      <div ref={topDiv} className="top-div"></div>
      <header className="app-header full">
        <section className="header-top flex">
          <div className="logo-container">
            <img className="logo" src="src/assets/img/logo.png" alt="logo" />
            <h3>kmobnb</h3>
          </div>
          <nav>
            <NavLink>Bnb your home</NavLink>
            <button className="user-info">
              <FontAwesomeIcon icon={faBars} />
              <img src="src/assets/img/guest-unknown.svg" alt="user-icon" />
            </button>
          </nav>
        </section>
        {true && (
          <SearchBar
            destination={destination}
            setDestination={setDestination}
            datesRange={datesRange}
            setDatesRange={setDatesRange}
            guests={guests}
            guestsDisplay={guestsDisplay}
            onSetGuests={onSetGuests}
            updateFilterBy={updateFilterBy}
          />
        )}
      </header>
    </>
  );
}
