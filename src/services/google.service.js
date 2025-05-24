import axios from "axios";

const GOOGLE_API_KEY = "AIzaSyD_qLVdSP8p5o9mze0KV_J_MJftGN4Rq7s";
const GEO_CODE_URL = "https://maps.googleapis.com/maps/api/geocode/json";

// const default = {
//   key: GOOGLE_API_KEY,
// };

async function getGeoInfoByAddress(addressToSearch) {
  if (!addressToSearch) return;
  try {
    const res = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          address: addressToSearch,
          key: GOOGLE_API_KEY,
          language: "en",
        },
      }
    );

    const result = res.data.results[0];
    const latlng = result?.geometry.location;
    const addressDetails = {
      address: result?.formatted_address,
      ...extractLocationData(result?.address_components),
    };

    // const location = res.data.results[0]?.geometry.location;
    if (latlng && addressDetails) {
      const { lat, lng } = latlng;
      console.log("Coordinates:", lat, lng);
      const { country, city, address } = addressDetails;
      console.log("address:", country, city, address);

      return {
        lat,
        lng,
        country,
        city,
        address,
      };
    } else {
      throw new Error("No results found");
    }
  } catch (err) {
    console.error("Geocoding failed:", err);
    throw err;
  }
}

function extractLocationData(components) {
  console.log({ components });

  return components.reduce(
    (acc, comp) => {
      if (
        !acc.city &&
        comp.types.some((t) =>
          ["establishment", "natural_feature", "locality"].includes(t)
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

export const googleService = { getGeoInfoByAddress };
