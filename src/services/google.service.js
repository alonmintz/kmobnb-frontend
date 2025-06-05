import axios from "axios";
const { VITE_GOOGLE_MAPS_API_KEY } = import.meta.env;

const GEO_CODE_URL = "https://maps.googleapis.com/maps/api/geocode/json";

export const googleService = {
  getGeoInfoByAddress,
  getAddressByCoords,
  isValidLocation,
  getUserGeolocation,
  getAddressSuggestions,
};

async function isValidLocation(lat, lng) {
  if (!lat || !lng) return false;

  try {
    const res = await axios.get(GEO_CODE_URL, {
      params: {
        latlng: `${lat},${lng}`,
        key: VITE_GOOGLE_MAPS_API_KEY,
        language: "en",
      },
    });

    const results = res.data.results;

    // Consider it valid if we got at least one result
    return results && results.length > 0;
  } catch (err) {
    console.error("Validation geocoding failed:", err);
    return false;
  }
}

async function getAddressByCoords(lat, lng) {
  if (!lat || !lng) return;

  try {
    const res = await axios.get(GEO_CODE_URL, {
      params: {
        latlng: `${lat},${lng}`,
        key: VITE_GOOGLE_MAPS_API_KEY,
        language: "en",
      },
    });

    const result = res.data.results?.[0];
    if (!result) throw new Error("No reverse geocoding result found");

    const { formatted_address, address_components } = result;

    const { city, country } = _extractLocationDataFromAddressComponents(
      address_components || []
    );

    return {
      lat,
      lng,
      address: formatted_address,
      city,
      country,
    };
  } catch (err) {
    console.error("Reverse geocoding failed:", err);
    throw err;
  }
}

async function getGeoInfoByAddress(addressToSearch) {
  if (!addressToSearch) return;

  try {
    const res = await axios.get(GEO_CODE_URL, {
      params: {
        address: addressToSearch,
        key: VITE_GOOGLE_MAPS_API_KEY,
        language: "en",
      },
    });

    const result = res.data.results?.[0];
    if (!result) throw new Error("No geocoding result found");

    const { formatted_address, address_components, geometry } = result;

    const { lat, lng } = geometry?.location || {};
    if (!lat || !lng) throw new Error("Missing location geometry");

    const { city, country } = _extractLocationDataFromAddressComponents(
      address_components || []
    );

    return {
      lat,
      lng,
      address: formatted_address,
      city,
      country,
    };
  } catch (err) {
    console.error("Geocoding by address failed:", err);
    throw err;
  }
}

function getUserGeolocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject(new Error("Geolocation is not supported by this browser."));
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolve({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error("Geolocation failed:", error);
        reject(new Error("Failed to retrieve user geolocation."));
      }
    );
  });
}

async function getAddressSuggestions(input) {
  const res = await axios.get(GEO_CODE_URL, {
    params: {
      address: input,
      key: VITE_GOOGLE_MAPS_API_KEY,
      language: "en",
    },
  });

  return res.data.results.map((r) => ({
    lat: r.geometry.location.lat,
    lng: r.geometry.location.lng,
    address: r.formatted_address,
  }));
}

function _extractLocationDataFromAddressComponents(components = []) {
  return components.reduce(
    (acc, comp) => {
      if (
        !acc.city &&
        comp.types.some((type) =>
          [
            "locality",
            "natural_feature",
            "establishment",
            "postal_town",
            "administrative_area_level_1",
            "administrative_area_level_2",
          ].includes(type)
        )
      ) {
        acc.city = comp.long_name;
      }

      if (!acc.country && comp.types.includes("country")) {
        acc.country = comp.long_name;
      }

      return acc;
    },
    { city: null, country: null }
  );
}
