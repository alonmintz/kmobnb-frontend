// //   "loc": {
// //       "country": "United States",
// //       "countryCode": "US",
// //       "city": "Maui",
// //       "address": "Lahaina, HI, United States",
// //       "lat": -156.6917,
// //       "lan": 20.93792
// //   },
// import { useEffect, useRef, useState } from "react";
// import { stayService } from "../../services/stay";
// import GoogleMapReact from "google-map-react";
// import { googleService } from "../../services/google.service";
// import { debounce } from "../../services/util.service";
// import { useEffectUpdate } from "../../customHooks/useEffectUpdate";

// const LocationPin = () => (
//   <div className="location-pin">
//     <div className="home-icon">
//       <svg
//         viewBox="0 0 16 16"
//         xmlns="http://www.w3.org/2000/svg"
//         aria-hidden="true"
//         role="presentation"
//         focusable="false"
//         style={{
//           display: "block",
//           height: "22px",
//           width: "22px",
//           fill: "currentcolor",
//         }}
//       >
//         <path d="m8.94959955 1.13115419 5.71719515 4.68049298c.2120231.18970472.3332053.46073893.3332053.74524138v7.94311145c0 .2761424-.2238576.5-.5.5h-4.5v-5.5c0-.24545989-.17687516-.44960837-.41012437-.49194433l-.08987563-.00805567h-3c-.27614237 0-.5.22385763-.5.5v5.5h-4.5c-.27614237 0-.5-.2238576-.5-.5v-7.95162536c0-.28450241.12118221-.55553661.3502077-.75978249l5.70008742-4.65820288c.55265671-.45163993 1.34701168-.45132001 1.89930443.00076492z"></path>
//       </svg>
//     </div>
//     <div className="pin-point"></div>
//   </div>
// );
// const zoom = 11;

// export function LocationPicker({ location, onChange }) {
//   const [coordinates, setCoordinates] = useState({
//     lat: location.lat || 0,
//     lng: location.lng || 0,
//   });

//   const [searchInput, setSearchInput] = useState("");

//   async function testGoogle(input) {
//     const loc = await googleService.getGeoInfoByAddress(input);
//     const { lat, lng } = loc;
//     onChange(loc);
//   }
//   const debounceSearchGeoLoc = useRef(debounce(testGoogle, 1500)).current;

//   useEffectUpdate(() => {
//     debounceSearchGeoLoc(searchInput);
//   }, [searchInput]);

//   useEffectUpdate(() => {
//     setCoordinates({ lat: location.lat, lng: location.lng });
//   }, [location]);

//   function handleSearchInputChange({ target }) {
//     setSearchInput(target.value);
//   }

//   function handleMapClick({ lat, lng }) {
//     console.log("Clicked map at:", { lat, lng });
//     //TODO: continue with updating loc via lat + lng click
//   }

//   return (
//     <div className="location-picker">
//       <h2 className="title">Where's your place located?</h2>
//       <h4>{location.address || "kaki"}</h4>
//       <input
//         type="text"
//         className="location-search"
//         // name="name"
//         placeholder="Let's give your place a title"
//         // maxLength={MAX_NAME_CHARS}
//         value={searchInput}
//         onChange={handleSearchInputChange}
//         required
//       />
//       <div className="map">
//         <GoogleMapReact
//           bootstrapURLKeys={{ key: "AIzaSyD_qLVdSP8p5o9mze0KV_J_MJftGN4Rq7s" }}
//           center={coordinates}
//           defaultZoom={zoom}
//           onClick={handleMapClick}
//         >
//           <LocationPin {...coordinates} />
//         </GoogleMapReact>
//       </div>
//     </div>
//   );
// }
import { useEffect, useRef, useState } from "react";
import GoogleMapReact from "google-map-react";
import { googleService } from "../../services/google.service";
import { debounce } from "../../services/util.service";
import { useEffectUpdate } from "../../customHooks/useEffectUpdate";

const zoom = 11;

export function LocationPicker({ location, onChange }) {
  const [coordinates, setCoordinates] = useState({
    lat: location.lat || 0,
    lng: location.lng || 0,
  });

  const [searchInput, setSearchInput] = useState("");

  const mapRef = useRef(null);
  const mapsRef = useRef(null);
  const markerRef = useRef(null);

  async function testGoogle(input) {
    const loc = await googleService.getGeoInfoByAddress(input);
    const { lat, lng } = loc;
    setCoordinates({ lat, lng });
    onChange(loc);
    if (markerRef.current) {
      markerRef.current.setPosition({ lat, lng });
    }
    mapRef.current.setCenter({ lat, lng });
  }

  const debounceSearchGeoLoc = useRef(debounce(testGoogle, 1500)).current;

  useEffectUpdate(() => {
    debounceSearchGeoLoc(searchInput);
  }, [searchInput]);

  useEffectUpdate(() => {
    setCoordinates({ lat: location.lat, lng: location.lng });
    if (markerRef.current) {
      markerRef.current.setPosition({ lat: location.lat, lng: location.lng });
    }
  }, [location]);

  function handleSearchInputChange({ target }) {
    setSearchInput(target.value);
  }

  function handleMapClick({ lat, lng }) {
    console.log("Clicked map at:", { lat, lng });
    setCoordinates({ lat, lng });
    onChange({ ...location, lat, lng });
    if (markerRef.current) {
      markerRef.current.setPosition({ lat, lng });
    }
  }

  function handleApiLoaded({ map, maps }) {
    mapRef.current = map;
    mapsRef.current = maps;

    const marker = new maps.Marker({
      position: coordinates,
      map,
      draggable: true,
    });

    marker.addListener("dragend", (event) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      console.log("Marker dropped at:", { lat, lng });
      setCoordinates({ lat, lng });
      onChange({ ...location, lat, lng });
    });

    markerRef.current = marker;
  }

  return (
    <div className="location-picker">
      <h2 className="title">Where's your place located?</h2>
      <h4>{location.address || "No address yet"}</h4>

      <input
        type="text"
        className="location-search"
        placeholder="Search for location"
        value={searchInput}
        onChange={handleSearchInputChange}
        required
      />

      <div className="map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyD_qLVdSP8p5o9mze0KV_J_MJftGN4Rq7s" }}
          center={coordinates}
          defaultZoom={zoom}
          onClick={handleMapClick}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={handleApiLoaded}
        />
      </div>
    </div>
  );
}
