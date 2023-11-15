import { useQuery } from "@tanstack/react-query";
import { GaugeIcon } from "lucide-react";

import { getWeatherQuery } from "~/api";
import { CardProps, WeatherCard } from "~/ui";

export interface PressureCardProps extends CardProps {
  lat?: string;
  lon?: string;
}

export const PressureCard = ({ lat, lon, ...props }: PressureCardProps) => {
  const { data } = useQuery(
    getWeatherQuery({
      lat,
      lon,
    }),
  );

  const pressure = data?.main.pressure;

  return (
    <WeatherCard
      {...props}
      icon={<GaugeIcon className="h-5 w-5" />}
      title="Pressure"
      loading={!data}
      footer={
        pressure === undefined
          ? "Loading..."
          : pressure < 1000
          ? "Low pressure. Expect changes in the weather."
          : pressure >= 1000 && pressure <= 1010
          ? "Normal pressure. Typical weather conditions."
          : "High pressure. Expect stable and clear weather."
      }
    >
      <p>{!data ? "-" : pressure} hPa</p>
    </WeatherCard>
  );
};
