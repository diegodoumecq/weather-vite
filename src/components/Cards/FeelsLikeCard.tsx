import { useQuery } from "@tanstack/react-query";
import { ThermometerIcon } from "lucide-react";

import { getWeatherQuery } from "~/api";
import { CardProps, WeatherCard } from "~/ui";

export interface FeelsLikeCardProps extends CardProps {
  lat?: string;
  lon?: string;
}

export const FeelsLikeCard = ({ lat, lon, ...props }: FeelsLikeCardProps) => {
  const { data } = useQuery(
    getWeatherQuery({
      lat,
      lon,
    }),
  );

  const feelsLike = data?.main.feels_like;
  const temp = data?.main.temp;

  return (
    <WeatherCard
      {...props}
      icon={<ThermometerIcon className="h-5 w-5" />}
      title="Feels like"
      loading={!data}
      footer={
        feelsLike === undefined || temp === undefined
          ? ""
          : feelsLike < temp
          ? "Feels colder than the actual temperature."
          : feelsLike > temp
          ? "Feels warmer than the actual temperature."
          : "Feels like the actual temperature."
      }
    >
      <p>{feelsLike === undefined ? "-" : Math.floor(feelsLike)}&deg;</p>
    </WeatherCard>
  );
};
