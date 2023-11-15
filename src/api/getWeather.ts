import axios from "axios";

import { env } from "~/env";

export type OpenWeatherResponse = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number; // Unix time in seconds of the moment the payload was received
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

const appid = env.VITE_WEATHER_API_KEY;

export const getWeatherQuery = ({
  lat,
  lon,
}: {
  lat?: string;
  lon?: string;
}) => ({
  enabled: lat !== undefined && lon !== undefined,
  queryKey: ["getWeatherQuery", lat, lon],
  queryFn: () =>
    axios.get<OpenWeatherResponse>(
      `https://pro.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${appid}`,
    ).then(r => r.data),
});
