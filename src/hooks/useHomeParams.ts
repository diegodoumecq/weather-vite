import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useAskLocation } from "~/hooks";

export const useHomeParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data } = useAskLocation({
    enabled: [...searchParams.entries()].length == 0,
  });

  const lat = searchParams.get("lat") ?? data?.latitude?.toString();
  const lon = searchParams.get("lon") ?? data?.longitude?.toString();
  const city = searchParams.get("city");
  const country = searchParams.get("country");

  // we needed to decouple the coords from the query params to avoid showing a blank screen when selecting a country
  const [coords, setCoords] = useState<{ lat: string; lon: string } | null>(
    null,
  );
  // this 👆 unfortunately means we need to use a useEffect here
  useEffect(() => {
    if (lat !== undefined && lon !== undefined) {
      setCoords({ lat, lon });
    }
  }, [lat, lon]);

  return {
    lat: coords?.lat,
    lon: coords?.lon,
    city,
    country,
    setParams: (params: {
      lat?: string;
      lon?: string;
      city?: string;
      country?: string;
    }) => {
      setSearchParams(params);
    },
  };
};
