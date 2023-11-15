import { useQuery } from "@tanstack/react-query";
import { EyeIcon } from "lucide-react";

import { getWeatherQuery } from "~/api";
import { CardProps, WeatherCard } from "~/ui";

export interface VisibilityCardProps extends CardProps {
  lat?: string;
  lon?: string;
}

export const VisibilityCard = ({ lat, lon, ...props }: VisibilityCardProps) => {
  const { data } = useQuery(
    getWeatherQuery({
      lat,
      lon,
    }),
  );
  const visibility = data?.visibility;

  return (
    <WeatherCard
      {...props}
      icon={<EyeIcon className="h-5 w-5" />}
      title="Visibility"
      loading={!data}
      footer={
        visibility === undefined
          ? "Loading..."
          : visibility >= 10
          ? "It's perfectly clear right now."
          : visibility >= 5
          ? "Good visibility."
          : "Poor visibility. Exercise caution while driving or moving around."
      }
    >
      <p>{visibility === undefined ? "-" : visibility / 1000} km</p>
    </WeatherCard>
  );
};
