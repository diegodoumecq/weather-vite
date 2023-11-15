import { api } from "./axios";

export type DailyUnits = {
  time: string;
  uv_index_max: string;
};

export type DailyDto = {
  time: string[];
  uv_index_max: number[];
};

export type UVIndexResponse = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  daily_units: DailyUnits;
  daily: DailyDto;
};

export const getUVQuery = ({
  lat,
  lon,
}: {
  lat?: string;
  lon?: string;
}) => ({
  enabled: lat !== undefined && lon !== undefined,
  queryKey: ["getUVQuery", lat, lon],
  queryFn: () =>
    api.get<UVIndexResponse>(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=uv_index_max,uv_index_clear_sky_max&timezone=auto&forecast_days=1`,
    ).then(r => r.data),
});
