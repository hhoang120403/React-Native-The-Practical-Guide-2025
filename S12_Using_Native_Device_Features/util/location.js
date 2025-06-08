import { reverseGeocodeAsync } from "expo-location";

export async function getAddress(lat, lng) {
  const address = await reverseGeocodeAsync({
    latitude: lat,
    longitude: lng,
  });
  return address;
}
