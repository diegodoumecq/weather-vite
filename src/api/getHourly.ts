import { env } from "~/env";
import { api } from "./axios";
import { City } from "./types";

export type HourlyForecastDto = {
  dt: number; // Unix time in seconds of the moment the payload was received
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  rain?: {
    "1h": number;
  };
  sys: {
    pod: "d" | "n";
  };
  dt_txt: string;
};

export type HourlyForecastResponse = {
  cod: string;
  message: number;
  cnt: number;
  list: HourlyForecastDto[];
  city: City;
};

const appid = env.VITE_WEATHER_API_KEY;
const HOURS = 23;

export const getHourlyQuery = ({
  lat,
  lon,
}: {
  lat?: string;
  lon?: string;
}) => ({
  enabled: lat !== undefined && lon !== undefined,
  queryKey: ["getHourlyQuery", lat, lon],
  queryFn: () =>
    api
      .get<HourlyForecastResponse>(
        `https://api.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&cnt=${HOURS}&units=metric&appid=${appid}`,
      )
      .then((r) => r.data),
});
