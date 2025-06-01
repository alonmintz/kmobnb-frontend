import { svgService } from "../../services/svg.service";
import { OverallRating } from "./OverallRating";

function CategoryRating({ category, avgRate }) {
  const categoryDisplayNameMap = {
    value: "Value",
    location: "Location",
    communications: "Communication",
    checkIn: "Check-in",
    accuracy: "Accuracy",
    cleanliness: "Cleanliness",
  };
  return (
    <div key={category} className="category-rating">
      <h4>
        <span>{categoryDisplayNameMap[category]}</span>
        <span>{avgRate}</span>
      </h4>
      {svgService.getGenericSvg(
        categoryDisplayNameMap[category],
        "category-icon"
      )}
    </div>
  );
}
export function RatingsDisplay({ categoryRatings, starsRatings }) {
  starsRatings = addPercentages(starsRatings);

  function addPercentages(stars) {
    const total = stars.reduce((sum, entry) => sum + entry.count, 0);

    return starsRatings.map((entry) => ({
      ...entry,
      percentage: total ? Math.round((entry.count / total) * 100) : 0,
    }));
  }

  return (
    <section className="ratings-display">
      {starsRatings && <OverallRating starsRatings={starsRatings} />}
      {categoryRatings &&
        Object.entries(categoryRatings).map(([category, avgRate]) => (
          <CategoryRating
            key={category}
            category={category}
            avgRate={avgRate}
          />
        ))}
    </section>
  );
}
