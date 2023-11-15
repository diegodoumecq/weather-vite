import { useQuery } from "@tanstack/react-query";
import { CloudIcon } from "lucide-react";

import { getTenDayForecastQuery } from "~/api";
import { CardProps, WeatherCard } from "~/ui";

export interface PrecipitationCardProps extends CardProps {
  lat?: string;
  lon?: string;
}

export const PrecipitationCard = ({
  lat,
  lon,
  ...props
}: PrecipitationCardProps) => {
  const { data } = useQuery(
    getTenDayForecastQuery({
      lat,
      lon,
    }),
  );
  const rain = data?.list[0]?.rain;

  return (
    <WeatherCard
      {...props}
      icon={<CloudIcon className="h-5 w-5" />}
      title="Precipitation"
      loading={!data}
      footer={
        !data
          ? ""
          : rain !== undefined
          ? rain <= 0.2
            ? "Light rain or drizzle. An umbrella may come in handy."
            : rain <= 2.5
            ? "Moderate rain."
            : "Heavy rain."
          : "Conditions are dry."
      }
    >
      {<p>{data ? rain ?? 0 : "-"}mm</p>}
    </WeatherCard>
  );
};
