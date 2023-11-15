import { useQuery } from "@tanstack/react-query";
import { Building2Icon } from "lucide-react";

import { getWeatherQuery } from "~/api";
import { Clock, WeatherIcon } from "~/components";
import { convertToDate } from "~/shared";
import { Card, CardProps } from "~/ui";

export interface CurrentWeatherCardProps extends CardProps {
  lat?: string;
  lon?: string;
}

export const CurrentWeatherCard = ({
  lat,
  lon,
  ...props
}: CurrentWeatherCardProps) => {
  const initial = new Date();

  const { data } = useQuery(
    getWeatherQuery({
      lat,
      lon,
    }),
  );

  const cityName = data?.name ?? "--";
  const timeZone = data?.timezone ?? -10800;

  return (
    <Card
      className="relative row-span-2 flex h-[25rem] w-full shrink-0 flex-col justify-between"
      loading={!data}
      {...props}
    >
      <div>
        <div className="flex justify-between text-lg font-semibold">
          <span>
            {convertToDate(timeZone, data?.dt || Date.now() / 1000, "long")}
          </span>
          <Clock initial={initial} timezone={timeZone} />
        </div>
        <div className="text-md flex items-center gap-2 pt-2 font-bold">
          <Building2Icon className="h-5 w-5" />
          <span>{cityName}</span>
        </div>
      </div>

      <div className="flex justify-center py-7 text-8xl font-bold md:py-10">
        {!data ? "-" : Math.round(data.main.temp)}&deg;
      </div>
      <div>
        {data && (
          <WeatherIcon
            weatherCode={data.weather[0].id}
            isDay={data.dt > data.sys.sunrise && data.dt < data.sys.sunset}
            className="h-9 w-9"
          />
        )}
        <div className="font-semibold">
          {!data ? "-" : data.weather[0]?.main}
        </div>
        <div className="flex gap-2 text-neutral-500">
          <span>H: {!data ? "-" : Math.round(data.main.temp_max)}&deg;</span>
          <span>L: {!data ? "-" : Math.round(data.main.temp_min)}&deg;</span>
        </div>
      </div>
    </Card>
  );
};
