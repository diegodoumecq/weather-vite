import { useMemo } from "react";
import { City, Country } from "country-state-city";

import { Autocomplete } from "~/ui";

export const countryOptions = Country.getAllCountries().map(
  ({ isoCode, name, latitude, longitude }) => ({
    label: name,
    value: isoCode,
    latitude,
    longitude,
  }),
);

interface SearchCityProps {
  onSelect: (
    value:
      | { type: "countrySelection"; country: string }
      | {
          type: "citySelection";
          city: string;
          lat: string;
          lon: string;
          country: string;
        },
  ) => void;

  city: string | null;
  country: string | null;
}

// TODO: fix a bug where sometimes the city autocomplete options don't open properly
export function SearchCity({ onSelect, city, country }: SearchCityProps) {
  const cityOptions = useMemo(() => {
    if (country) {
      return City.getCitiesOfCountry(country)
        ?.filter((c) => (c.latitude ?? c.longitude ?? null) !== null)
        .map(({ name, latitude, longitude }) => ({
          label: name,
          value: name,
          lat: latitude,
          lon: longitude,
        }));
    }
  }, [country]);

  const hasCities = (cityOptions?.length ?? 0) > 0;

  return (
    <div className="flex gap-4">
      <Autocomplete
        containerClassName="flex-1"
        placeholder="Country"
        options={countryOptions}
        value={country ?? ""}
        onChange={(_, country) => {
          const cities =
            City.getCitiesOfCountry(country.value)?.filter(
              (c) => (c.latitude ?? c.longitude ?? null) !== null,
            ) ?? [];

          if (cities.length === 0) {
            onSelect({
              type: "citySelection",
              city: country.label,
              lat: country.latitude,
              lon: country.longitude,
              country: country.value,
            });
          } else {
            onSelect({
              type: "countrySelection",
              country: country.value,
            });
          }
        }}
      />
      {country && hasCities && (
        <Autocomplete
          placeholder="City"
          getKey={(o) => `${o.value}-${o.lat}-${o.lon}`}
          containerClassName="flex-1"
          options={cityOptions ?? []}
          value={city ?? ""}
          onChange={(_, city) => {
            onSelect({
              type: "citySelection",
              city: city.label,
              lat: city.lat!,
              lon: city.lon!,
              country: country,
            });
          }}
        />
      )}
    </div>
  );
}
