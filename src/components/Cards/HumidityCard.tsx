import { useQuery } from "@tanstack/react-query";
import { DropletIcon } from "lucide-react";

import { getWeatherQuery } from "~/api";
import { CardProps, WeatherCard } from "~/ui";

export interface HumidityCardProps extends CardProps {
  lat?: string;
  lon?: string;
}

export const HumidityCard = ({ lat, lon, ...props }: HumidityCardProps) => {
  const { data } = useQuery(
    getWeatherQuery({
      lat,
      lon,
    }),
  );

  const humidity = data?.main.humidity;

  return (
    <WeatherCard
      {...props}
      icon={<DropletIcon className="h-5 w-5" />}
      title="Humidity"
      loading={!data}
      footer={
        humidity === undefined
          ? "Loading..."
          : humidity < 40
          ? "Low humidity. It might feel dry."
          : humidity < 70
          ? "Moderate humidity. Comfortable conditions."
          : "High humidity. It might feel humid and uncomfortable."
      }
    >
      <p>{!data ? "-" : humidity}%</p>
    </WeatherCard>
  );
};
