import { SearchPickerWrapper } from "./SearchPickerWrapper";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function SearchDatePicker({ type, dates, onSelect }) {
  console.log(dates);

  return (
    <SearchPickerWrapper type={type}>
      <section className="search-date-picker">
        <DatePicker
          selected={dates[0]}
          onChange={(dates) => onSelect({ type, dates })}
          minDate={new Date()}
          startDate={dates[0]}
          endDate={dates[1]}
          monthsShown={2}
          selectsRange
          inline
          showDisabledMonthNavigation
          renderDayContents={(day, date) => (
            <div className="day-wrapper">
              <span className="number">{day}</span>
              <div className="day-hover-circle"></div>
            </div>
          )}
        />
      </section>
    </SearchPickerWrapper>
  );
}
