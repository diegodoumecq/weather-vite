import { useQuery } from "@tanstack/react-query";
import { SunIcon } from "lucide-react";

import { getUVQuery } from "~/api";
import { CardProps, Spectrum, WeatherCard } from "~/ui";

export interface UvCardProps extends CardProps {
  lat?: string;
  lon?: string;
}

export const UvCard = ({ lat, lon, ...props }: UvCardProps) => {
  const { data: uvIndexResponse } = useQuery(getUVQuery({ lat, lon }));

  const maxUvIndex = uvIndexResponse?.daily.uv_index_max[0];

  return (
    <WeatherCard
      {...props}
      icon={<SunIcon className="h-5 w-5" />}
      title="UV Index"
      loading={maxUvIndex === undefined}
      footer={
        maxUvIndex === undefined
          ? ""
          : maxUvIndex <= 2
          ? "No protection needed."
          : maxUvIndex <= 5
          ? "Wear sunscreen."
          : "Take precautions."
      }
    >
      <div className="flex flex-col">
        <div className="flex items-center gap-4">
          <p className=" text-5xl">{Math.round(maxUvIndex ?? 0)}</p>
          <Spectrum aria-label="UV Index" value={(maxUvIndex ?? 0) * 10} />
        </div>
        {maxUvIndex === undefined
          ? ""
          : maxUvIndex <= 2
          ? "Low"
          : maxUvIndex <= 5
          ? "Moderate"
          : maxUvIndex <= 7
          ? "High"
          : maxUvIndex <= 10
          ? "Very High"
          : "Extremely High"}
      </div>
    </WeatherCard>
  );
};
