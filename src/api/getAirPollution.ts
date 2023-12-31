import { env } from "~/env";
import { api } from "./axios";
import { Coordinates } from "./types";

export type AirPollutionDto = {
  dt: number; // Unix time in seconds of the moment the payload was received
  main: {
    aqi: 1 | 2 | 3 | 4 | 5;
  };
  components: {
    co: number; // Concentration of CO (Carbon monoxide), μg/m3
    no: number; // Concentration of NO (Nitrogen monoxide), μg/m3
    no2: number; // Concentration of NO2 (Nitrogen dioxide), μg/m3
    o3: number; // Concentration of O3 (Ozone), μg/m3
    so2: number; // Concentration of SO2 (Sulphur dioxide), μg/m3
    pm2_5: number; // Concentration of PM2.5 (Fine particles matter), μg/m3
    pm10: number; // Concentration of PM10 (Coarse particulate matter), μg/m3
    nh3: number; // Concentration of NH3 (Ammonia), μg/m3
  };
};

export type AirPollutionResponse = {
  coord: Coordinates;
  list: AirPollutionDto[];
};

const appid = env.VITE_WEATHER_API_KEY;

export const getAirPollutionQuery = ({
  lat,
  lon,
}: {
  lat?: string;
  lon?: string;
}) => ({
  enabled: lat !== undefined && lon !== undefined,
  queryKey: ["getAirPollutionQuery", lat, lon],
  queryFn: () =>
    api.get<AirPollutionResponse>(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&units=metric&appid=${appid}`,
    ).then(r => r.data),
});
