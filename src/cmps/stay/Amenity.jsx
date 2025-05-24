import { svgService } from "../../services/svg.service";

export function Amenity({ amenityName, displayType = "" }) {
  return (
    <div className={`amenity ${displayType}`}>
      {svgService.getAmenitySvg(amenityName)}
      <h3>{amenityName}</h3>
    </div>
  );
}
