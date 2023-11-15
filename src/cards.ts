import {
  AlignCenterHorizontalIcon,
  Building2Icon,
  CalendarIcon,
  CigaretteIcon,
  CloudIcon,
  DropletIcon,
  EyeIcon,
  GaugeIcon,
  SunIcon,
  ThermometerIcon,
  WindIcon,
} from "lucide-react";
import {
  AirPollutionCard,
  CurrentWeatherCard,
  FeelsLikeCard,
  HumidityCard,
  PrecipitationCard,
  PressureCard,
  SunsetCard,
  TenDayForecastCard,
  UvCard,
  VisibilityCard,
  WindCard,
} from "~/components/Cards";
import { entries } from "./shared/entries";

export const CARDS = {
  CurrentWeatherCard: {
    Icon: Building2Icon,
    Component: CurrentWeatherCard,
  },
  TenDayForecastCard: {
    Icon: CalendarIcon,
    Component: TenDayForecastCard,
  },
  AirPollutionCard: {
    Icon: CigaretteIcon,
    Component: AirPollutionCard,
  },
  SunsetCard: {
    Icon: AlignCenterHorizontalIcon,
    Component: SunsetCard,
  },
  WindCard: {
    Icon: WindIcon,
    Component: WindCard,
  },
  UvCard: {
    Icon: SunIcon,
    Component: UvCard,
  },
  PrecipitationCard: {
    Icon: CloudIcon,
    Component: PrecipitationCard,
  },
  FeelsLikeCard: {
    Icon: ThermometerIcon,
    Component: FeelsLikeCard,
  },
  HumidityCard: {
    Icon: DropletIcon,
    Component: HumidityCard,
  },
  VisibilityCard: {
    Icon: EyeIcon,
    Component: VisibilityCard,
  },
  PressureCard: {
    Icon: GaugeIcon,
    Component: PressureCard,
  },
} as const;
export type CardId = keyof typeof CARDS;
export const cardEntries = entries(CARDS);
