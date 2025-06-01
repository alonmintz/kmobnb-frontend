export function OverallRating({ starsRatings }) {
  return (
    <div className="overall-rating">
      <h4>Overall rating</h4>
      {starsRatings
        .slice()
        .sort((a, b) => b.rate - a.rate)
        .map(({ rate, percentage }) => (
          <div className="rating-row" key={rate}>
            <span className="rate-label">{rate}</span>
            <div className="bar-container">
              <div
                className="bar-fill"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
    </div>
  );
}
