import { useEffect, useRef, useState } from "react";
import GoogleMapReact from "google-map-react";
import { googleService } from "../../services/google.service";
import { debounce } from "../../services/util.service";
import { useEffectUpdate } from "../../customHooks/useEffectUpdate";
import customMapPin from "../../assets/img/map-pin.png";
import { svgService } from "../../services/svg.service";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const { GOOGLE_MAPS_API_KEY } = import.meta.env;

const zoom = 13;

export function LocationPicker({ location, onChange, isExistingStay }) {
  const [coordinates, setCoordinates] = useState({
    lat: location.lat,
    lng: location.lng,
  });

  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const mapRef = useRef(null);
  const mapsRef = useRef(null);
  const markerRef = useRef(null);

  const debounceSearchSuggestions = useRef(
    debounce(searchSuggestions, 1000)
  ).current;

  useEffect(() => {
    checkLocationValidity();
  }, []);

  useEffectUpdate(() => {
    setCoordinates({ lat: location.lat, lng: location.lng });
    if (markerRef.current) {
      markerRef.current.setPosition({ lat: location.lat, lng: location.lng });
    }
  }, [location]);

  async function checkLocationValidity() {
    const { lat, lng } = location;
    const isValid = await googleService.isValidLocation(lat, lng);

    if (!isValid) {
      const userLatLng = await googleService.getUserGeolocation(lat, lng);
      const userLoc = await googleService.getAddressByCoords(
        userLatLng.lat,
        userLatLng.lng
      );
      onChange(userLoc);
      if (isExistingStay) {
        alert("Map set to your location due to invalid coordinates");
      }
    } else {
      setCoordinates({ lat, lng });
    }
  }

  function handleSearchInputChange({ target }) {
    const value = target.value;
    setSearchInput(value);

    if (!value.trim()) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    debounceSearchSuggestions(value);
  }

  async function searchSuggestions(input) {
    try {
      const suggestions = await googleService.getAddressSuggestions(input);
      setSearchResults(suggestions.slice(0, 3));
      setShowDropdown(true);
    } catch (err) {
      console.error("Failed to fetch suggestions", err);
      setSearchResults([]);
      setShowDropdown(false);
    }
  }

  function onResetSearchClick() {
    setSearchInput("");
    setSearchResults([]);
    setShowDropdown(false);
  }

  async function searchGoogleLocation(input) {
    const loc = input.address
      ? await googleService.getGeoInfoByAddress(input.address)
      : input;

    const { lat, lng } = loc;
    setCoordinates({ lat, lng });
    onChange(loc);
    setSearchResults([]);
    setShowDropdown(false);

    if (markerRef.current) markerRef.current.setPosition({ lat, lng });
    if (mapRef.current) mapRef.current.setCenter({ lat, lng });
  }

  async function handleMapClick({ lat, lng }) {
    try {
      const loc = await googleService.getAddressByCoords(lat, lng);

      onChange(loc);
    } catch (err) {
      console.error("Reverse geocoding failed", err);
    }

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
      icon: {
        url: customMapPin,
        scaledSize: new maps.Size(40, 40),
        anchor: new maps.Point(20, 40),
      },
    });

    marker.addListener("dragend", async (event) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      try {
        const loc = await googleService.getAddressByCoords(lat, lng);

        onChange(loc);
      } catch (err) {
        console.error("Reverse geocoding failed", err);
      }
    });

    markerRef.current = marker;
  }

  return (
    <div className="location-picker">
      <h2 className="title">Where's your place located?</h2>
      <h4 className="subtitle">{location.address || "No address yet"}</h4>
      <div className="search-wrapper">
        <label className="location-search-label" htmlFor="location-search">
          {searchInput && (
            <button
              type="button"
              className="reset-btn"
              onClick={onResetSearchClick}
            >
              <FontAwesomeIcon icon={faX} />
            </button>
          )}
          {svgService.getGenericSvg("Map pin", "search-pin-icon")}
          <input
            type="text"
            id="location-search"
            className="location-search"
            placeholder="Enter your address (at least 5 characters)"
            value={searchInput}
            onChange={handleSearchInputChange}
            required
          />
          {showDropdown && searchResults.length > 0 && (
            <ul className="search-dropdown">
              {searchResults.map((result, idx) => (
                <li
                  key={idx}
                  onClick={() => {
                    setSearchInput("");
                    searchGoogleLocation(result);
                  }}
                >
                  {result.address}
                </li>
              ))}
            </ul>
          )}
        </label>
      </div>

      <div className="map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
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
