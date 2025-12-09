import React from "react";
import {
  Language as LanguageIcon,
  PlayCircleOutline as PlayCircleOutlineIcon,
  Church as ChurchIcon,
} from "@mui/icons-material";

import { ReportsResponse } from "./AnalyticTypes";

export const AnalyticIcons: Record<
  string,
  {
    icon: React.ReactNode;
    key: keyof ReportsResponse;
  }
> = {
  Impressions: {
    icon: <LanguageIcon fontSize="medium" className="text-primary" />,
    key: "impressions",
  },
  "Website Views": {
    icon: <PlayCircleOutlineIcon fontSize="medium" className="text-primary" />,
    key: "sessions",
  },
  "Professions of Faith": {
    icon: <ChurchIcon fontSize="medium" className="text-primary" />,
    key: "pofs",
  },
};
