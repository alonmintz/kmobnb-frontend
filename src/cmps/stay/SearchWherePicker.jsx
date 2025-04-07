import { useEffect } from "react";
import { SearchPickerWrapper } from "./SearchPickerWrapper";

//TODO: move options array and filtering to service?
const OPTIONS = [
  {
    city: "Maui",
    country: "United States",
    phrase: "Tropical paradise with beaches and volcanoes",
    imgUrl: "src/assets/img/city-icons/maui-icon.png",
  },
  {
    city: "Montreal",
    country: "Canada",
    phrase: "French-Canadian charm and vibrant culture",
    imgUrl: "src/assets/img/city-icons/montreal-icon.png",
  },
  {
    city: "Porto",
    country: "Portugal",
    phrase: "Historic riverside city with wine and charm",
    imgUrl: "src/assets/img/city-icons/porto-icon.png",
  },
  {
    city: "New York",
    country: "United States",
    phrase: "The city that never sleeps",
    imgUrl: "src/assets/img/city-icons/new-york-icon.png",
  },
  {
    city: "Barcelona",
    country: "Spain",
    phrase: "Beachside beauty with Gaudí’s magic",
    imgUrl: "src/assets/img/city-icons/barcelona-icon.png",
  },
];

export function SearchWherePicker({ type, onSelect, searchInputValue }) {
  function handleSelect({ city }) {
    onSelect({ type, city });
  }

  return (
    <SearchPickerWrapper type={type}>
      <section className="search-where-picker">
        <span className="title">Suggested destinations</span>
        {OPTIONS.filter((option) => {
          if (!searchInputValue) return true;
          return (
            option.city
              .toLowerCase()
              .includes(searchInputValue.toLowerCase()) ||
            option.country
              .toLowerCase()
              .includes(searchInputValue.toLowerCase())
          );
        }).map((option) => (
          <CityOption
            key={option.city}
            option={option}
            onClick={() => handleSelect(option)}
          />
        ))}
      </section>
    </SearchPickerWrapper>
  );
}

function CityOption({ option, onClick }) {
  const { city, country, phrase, imgUrl } = option;

  return (
    <div className="city-option" onClick={onClick}>
      <img src={imgUrl} alt={`${city}-icon`} />
      <div className="option-details">
        <span className="city-country">{`${city}, ${country}`}</span>
        <span className="phrase">{`${phrase}`}</span>
      </div>
    </div>
  );
}
