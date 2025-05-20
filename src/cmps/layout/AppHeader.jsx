import { Link, NavLink, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service";
import { userActions } from "../../store/actions/user.actions";
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
import { NavMenu } from "../stay/NavMenu";
import { useLocation } from "react-router-dom";
import { useMatch } from "react-router-dom";
import { HeaderStayIndex } from "./HeaderStayIndex";
import { HeaderStayDetails } from "./HeaderStayDetails";

export function AppHeader() {
  // const user = useSelector((storeState) => storeState.userModule.user)
  // const [searchParams, setSearchParams] = useSearchParams();
  // const [activeSearchControl, setActiveSearchControl] = useState("");
  // const city = useSelector((storeState) => storeState.stayModule.filterBy.city);
  // const [destination, setDestination] = useState(city || "");
  // const datesRange = useSelector((storeState) => storeState.stayModule.datesRange);
  // const guests = useSelector((storeState) => storeState.stayModule.guests);
  // const [guestsDisplay, setGuestsDisplay] = useState("");
  // const [isSearchBarVisible, setIsSearchBarVisible] = useState(true);
  // const [isAtTop, setIsAtTop] = useState(() => window.scrollY === 0);
  // const [isManuallyTriggered, setIsManuallyTriggered] = useState(false);
  // const [isNavMenuVisible, setIsNavMenuVisible] = useState(false);
  // const isManuallyTriggeredRef = useRef(false);
  // const justTriggeredManually = useRef(false);
  // const shouldShowSearchBar = isAtTop || isManuallyTriggered;
  // const searchBarRef = useRef();
  // const miniSearchBarRef = useRef();
  // const homesTitleRef = useRef();
  // // const navigate = useNavigate();

  // useEffect(() => {
  //   stayActions.setFilterBy(
  //     stayService.getFilterByFromSearchParams(searchParams)
  //   );
  //   stayActions.setGuests(stayService.getGuestsFromSearchParams(searchParams));
  //   stayActions.setDatesRange(
  //     stayService.getDatesRangeFromSearchParams(searchParams)
  //   );
  // }, [searchParams]);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const atTop = window.scrollY === 0;
  //     setIsAtTop(atTop);

  //     if (
  //       !atTop &&
  //       isManuallyTriggeredRef.current &&
  //       !justTriggeredManually.current
  //     ) {
  //       setIsManuallyTriggered(false);
  //       isManuallyTriggeredRef.current = false;
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   handleScroll(); // initialize
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  // useEffect(() => {
  //   if (isAtTop) {
  //     setIsManuallyTriggered(false); // clear manual override when back at top
  //   }
  // }, [isAtTop]);

  // useEffect(() => {
  //   if (shouldShowSearchBar) {
  //     animateSearchBarEntrance();
  //   } else {
  //     animateSearchBarLeave();
  //   }
  //   async function animateSearchBarEntrance() {
  //     await setIsSearchBarVisible(true);
  //     animateCSS(searchBarRef.current, "fadeInDown");
  //     animateCSS(homesTitleRef.current, "fadeInDown");
  //   }

  //   async function animateSearchBarLeave() {
  //     setIsSearchBarVisible(false);
  //   }
  // }, [shouldShowSearchBar]);

  // useEffect(() => {
  //   if (!isSearchBarVisible) {
  //     animateCSS(miniSearchBarRef.current, "fadeInUp");
  //   }
  // }, [isSearchBarVisible]);

  // useEffect(() => {
  //   setDestination(city);
  // }, [city]);

  // useEffect(() => {
  //   setGuestsDisplay(renderGuestsDisplay());
  // }, [guests]);

  // function onSetDatesRange(datesRange) {
  //   stayActions.setDatesRange(datesRange);
  // }

  // function renderGuestsDisplay() {
  //   const guestsDisplayArray = [];
  //   let guestCount = 0;
  //   guests.forEach(({ type, count }) => {
  //     switch (type) {
  //       case "adults":
  //         guestCount += count;
  //         break;
  //       case "children":
  //         guestCount += count;
  //         break;
  //       case "infants":
  //         {
  //           if (count > 0) {
  //             guestsDisplayArray.push(`${count} infant${count > 1 ? "s" : ""}`);
  //           }
  //         }
  //         break;
  //       case "pets":
  //         {
  //           if (count > 0) {
  //             guestsDisplayArray.push(`${count} pet${count > 1 ? "s" : ""}`);
  //           }
  //         }
  //         break;
  //       default:
  //         break;
  //     }
  //   });

  //   if (guestCount > 0)
  //     guestsDisplayArray.unshift(
  //       `${guestCount} guest${guestCount > 1 ? "s" : ""}`
  //     );

  //   return !guestsDisplayArray.length
  //     ? "Add guests"
  //     : guestsDisplayArray.join(", ");
  // }

  // function onSetGuests(newGuests) {
  //   stayActions.setGuests([...newGuests]);
  // }

  // async function updateFilterBy() {
  //   let endDate = datesRange[1];

  //   if (datesRange[0] && !datesRange[1]) {
  //     endDate = addDays(datesRange[0], 1);
  //     await stayActions.setDatesRange([datesRange[0], endDate]);
  //   }

  //   const capacity = guests.reduce((acc, guest) => acc + guest.count, 0);

  //   const newFilterBy = {
  //     city: destination,
  //     startDate: datesRange[0],
  //     endDate,
  //     capacity,
  //   };

  //   const isPetsAllowed = guests.some(
  //     (guest) => guest.type === "pets" && guest.count > 0
  //   );

  //   if (isPetsAllowed) {
  //     newFilterBy.isPetsAllowed = isPetsAllowed;
  //   }

  //   guests.forEach((guestObj) => {
  //     newFilterBy[guestObj.type] = guestObj.count;
  //   });

  //   const type = searchParams.get("type");
  //   if (type) {
  //     newFilterBy.type = type;
  //   }

  //   setSearchParams({ ...getExistingProperties(newFilterBy) });
  // }

  // function handleMiniSearchBarClick(controlType) {
  //   setIsManuallyTriggered(true);
  //   isManuallyTriggeredRef.current = true;
  //   justTriggeredManually.current = true;

  //   setTimeout(() => {
  //     justTriggeredManually.current = false;
  //   }, 100);
  //   setActiveSearchControl(controlType);
  // }
  // // async function onLogout() {
  // //   try {
  // //     await logout();
  // //     navigate("/");
  // //     showSuccessMsg(`Bye now`);
  // //   } catch (err) {
  // //     showErrorMsg("Cannot logout");
  // //   }
  // // }

  // function handleUserIconClick() {
  //   if (isNavMenuVisible) {
  //     setIsNavMenuVisible(false)
  //   }
  //   else {
  //     setIsNavMenuVisible(true)
  //   }
  // }
  const location = useLocation();
  const pathname = location.pathname;
  const isStayDetailsPage = useMatch("stay/:stayId");
  const isOrderPage = useMatch("order/:stayId");
  const [pageClass, setPageClass] = useState(getPageClass());
  const [isAnchorNavHeaderVisible, setIsAnchorNavHeaderVisible] =
    useState(false);

  useEffect(() => {
    setPageClass(getPageClass());
  }, [location]);

  function getPageClass() {
    if (pathname === "/") return "stay-index-header";
    if (isStayDetailsPage) return "stay-details-header";
    if (isOrderPage) return "order-page-header";
  }

  function headerRenderSwitch() {
    if (pathname === "/") return <HeaderStayIndex />;
    if (isStayDetailsPage)
      return <HeaderStayDetails showAnchor={isAnchorNavHeaderVisible} />;
    if (isOrderPage) return null;
  }

  return (
    <>
      <header className={`app-header ${pageClass} full`}>
        <div className="header-container">{headerRenderSwitch()}</div>
      </header>
    </>
  );
}
