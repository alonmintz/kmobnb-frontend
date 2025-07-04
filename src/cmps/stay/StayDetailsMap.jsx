import GoogleMapReact from "google-map-react";
import { useState } from "react";
const { VITE_GOOGLE_MAPS_API_KEY } = import.meta.env;

const LocationPin = () => (
  <div className="location-pin">
    <div className="home-icon">
      <svg
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="presentation"
        focusable="false"
        style={{
          display: "block",
          height: "22px",
          width: "22px",
          fill: "currentcolor",
        }}
      >
        <path d="m8.94959955 1.13115419 5.71719515 4.68049298c.2120231.18970472.3332053.46073893.3332053.74524138v7.94311145c0 .2761424-.2238576.5-.5.5h-4.5v-5.5c0-.24545989-.17687516-.44960837-.41012437-.49194433l-.08987563-.00805567h-3c-.27614237 0-.5.22385763-.5.5v5.5h-4.5c-.27614237 0-.5-.2238576-.5-.5v-7.95162536c0-.28450241.12118221-.55553661.3502077-.75978249l5.70008742-4.65820288c.55265671-.45163993 1.34701168-.45132001 1.89930443.00076492z"></path>
      </svg>
    </div>
    <div className="pin-point"></div>
  </div>
);

export function StayDetailsMap({ city, country, lat, lng }) {
  const [coordinates, setCoordinates] = useState({ lat, lng });
  const zoom = 15;

  return (
    <section className="stay-details-map-container">
      <h2 className="title map-title">Where you'll be</h2>
      <h4 className="title map-subtitle">{`${city}, ${country}`}</h4>
      <div className="map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: VITE_GOOGLE_MAPS_API_KEY }}
          defaultCenter={coordinates}
          defaultZoom={zoom}
        >
          <LocationPin lat={coordinates.lat} lng={coordinates.lng} />
        </GoogleMapReact>
      </div>
    </section>
  );
}
