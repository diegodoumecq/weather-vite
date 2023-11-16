import { cn, weatherIconMappings } from "~/shared";

interface WeatherIconProps {
  weatherCode: number;
  isDay?: boolean;
  className?: string;
}

export function WeatherIcon({
  weatherCode,
  isDay,
  className,
}: WeatherIconProps) {
  const iconNameKey =
    isDay !== undefined
      ? `${weatherCode}${isDay ? "d" : "n"}`
      : `${weatherCode}`;

  const iconName = weatherIconMappings[iconNameKey];

  return (
    <div className={cn(`relative invert`, className)}>
      <img
        alt={`${weatherCode}`}
        src={`/weather-vite/icons/wi-${iconName}.svg`}
        className="select-none"
      />
    </div>
  );
}
