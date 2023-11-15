import React from "react";
import { useQuery } from "@tanstack/react-query";
import { CigaretteIcon } from "lucide-react";

import { getAirPollutionQuery } from "~/api";
import { cn } from "~/shared";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardProps,
  CardTitle,
  Spectrum,
} from "~/ui";

function getQualityDisplay(aqi: number) {
  if (aqi < 50) {
    return "Air quality is good.";
  }
  if (aqi < 100) {
    return "Air quality is moderate.";
  }
  if (aqi < 150) {
    return "Air quality is unhealthy for sensitive groups.";
  }
  if (aqi < 200) {
    return "Air quality is unhealthy.";
  }
  if (aqi < 300) {
    return "Air quality is very unhealthy.";
  }
  return "Air quality is hazardous.";
}

export interface AirPollutionCardProps extends CardProps {
  lat?: string;
  lon?: string;
}

export const AirPollutionCard = ({
  lat,
  lon,
  className,
  ...props
}: AirPollutionCardProps) => {
  const { data: airPollutionResponse } = useQuery(
    getAirPollutionQuery({
      lat,
      lon,
    }),
  );

  const airPollution = airPollutionResponse?.list[0];
  return (
    <Card
      className={cn("flex h-48 flex-col justify-between", className)}
      loading={!airPollutionResponse}
      {...props}
    >
      <CardHeader>
        <CardTitle>
          <CigaretteIcon className="h-5 w-5" />
          Air pollution
        </CardTitle>
      </CardHeader>
      <CardContent className="my-auto">
        <Spectrum
          aria-label="Air pollution"
          value={airPollution ? airPollution.main.aqi * 10 : null}
        />
      </CardContent>
      <CardFooter>
        {airPollution && <p>{getQualityDisplay(airPollution.main.aqi)}</p>}
      </CardFooter>
    </Card>
  );
};
