import { Root as Separator } from "@radix-ui/react-separator";
import { useQuery } from "@tanstack/react-query";
import { CalendarIcon } from "lucide-react";

import { getTenDayForecastQuery } from "~/api";
import { TemperatureRange, WeatherIcon } from "~/components";
import { convertToDate } from "~/shared";
import { Card, CardContent, CardHeader, CardProps, CardTitle } from "~/ui";

export interface TenDayForecastCardProps extends CardProps {
  lat?: string;
  lon?: string;
}

export const TenDayForecastCard = ({
  lat,
  lon,
  ...props
}: TenDayForecastCardProps) => {
  const { data: tenDayForecastResponse } = useQuery(
    getTenDayForecastQuery({
      lat,
      lon,
    }),
  );

  const city = tenDayForecastResponse?.city;
  const forecastList = tenDayForecastResponse?.list;

  const temperatures = forecastList?.map((item) => item.temp);

  return (
    <Card
      className="row-span-3 shrink-0"
      loading={!forecastList || !city}
      {...props}
    >
      <CardHeader>
        <CardTitle>
          <CalendarIcon className="h-5 w-5" />
          10-Day Forecast
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-base font-normal md:mb-1">
        {forecastList && temperatures && city && (
          <>
            {forecastList.map((item, i) => (
              <div key={item.dt}>
                <div className="flex w-full flex-row items-center justify-between gap-2 last:mb-0">
                  <p className="w-12 font-medium">
                    {i === 0
                      ? "Today"
                      : convertToDate(city.timezone, item.dt, "short")}
                  </p>
                  <WeatherIcon
                    weatherCode={item.weather[0].id}
                    className=" h-8 w-8"
                  />
                  <div className="flex w-3/5 flex-row gap-2 overflow-hidden">
                    <div className="flex w-full select-none flex-row items-center justify-between gap-2 pr-2 text-sm">
                      <p className="flex w-12 min-w-fit justify-end text-neutral-400">
                        {Math.floor(item.temp.min)}&deg;
                      </p>
                      <TemperatureRange
                        min={Math.min(...temperatures.map((temp) => temp.min))}
                        max={Math.max(...temperatures.map((temp) => temp.max))}
                        value={[item.temp.min, item.temp.max]}
                      />
                      <p className="flex w-12 min-w-fit justify-end">
                        {Math.floor(item.temp.max)}&deg;
                      </p>
                    </div>
                  </div>
                </div>
                {i !== forecastList.length - 1 && (
                  <Separator
                    decorative
                    orientation="horizontal"
                    className="mt-3 h-px w-full shrink-0 bg-gray-800"
                  />
                )}
              </div>
            ))}
          </>
        )}
      </CardContent>
    </Card>
  );
};
