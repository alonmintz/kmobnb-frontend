import GoogleMapReact from "google-map-react";
import { useEffect, useState } from "react";
const { VITE_GOOGLE_MAPS_API_KEY } = import.meta.env;

function LocationPin({ lat, lng, stayId, hoveredStayId, onPinClick }) {
  const hoverClass = stayId === hoveredStayId ? "stay-hover" : "";
  return (
    <div
      className={`location-pin ${hoverClass}`}
      onClick={() => onPinClick(stayId)}
    >
      <div className="home-icon">
        <svg
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="presentation"
          focusable="false"
          style={{
            display: "block",
            height: "15px",
            width: "15px",
            fill: "currentcolor",
          }}
        >
          <path d="m8.94959955 1.13115419 5.71719515 4.68049298c.2120231.18970472.3332053.46073893.3332053.74524138v7.94311145c0 .2761424-.2238576.5-.5.5h-4.5v-5.5c0-.24545989-.17687516-.44960837-.41012437-.49194433l-.08987563-.00805567h-3c-.27614237 0-.5.22385763-.5.5v5.5h-4.5c-.27614237 0-.5-.2238576-.5-.5v-7.95162536c0-.28450241.12118221-.55553661.3502077-.75978249l5.70008742-4.65820288c.55265671-.45163993 1.34701168-.45132001 1.89930443.00076492z"></path>
        </svg>
      </div>
      {/* <div className="pin-point"></div> */}
    </div>
  );
}

export function StayMultiLocationMap({ stays, hoveredStayId, onPinClick }) {
  const locations = stays.map((stay) => stay.loc);
  //   const locations = [
  //     { lat: 41.38371, lng: 2.16685 }, // New York
  //     { lat: 40.68683, lng: -73.92922 }, // Los Angeles
  //     { lat: 41.03376, lng: 28.98648 }, // Chicago
  //   ];

  const center = locations[0]; // center map around first location
  const zoom = 4;
  //   const [coordinates, setCoordinates] = useState({ lat, lng });
  //   const zoom = 15;

  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: VITE_GOOGLE_MAPS_API_KEY }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {stays.map((stay, idx) => (
          <LocationPin
            key={idx}
            lat={stay.loc.lat}
            lng={stay.loc.lng}
            stayId={stay.stayId}
            hoveredStayId={hoveredStayId}
            onPinClick={onPinClick}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
}
