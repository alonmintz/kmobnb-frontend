import { useEffect, useRef, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
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

const FIRST_SLIDE = "FIRST_SLIDE";
const LAST_SLIDE = "LAST_SLIDE";
const FIRST_SLIDE_INDEX = 0;
const LAST_SLIDE_INDEX = typeList.length - 1;

export function TypeCarousel({ onSelect, selectedType }) {
  const [carouselSlide, setCarouselSlide] = useState(FIRST_SLIDE);
  const carouselRef = useRef(null);
  const [itemsToShow, setItemsToShow] = useState();
  const [itemsToSlide, setItemsToSlide] = useState(1);
  const responsiveConfig = {
    largeDesktop: {
      breakpoint: { max: 3000, min: 1600 },
      items: 10,
      partialVisibilityGutter: 40,
    },
    desktop: {
      breakpoint: { max: 1600, min: 1300 },
      items: 8,
      partialVisibilityGutter: 40,
    },
    smallDesktop: {
      breakpoint: { max: 1300, min: 1024 },
      items: 6,
      partialVisibilityGutter: 30,
    },
    tablet: {
      breakpoint: { max: 1024, min: 900 },
      items: 4,
      partialVisibilityGutter: 30,
    },
    smallTablet: {
      breakpoint: { max: 900, min: 750 },
      items: 2,
      partialVisibilityGutter: 30,
    },
    mobile: {
      breakpoint: { max: 750, min: 0 },
      items: 1,
      partialVisibilityGutter: 30,
    },
  };
  const [displayTypeList, setDisplayTypeList] = useState([...typeList]);

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

    updateItemsToShow();
    window.addEventListener("resize", updateItemsToShow);
    return () => window.removeEventListener("resize", updateItemsToShow);
  }, []);

  useEffect(() => {
    setItemsToSlide(itemsToShow > 2 ? itemsToShow - 2 : 1);
  }, [itemsToShow]);

  useEffect(() => {
    if (selectedType) {
      setDisplayTypeList((prevList) => {
        const filteredList = prevList.filter((type) => type !== selectedType);
        return [selectedType, ...filteredList];
      });
    }
  }, []);

  function onClickType(type) {
    onSelect(type);
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

  return (
    <div className="type-carousel">
      <div className="type-carousel-container">
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
          {displayTypeList.map((type) => (
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
                src={imgService.getTypeImage(type)}
                alt={`${type}-icon`}
              />
              <span className="type-name">{type}</span>
              <span className="type-underline"></span>
            </button>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
