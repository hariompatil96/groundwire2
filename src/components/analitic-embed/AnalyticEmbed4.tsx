"use client";
import React, { useEffect, useRef, useState } from "react";
import { Close, FilterAlt } from "@mui/icons-material";
import DateFilter from "./DateFilter";
import MapComponent from "./MapComponent";
import { formatNumber } from "@/app/(control-panel)/dashboard/shared-components/common";
import { AnalyticEmbedProps } from "./AnalyticTypes";
import { AnalyticIcons } from "./AnalyticIcons";
import AnalyticFooter from "@/components/analitic-embed/AnalyticFooter";
import { useAnalyticEmbed } from "./useAnalyticEmbed";

const AnalyticEmbed4: React.FC<AnalyticEmbedProps> = ({
  values,
  isEmbed = false,
  analyticData,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const {
    reports,
  selectedReports,
  resolvedWidth,
  resolvedHeight,
  currentFilter,
  handleFilterChange,
  showFilter,
  setShowFilter,
  isFullscreenMap,
  handleCloseFullscreen,
  } = useAnalyticEmbed(values, analyticData);

  useEffect(() => {
    if (isEmbed) {
      document.body.style.backgroundColor =
        values?.colorScheme === "light" ? "white" : "#424242";
    }
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [isEmbed, values?.colorScheme]);

  return (
    <div
      className={` flex flex-col justify-start items-center max-w-[1200px] my-5 mx-auto
      ${
        !isEmbed
          ? `${values?.colorScheme === "light" ? "bg-white" : "bg-gray-800 text-white"} 
             rounded-xl`
          : `border border-dotted border-gray-300 rounded-xl 
             ${values?.colorScheme === "light" ? "bg-white" : "bg-gray-800 text-white"}`
      }`}
      style={{
        maxWidth: `${resolvedWidth}px`,
        width: "100%",
        height: `${resolvedHeight}px`,
        minWidth: "300px",
        minHeight: "400px",
      }}
    >
      <div className="w-full h-full overflow-auto px-0 mt-0">
        <div className="flex flex-col gap-6 mt-0">
          {(values?.embedOption === "map" ||
            values?.embedOption === "both") && (
            <div
              ref={mapContainerRef}
              className="relative w-full mt-0 px-0"
              aria-hidden={isFullscreenMap}
            >
              <div className="min-h-[300px] overflow-hidden rounded-t-xl shadow-lg border border-gray-200 bg-white dark:bg-gray-900">
                <MapComponent
                  locations={reports?.locations || []}
                  highlightCountry={values?.highlightCountry?.name}
                  highlightUSState={values?.state_name?.name}
                  isDarkMode={values?.colorScheme === "dark"}
                  mapHeight="400px"
                />
              </div>
            </div>
          )}

          {(values?.embedOption === "report" ||
            values?.embedOption === "both" ||
            values?.embedOption === "map") && (
            <div className="w-full flex justify-center">
              {showFilter && (
                <div className="w-full max-w-[900px] px-4">
                  <DateFilter
                    onFilterChange={handleFilterChange}
                    currentFilter={currentFilter.type}
                  />
                </div>
              )}
            </div>
          )}

          {(values?.embedOption === "report" ||
            values?.embedOption === "both" ||
            values?.embedOption === "map") && (
            <div className="w-full flex items-center justify-center p-2 px-6 gap-4">
              <h5 className="text-xl sm:text-2xl font-semibold tracking-tight text-center">
                {analyticData?.analyticName}{" "}
                {selectedReports?.find((r) => r?.id === 3)
                  ? "- Professions of Faith"
                  : ""}
              </h5>

              <button
                onClick={() => setShowFilter(!showFilter)}
                className="p-2 rounded-lg bg-gray-100 border border-gray-300 hover:bg-gray-200"
              >
                <FilterAlt
                  fontSize="medium"
                  className={showFilter ? "text-blue-600" : "text-gray-600"}
                />
              </button>
            </div>
          )}

          {(values?.embedOption === "report" ||
            values?.embedOption === "both" ||
            values?.embedOption === "map") && (
            <div className="w-full flex justify-center px-4">
              <div
                className={`grid gap-4 p-0 px-1 rounded-xl max-w-[900px] w-full`}
                style={{
                  gridTemplateColumns: `repeat(${selectedReports.length}, 1fr)`,
                }}
              >
                {selectedReports.length === 0 && (
                  <div className="w-full text-center text-sm text-gray-500 col-span-full">
                    No report items selected.
                  </div>
                )}

                {selectedReports.map((report) => {
                  const iconConfig = AnalyticIcons[report.name];
                  if (!iconConfig) return null;

                  const value = reports?.[iconConfig.key] || 0;

                  return (
                    <div
                      key={report.id}
                      className="border border-gray-200 rounded-lg p-2 flex flex-col gap-1 items-center"
                    >
                      <div className="flex h-15 w-15 items-center justify-center rounded-lg   text-teal-700 dark:text-white">
                        {iconConfig.icon}
                      </div>

                      <div className="flex flex-col">
                        <span className="text-sm px-2 font-bold break-words">
                          {report.name}
                        </span>
                        <span className="text-xl px-5 font-extrabold text-teal-700 tracking-tight">
                          {formatNumber(value)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <AnalyticFooter />
      </div>

      {isFullscreenMap && (
        <div className="fixed top-0 left-0 w-full h-full z-[9999] bg-white dark:bg-gray-800">
          <button
            onClick={handleCloseFullscreen}
            className="fixed top-2 right-2 w-10 h-10 bg-white rounded shadow flex items-center justify-center hover:bg-gray-200"
          >
            <Close className="text-gray-600" />
          </button>

          <div className="w-full h-full">
            <MapComponent
              locations={reports?.locations || []}
              highlightCountry={values?.highlightCountry?.name}
              highlightUSState={values?.state_name?.name}
              isDarkMode={values?.colorScheme === "dark"}
              mapHeight="100vh"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticEmbed4;
