export function StayListSkeleton({ count = 20 }) {
  return (
    <ul className="stay-list skeleton">
      {Array.from({ length: count }).map((_, idx) => (
        <li className="stay-preview-skeleton" key={idx}>
          <div className="img-skeleton skeleton-animate"></div>
          <div className="text-skeleton skeleton-animate"></div>
          <div className="text-skeleton skeleton-animate short"></div>
        </li>
      ))}
    </ul>
  );
}
