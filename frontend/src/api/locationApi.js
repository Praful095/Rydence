import axios from "axios";

const NOMINATIM_BASE = "https://nominatim.openstreetmap.org";

// Create a separate axios instance for Nominatim
const nominatimApi = axios.create({
  baseURL: NOMINATIM_BASE,
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "User-Agent": "Rydence/1.0 (ride-sharing app)",
  },
});

// Build readable address from Nominatim response
const buildAddressLabel = (address) => {
  if (!address) return "";

  const parts = [];

  // Add neighbourhood or suburb
  if (address.neighbourhood) parts.push(address.neighbourhood);
  else if (address.suburb) parts.push(address.suburb);

  // Add city/town
  if (address.city) parts.push(address.city);
  else if (address.town) parts.push(address.town);
  else if (address.village) parts.push(address.village);

  // Add state
  if (address.state) parts.push(address.state);

  return parts.join(", ");
};

export const reverseGeocode = async (lat, lon) => {
  try {
    const response = await nominatimApi.get("/reverse", {
      params: {
        lat,
        lon,
        format: "json",
        addressdetails: 1,
        "accept-language": "en",
      },
    });

    const address = response.data?.address;
    if (!address) return null;

    return {
      display_name: buildAddressLabel(address),
      full_data: response.data,
    };
  } catch (error) {
    console.error("Error reverse geocoding:", error);
    throw error;
  }
};

export const searchLocation = async (query) => {
  if (!query || query.length < 2) return [];

  try {
    const response = await nominatimApi.get("/search", {
      params: {
        q: query,
        format: "json",
        addressdetails: 1,
        limit: 6,
        countrycodes: "in",
        "accept-language": "en",
      },
    });

    return response.data.map((item) => ({
      place_id: item.place_id,
      display_name: buildAddressLabel(item.address),
      full_name: item.display_name,
      lat: item.lat,
      lon: item.lon,
      address: item.address,
    }));
  } catch (error) {
    console.error("Error searching location:", error);
    throw error;
  }
};
