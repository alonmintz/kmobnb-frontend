import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useSelector } from "react-redux";
import { stayActions } from "../../store/actions/stay.actions";

export function StayFilter() {
  const IMG_URL_PATH = "../../src/assets/img/stay/type/";
  const typeList = ["OMG!", "Beachfront", "Amazing Views"]; //  list of stay types

  const filterBy = useSelector((storeState) => storeState.stayModule.filterBy);

  const [searchParams, setSearchParams] = useSearchParams();

  //    setting stay type filter on load only, according to search params
  useEffect(() => {
    const typeFromParams = searchParams.get("type");
    if (typeFromParams !== null && typeFromParams != "") {
      selectType(typeFromParams);
    }
  }, []);

  function onClickType(type) {
    setSearchParams({ type });
    selectType(type);
  }

  function selectType(type) {
    setFilterBy({ ...filterBy, type });
  }

  const { type: selectedType } = filterBy; //  extracting the currently selected stay type from filterBy
  return (
    <section className="stay-filter">
      <div>
        <Carousel
          arrows
          className="stay-filter-carousel"
          itemClass=""
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024,
              },
              items: 15,
              partialVisibilityGutter: 40,
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0,
              },
              items: 3,
              partialVisibilityGutter: 30,
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464,
              },
              items: 7,
              partialVisibilityGutter: 30,
            },
          }}
        >
          {typeList.map((type) => (
            <button
              key={type}
              className={
                type === selectedType
                  ? "stay-type-button selected"
                  : "stay-type-button"
              }
              onClick={() => onClickType(type)}
            >
              <img src={`${IMG_URL_PATH}${type}.jpg`} alt="" />
              <p>{type}</p>
            </button>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
