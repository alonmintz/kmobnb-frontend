import { SearchPickerWrapper } from "./SearchPickerWrapper";
import { CITY_OPTIONS } from "../../services/stay/stay.service.local";

export function SearchWherePicker({ type, onSelect, searchInputValue }) {
  function handleSelect({ city }) {
    onSelect({ type, city });
  }

  return (
    <SearchPickerWrapper type={type}>
      <section className="search-where-picker">
        <span className="title">Suggested destinations</span>
        {CITY_OPTIONS.filter((option) => {
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
