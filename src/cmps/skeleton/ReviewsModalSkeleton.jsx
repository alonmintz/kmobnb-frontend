export function ReviewsModalSkeleton() {
  return (
    <section className="reviews-modal skeleton">
      <div className="ratings-container">
        <div className="title skeleton-bar" style={{ width: "60%" }} />
        <div className="ratings-display">
          <div className="overall-rating">
            <div
              className="skeleton-bar"
              style={{ width: "40%", height: "1.5em" }}
            />
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="skeleton-bar"
                style={{
                  width: `${70 - i * 10}%`,
                  height: "0.8em",
                  margin: "0.4em 0",
                }}
              />
            ))}
          </div>
          {[...Array(6)].map((_, idx) => (
            <div className="category-rating" key={idx}>
              <div className="category-icon skeleton-circle" />
              <h4 className="skeleton-bar" style={{ width: "60%" }} />
              <div
                className="skeleton-bar"
                style={{ width: "15%", marginLeft: "auto" }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="reviews-container">
        <div className="title skeleton-bar" style={{ width: "30%" }} />
        {[...Array(4)].map((_, idx) => (
          <div
            className="review-display"
            key={idx}
            style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}
          >
            <div
              className="skeleton-circle"
              style={{ width: 48, height: 48 }}
            />
            <div style={{ flex: 1 }}>
              <div
                className="skeleton-bar"
                style={{ width: "30%", height: "1em" }}
              />
              <div
                className="skeleton-bar"
                style={{ width: "20%", height: "0.8em" }}
              />
              <div
                className="skeleton-bar"
                style={{ width: "15%", height: "0.8em" }}
              />
              <div
                className="skeleton-bar"
                style={{ width: "80%", height: "1em", marginTop: "0.5em" }}
              />
              <div
                className="skeleton-bar"
                style={{ width: "60%", height: "1em" }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
