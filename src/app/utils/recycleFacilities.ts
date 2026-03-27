import { facility as fallbackFacilities } from "../data/facility";
import { calculateDistance } from "./calculateLocation";
import { getApiUrl } from "./api";

export interface RecycleFacility {
  name: string;
  capacity: string | number;
  lon: number;
  lat: number;
  contact: string;
  time: string;
  verified: boolean;
}

const normalizeFacilities = (payload: unknown): RecycleFacility[] => {
  const raw = Array.isArray(payload)
    ? payload
    : payload && typeof payload === "object" && Array.isArray((payload as any).facilities)
      ? (payload as any).facilities
      : [];

  return raw.filter((item): item is RecycleFacility => {
    return (
      item &&
      typeof item === "object" &&
      typeof item.name === "string" &&
      typeof item.lat === "number" &&
      typeof item.lon === "number"
    );
  });
};

const getClientCoordinates = (): Promise<[number, number] | null> =>
  new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => resolve([position.coords.longitude, position.coords.latitude]),
      () => resolve(null),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 120000 }
    );
  });

export const loadRecycleFacilities = async (): Promise<RecycleFacility[]> => {
  let facilities: RecycleFacility[] = [];

  try {
    const response = await fetch(getApiUrl("/api/facilities"));
    if (response.ok) {
      const payload = await response.json();
      facilities = normalizeFacilities(payload);
    }
  } catch {
    facilities = [];
  }

  if (!facilities.length) {
    facilities = normalizeFacilities(fallbackFacilities);
  }

  const coords = await getClientCoordinates();
  if (!coords) return facilities;

  const [clientLon, clientLat] = coords;
  return [...facilities].sort((a, b) => {
    const aDistance = calculateDistance(clientLat, clientLon, a.lat, a.lon);
    const bDistance = calculateDistance(clientLat, clientLon, b.lat, b.lon);
    return aDistance - bDistance;
  });
};
