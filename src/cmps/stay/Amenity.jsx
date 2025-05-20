import { svgService } from "../../services/svg.service";

export function Amenity({ amenityName }) {
  return (
    <div className="amenity">
      {svgService.getAmenitySvg(amenityName)}
      <h3>{amenityName}</h3>
    </div>
  );
}
