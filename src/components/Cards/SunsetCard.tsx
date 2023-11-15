import { useQuery } from "@tanstack/react-query";
import {
  AlignCenterHorizontalIcon,
  SunriseIcon,
  SunsetIcon,
} from "lucide-react";

import { getWeatherQuery } from "~/api";
import { formatSunTimeWithAMPM } from "~/shared";
import { CardProps, WeatherCard } from "~/ui";

export interface SunsetCardProps extends CardProps {
  lat?: string;
  lon?: string;
}

export const SunsetCard = ({ lat, lon, ...props }: SunsetCardProps) => {
  const { data } = useQuery(
    getWeatherQuery({
      lat,
      lon,
    }),
  );

  return (
    <WeatherCard
      {...props}
      icon={<AlignCenterHorizontalIcon className="h-5 w-5" />}
      title="Sun Cycle"
      loading={!data}
    >
      {!data
        ? "-:-- --"
        : formatSunTimeWithAMPM(data.sys.sunrise, data.timezone)}
      <div className="flex gap-2 pb-4 text-sm">
        Sunrise <SunriseIcon className="h-4 w-4 text-yellow-200" />
      </div>

      {!data
        ? "-:-- --"
        : formatSunTimeWithAMPM(data.sys.sunset, data.timezone)}
      <div className="flex gap-2 text-sm">
        Sunset <SunsetIcon className="h-4 w-4 text-yellow-200" />
      </div>
    </WeatherCard>
  );
};
