import { SearchPickerWrapper } from "./SearchPickerWrapper";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export function SearchDatePicker({ type, onSelect, ranges }) {
  //TODO: complete datePicker styling
  return (
    <SearchPickerWrapper type={type}>
      <section className="search-date-picker">
        <DateRange
          editableDateInputs={true}
          onChange={(item) => onSelect({ type, item })}
          showSelectionPreview={true}
          showPreview={true}
          moveRangeOnFirstSelection={false}
          months={2}
          ranges={ranges}
          direction="horizontal"
          showDateDisplay={false}
          minDate={new Date()}
        />
      </section>
    </SearchPickerWrapper>
  );
}
