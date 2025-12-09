export type ColorScheme = "light" | "dark";

export type ReportItem = {
  id: number;
  name: string;
};

export type LocationItem = {
  lat: number;
  lng: number;
  count?: number;
  label?: string;
};

export type Values = {
  embedOption?: "map" | "report" | "both";
  platforms?: { id: string; name?: string };
  highlightCountry?: { id?: string; name?: string };
  state_name?: { id?: string; name?: string };
  colorScheme?: ColorScheme;
  width?: number;
  height?: number;
  reportItems?: ReportItem[];
};

export type AnalyticData = {
  analyticName?: string;
};

export type ReportsResponse = {
  impressions?: number;
  sessions?: number;
  pofs?: number;
  locations?: LocationItem[];
};

export interface AnalyticEmbedProps {
  values: Values;
  isEmbed?: boolean;
  analyticData?: AnalyticData;
}
