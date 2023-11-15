import { QueryObserverOptions, useQuery } from "@tanstack/react-query";

export const getLocation = () => {
  return new Promise<GeolocationCoordinates | undefined>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((values) => {
      // For some reason the browser's api sometimes gives us a {} for values instead of GeolocationPosition
      resolve(values?.coords)
    }, reject);
  });
};

export const useAskLocation = (
  options?: Omit<
    QueryObserverOptions<GeolocationCoordinates | undefined>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery<GeolocationCoordinates | undefined>({
    queryFn: getLocation,
    queryKey: ["useAskLocation"],
    ...options,
  });
};
