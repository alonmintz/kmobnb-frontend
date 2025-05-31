import { useEffect, useRef, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useSearchParams } from "react-router-dom";
import filterIcon from "../../assets/img/filter-icon.svg";
import { imgService } from "../../services/img.service";
const typeList = [
  "OMG!",
  "Beachfront",
  "Amazing views",
  "Trending",
  "Design",
  "Luxe",
  "Countryside",
  "Top cities",
  "Off the grid",
  "Historical homes",
  "Desert",
  "Cabins",
  "Surfing",
  "New",
  "National parks",
  "Rooms",
  "Amazing pools",
  "Campers",
  "Top of the world",
  "Skiing",
  "Tropical",
  "Creative spaces",
  "Castles",
];

export function StayFilter() {
  const FIRST_SLIDE = "FIRST_SLIDE";
  const LAST_SLIDE = "LAST_SLIDE";
  const FIRST_SLIDE_INDEX = 0;
  const LAST_SLIDE_INDEX = typeList.length - 1;
  const [searchParams, setSearchParams] = useSearchParams();
  const [carouselSlide, setCarouselSlide] = useState(FIRST_SLIDE);
  const carouselRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [itemsToShow, setItemsToShow] = useState();
  const [itemsToSlide, setItemsToSlide] = useState(1);
  const responsiveConfig = {
    largeDesktop: {
      breakpoint: { max: 3000, min: 1600 },
      items: 13,
      partialVisibilityGutter: 40,
    },
    desktop: {
      breakpoint: { max: 1600, min: 1300 },
      items: 11,
      partialVisibilityGutter: 40,
    },
    smallDesktop: {
      breakpoint: { max: 1300, min: 1024 },
      items: 9,
      partialVisibilityGutter: 30,
    },
    tablet: {
      breakpoint: { max: 1024, min: 900 },
      items: 7,
      partialVisibilityGutter: 30,
    },
    smallTablet: {
      breakpoint: { max: 900, min: 750 },
      items: 5,
      partialVisibilityGutter: 30,
    },
    mobile: {
      breakpoint: { max: 750, min: 0 },
      items: 3,
      partialVisibilityGutter: 30,
    },
  };

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const updateItemsToShow = () => {
      const width = window.innerWidth;

      for (const key in responsiveConfig) {
        const { min, max } = responsiveConfig[key].breakpoint;
        if (width <= max && width >= min) {
          setItemsToShow(responsiveConfig[key].items);
          break;
        }
      }
    };

    updateItemsToShow(); // Initial call
    window.addEventListener("resize", updateItemsToShow);
    return () => window.removeEventListener("resize", updateItemsToShow);
  }, []);

  useEffect(() => {
    setItemsToSlide(itemsToShow > 2 ? itemsToShow - 2 : 1);
  }, [itemsToShow]);

  function onClickType(type) {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("type", type);
      return newParams;
    });
  }

  const handleAfterChange = (previousSlide, { currentSlide }) => {
    const lastVisibleIndex = currentSlide + itemsToShow;

    if (currentSlide === FIRST_SLIDE_INDEX) {
      setCarouselSlide(FIRST_SLIDE);
    } else if (lastVisibleIndex >= LAST_SLIDE_INDEX) {
      setCarouselSlide(LAST_SLIDE);
    } else {
      setCarouselSlide("");
    }
  };

  const selectedType = searchParams.get("type");
  return (
    <div className={`stay-filter ${isScrolled ? "scrolled" : ""}  full`}>
      <div className="filters-container">
        <div
          className={`arrow-container left ${
            carouselSlide === FIRST_SLIDE ? "hidden" : ""
          }`}
        >
          <button
            className="arrow-button carousel-prev"
            onClick={() => carouselRef.current.previous()}
          >
            <svg className="arrow__icon" viewBox="0 0 24 24" role="img">
              <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"></path>
            </svg>
          </button>
        </div>

        <Carousel
          afterChange={handleAfterChange}
          ref={carouselRef}
          additionalTransfrom={0}
          arrows={false}
          autoPlaySpeed={3000}
          centerMode={false}
          className=""
          containerClass="carousel-container"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite={false}
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={responsiveConfig}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots={false}
          sliderClass=""
          slidesToSlide={itemsToSlide}
          swipeable
        >
          {typeList.map((type) => (
            <button
              key={type}
              className={`stay-type-button ${
                type === selectedType ? "selected" : ""
              }`}
              disabled={type === selectedType}
              onClick={() => onClickType(type)}
            >
              <img
                className="type-img"
                src={imgService.getImage(type)}
                alt={`${type}-icon`}
              />
              <p className="type-name">{type}</p>
            </button>
          ))}
        </Carousel>

        <div
          className={`arrow-container right ${
            carouselSlide === LAST_SLIDE ? "hidden" : ""
          }`}
        >
          <button
            className="arrow-button carousel-next"
            onClick={() => carouselRef.current.next()}
          >
            <svg className="arrow__icon" viewBox="0 0 24 24" role="img">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path>
            </svg>
          </button>
        </div>

        <button className="filters-button">
          <img src={filterIcon} className="filters-icon" />
          Filters
        </button>
      </div>
    </div>
  );
}
