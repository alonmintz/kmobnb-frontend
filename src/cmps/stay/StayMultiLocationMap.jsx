import GoogleMapReact from "google-map-react";
import { useEffect, useState } from "react";
const { VITE_GOOGLE_MAPS_API_KEY } = import.meta.env;

export function StayMultiLocationMap({ stays, hoveredStayId, onPinClick }) {
  const locations = stays.map((stay) => stay.loc);
  const { center, zoom } = getMapCenterAndZoom(stays);

  function getMapCenterAndZoom(stays) {
    if (!stays.length) return { center: { lat: 0, lng: 0 }, zoom: 2 };

    // Calculate bounds
    let minLat = stays[0].loc.lat,
      maxLat = stays[0].loc.lat;
    let minLng = stays[0].loc.lng,
      maxLng = stays[0].loc.lng;

    stays.forEach((stay) => {
      minLat = Math.min(minLat, stay.loc.lat);
      maxLat = Math.max(maxLat, stay.loc.lat);
      minLng = Math.min(minLng, stay.loc.lng);
      maxLng = Math.max(maxLng, stay.loc.lng);
    });

    // Center is the midpoint
    const center = {
      lat: (minLat + maxLat) / 2,
      lng: (minLng + maxLng) / 2,
    };

    // Heuristic for zoom: the greater the span, the lower the zoom
    const latDiff = maxLat - minLat;
    const lngDiff = maxLng - minLng;
    const maxDiff = Math.max(latDiff, lngDiff);

    // These values can be tweaked for your needs
    let zoom;
    if (maxDiff < 0.05) zoom = 14;
    else if (maxDiff < 0.2) zoom = 12;
    else if (maxDiff < 1) zoom = 10;
    else if (maxDiff < 5) zoom = 8;
    else if (maxDiff < 15) zoom = 6;
    else zoom = 4;

    return { center, zoom };
  }
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
      <div className={`heart-icon`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          aria-hidden="true"
          role="presentation"
          focusable="false"
        >
          <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path>
        </svg>
      </div>
      {/* <div className="pin-point"></div> */}
    </div>
  );
}
