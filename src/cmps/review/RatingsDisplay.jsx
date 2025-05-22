import { svgService } from "../../services/svg.service";
import { OverallRating } from "./OverallRating";

const tempRatings = {
  starsRatings: [
    {
      rate: 1,
      count: 2,
    },
    {
      rate: 2,
      count: 4,
    },
    {
      rate: 3,
      count: 6,
    },
    {
      rate: 4,
      count: 8,
    },
    {
      rate: 5,
      count: 10,
    },
  ],
  categoryRatings: [
    {
      category: "Cleanliness",
      avgRate: 4.9,
    },
    {
      category: "Accuracy",
      avgRate: 3.8,
    },
    {
      category: "Check-in",
      avgRate: 4.7,
    },
    {
      category: "Communication",
      avgRate: 4.3,
    },
    {
      category: "Location",
      avgRate: 4.4,
    },
    {
      category: "Value",
      avgRate: 4.9,
    },
  ],
};
//todo: ratings will come from DB
export function RatingsDisplay({ ratings }) {
  let { starsRatings, categoryRatings } = tempRatings;
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
      <OverallRating starsRatings={starsRatings} />
      {categoryRatings.map((rating) => (
        <div key={rating.category} className="category-rating">
          <h4>
            <span>{rating.category}</span>
            <span>{rating.avgRate}</span>
          </h4>
          {svgService.getGenericSvg(rating.category, "category-icon")}
        </div>
      ))}
    </section>
  );
}
