export function OrderPageSkeleton() {
  return (
    <section className="order-page">
      <div className="order-container">
        <div className="skeleton skeleton-title" />
        <div className="payment-details-container">
          <div className="payment-container">
            <div className="skeleton skeleton-payment" />
            <div className="skeleton skeleton-btn" />
          </div>
          <div className="details-container">
            <div className="skeleton skeleton-mini-stay" />
            <div className="skeleton skeleton-price-details" />
          </div>
        </div>
      </div>
    </section>
  );
}
