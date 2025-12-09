"use client";

import React, { useState } from "react";
import { Close, FilterAlt, Menu as MenuIcon } from "@mui/icons-material";
import DateFilter from "./DateFilter";
import MapComponent from "./MapComponent";
import { formatNumber } from "@/app/(control-panel)/dashboard/shared-components/common";
import styles from "./AnalyticEmbed2.module.css";
import AnalyticFooter from "@/components/analitic-embed/AnalyticFooter";
import { AnalyticIcons } from "./AnalyticIcons";
import { AnalyticEmbedProps } from "./AnalyticTypes";
import { useAnalyticEmbed } from "./useAnalyticEmbed";

const AnalyticEmbed2: React.FC<AnalyticEmbedProps> = ({
  values,
  analyticData,
}) => {
  const [showLeftBar, setShowLeftBar] = useState(false);
  const {
    reports,
    selectedReports,
    resolvedWidth,
    resolvedHeight,
    currentFilter,
    handleFilterChange,
    showFilter,
    setShowFilter,
  } = useAnalyticEmbed(values, analyticData);

  return (
    <div
      className={`
        py-0 my-0 mx-auto rounded-xl relative w-full overflow-hidden box-border
        min-w-[300px] min-h-[400px]
        ${values?.colorScheme === "light" ? "light-mode" : "dark-mode"}
      `}
      style={{
        maxWidth: resolvedWidth,
        height: resolvedHeight,
      }}
    >
      <button
        className={styles["toggle-button"]}
        onClick={() => setShowLeftBar(!showLeftBar)}
      >
        {showLeftBar ? <Close /> : <MenuIcon />}
      </button>

      <div
        className={`
          ${styles["left-bar"]}
          ${showLeftBar ? styles.show : ""}
          p-2 flex flex-col gap-2
          overflow-y-auto
          ${values?.colorScheme === "light" ? "bg-white text-black" : "bg-gray-800 text-white"}
        `}
      >
        <h5 className="text-sm justify-center font-semibold">
          {analyticData?.analyticName}
        </h5>

        {showFilter && (
          <DateFilter
            onFilterChange={handleFilterChange}
            currentFilter={currentFilter.type}
          />
        )}

        <button
          onClick={() => setShowFilter(!showFilter)}
          className="inline-flex items-center gap-2 px-3 py-0.5 rounded-md bg-teal-100 text-teal-700 mx-auto text-xs"
        >
          <FilterAlt /> Filters
        </button>

        {selectedReports.map((report) => {
          const iconConfig = AnalyticIcons[report.name];
          if (!iconConfig) return null;

          const value = reports?.[iconConfig.key] ?? 0;

          return (
            <div
              key={report.id}
              className="border rounded-lg text-teal-700 p-1 flex flex-col text-center"
            >
              <div className="flex justify-center items-center">
                {iconConfig.icon}
              </div>

              <span
                className={`text-xs ${values?.colorScheme === "light" ? "text-black" : "text-white"
                  }`}
              >
                {report.name}
              </span>
              <span className="text-sm font-bold">{formatNumber(value)}</span>
            </div>
          );
        })}

        <AnalyticFooter />
      </div>

      <div className={styles["map-area"]}>
        <MapComponent
          locations={reports?.locations || []}
          highlightCountry={values?.highlightCountry?.name}
          highlightUSState={values?.state_name?.name}
          isDarkMode={values?.colorScheme === "dark"}
          mapHeight={`${resolvedHeight}px`}
        />
      </div>
    </div>
  );
};

export default AnalyticEmbed2;
