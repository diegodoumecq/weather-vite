import { env } from "~/env";
import { api } from "./axios";

export type Weather = {
  description: string;
  icon: string;
  id: number;
  main: string;
};

export type Temperature = {
  day: number;
  eve: number;
  max: number;
  min: number;
  morn: number;
  night: number;
};

export type FeelsLike = {
  day: number;
  eve: number;
  morn: number;
  night: number;
};

export type ForecastDto = {
  clouds: number;
  deg: number;
  dt: number; // Unix time in seconds of the moment the payload was received
  feels_like: FeelsLike;
  gust: number;
  humidity: number;
  pop: number;
  pressure: number;
  rain?: number;
  speed: number;
  sunrise: number;
  sunset: number;
  temp: Temperature;
  weather: Weather[];
};

export type TenDayForecastDto = {
  city: {
    coord: {
      lon: number
      lat: number
    }
    country: string
    id: number
    name: string
    population: number
    timezone: number;
  };
  cnt: number;
  cod: string;
  list: ForecastDto[];
  message: number;
};

const appid = env.VITE_WEATHER_API_KEY;
const NUMBER_OF_DAYS = 10;

export const getTenDayForecastQuery = ({
  lat,
  lon,
}: {
  lat?: string;
  lon?: string;
}) => ({
  enabled: lat !== undefined && lon !== undefined,
  queryKey: ["getTenDayForecastQuery", lat, lon],
  queryFn: () =>
    api.get<TenDayForecastDto>(
      `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=${NUMBER_OF_DAYS}&units=metric&appid=${appid}`
    ).then(r => r.data),
});
