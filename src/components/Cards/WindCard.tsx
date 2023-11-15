import { useQuery } from "@tanstack/react-query";
import { WindIcon } from "lucide-react";

import { getWeatherQuery } from "~/api";
import { Compass } from "~/components";
import { CardProps, WeatherCard } from "~/ui";

export interface WindCardProps extends CardProps {
  lat?: string;
  lon?: string;
}

export const WindCard = ({ lat, lon, ...props }: WindCardProps) => {
  const { data } = useQuery(
    getWeatherQuery({
      lat,
      lon,
    }),
  );

  return (
    <WeatherCard
      {...props}
      icon={<WindIcon className="h-5 w-5" />}
      title="Wind"
      loading={!data}
    >
      <div className="flex justify-center p-0">
        <Compass speed={data?.wind?.speed ?? 0} deg={data?.wind?.deg ?? 0} />
      </div>
    </WeatherCard>
  );
};
