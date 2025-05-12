import { useRef, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useSearchParams } from "react-router-dom";

export function StayFilter() {
  const FIRST_SLIDE = "FIRST_SLIDE";
  const LAST_SLIDE = "LAST_SLIDE";
  const FIRST_SLIDE_INDEX = 0; //  TODO: calculate first slide index dynamically
  const LAST_SLIDE_INDEX = 10; //  TODO: calculate last slide index dynamically

  const typeList = [
    "OMG!",
    "Beachfront",
    "Amazing Views",
    "Trending",
    "Design",
    "Luxe",
    "Countryside",
    "Top cities",
    "Off-the-grid",
    "Historical homes",
    "Desert",
    "Cabins",
    "Surfing",
    "New",
    "National parks",
    "Rooms",
    "Amazing pools",
    "Camping",
    "Top of the world",
    "Skiing",
    "Tropical",
    "Creative spaces",
    "Castles",
  ]; //  list of stay types
  const IMG_URL_PATH = "../../src/assets/img/stay/type/";
  const [searchParams, setSearchParams] = useSearchParams();
  const [carouselSlide, setCarouselSlide] = useState(FIRST_SLIDE);
  const carouselRef = useRef(null);

  function onClickType(type) {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("type", type);
      return newParams;
    });
  }

  const handleAfterChange = (previousSlide, { currentSlide }) => {
    // console.log("prev slide: ", previousSlide);
    console.log("curr slide: ", currentSlide);

    if (currentSlide === FIRST_SLIDE_INDEX) {
      setCarouselSlide(FIRST_SLIDE)
    }
    else if (currentSlide >= LAST_SLIDE_INDEX) {
      setCarouselSlide(LAST_SLIDE)
    }
    else {
      setCarouselSlide("")
    }
  }

  const selectedType = searchParams.get("type");
  return (
    <div className="stay-filter">
      <div className="carousel-container">
        <div
          className={`arrow-container left ${carouselSlide === FIRST_SLIDE ? "hidden" : ""
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
          arrows={false}
          afterChange={handleAfterChange}
          ref={carouselRef}
          className="stay-type-button"
          itemClass="carousel-item"
          containerClass="stay-filter-carousel"
          infinite={false}
          draggable={false}
          swipeable
          centerMode={false}
          slidesToSlide={8}
          rewind={false}
          rewindWithAnimation={false}
          responsive={{
            largeDesktop: {
              breakpoint: { max: 3000, min: 1600 },
              items: 13,
              partialVisibilityGutter: 40,
            },
            desktop: {
              breakpoint: { max: 1600, min: 1200 },
              items: 11,
              partialVisibilityGutter: 40,
            },
            smallDesktop: {
              breakpoint: { max: 1200, min: 1024 },
              items: 9,
              partialVisibilityGutter: 30,
            },
            tablet: {
              breakpoint: { max: 1024, min: 600 },
              items: 7,
              partialVisibilityGutter: 30,
            },
            mobile: {
              breakpoint: { max: 600, min: 0 },
              items: 3,
              partialVisibilityGutter: 30,
            },
          }}
        >
          {typeList.map((type) => (
            <button
              key={type}
              className={`stay-type-button ${type === selectedType ? "selected" : ""
                }`}
              disabled={type === selectedType}
              onClick={() => onClickType(type)}
            >
              <img src={`${IMG_URL_PATH}${type}.jpg`} alt="" />
              <p>{type}</p>
            </button>
          ))}
        </Carousel>

        <div
          className={`arrow-container right ${carouselSlide === LAST_SLIDE ? "hidden" : ""
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
      </div>
      <button className="filters-button">🎚️ Filters</button>
    </div>
  );
}
