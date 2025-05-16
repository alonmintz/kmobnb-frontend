import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function StayDatePicker({ dates = [], blockedRanges = [], onSelect }) {
  function normalizeDate(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  function getExcludeIntervals() {
    return blockedRanges.map(([start, end]) => ({
      start: normalizeDate(start),
      end: normalizeDate(end),
    }));
  }

  return (
    <section className="stay-date-picker">
      <DatePicker
        selected={dates[0]}
        onChange={(dates) => onSelect({ dates })}
        minDate={new Date()}
        startDate={dates[0]}
        endDate={dates[1]}
        monthsShown={2}
        selectsRange
        inline
        showDisabledMonthNavigation
        excludeDateIntervals={getExcludeIntervals()}
        renderDayContents={(day, date) => {
          const normalizedDate = normalizeDate(date);

          const isInBlockedRange = blockedRanges.some(([start, end]) => {
            const normStart = normalizeDate(start);
            const normEnd = normalizeDate(end);
            return normalizedDate >= normStart && normalizedDate <= normEnd;
          });
          return (
            <div className="day-wrapper">
              <span
                className={`number ${isInBlockedRange ? "line-through" : ""}`}
              >
                {day}
              </span>
              <div className="day-hover-circle"></div>
            </div>
          );
        }}
      />
    </section>
  );
}
