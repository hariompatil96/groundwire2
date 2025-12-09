"use client";

import { useState, useEffect, useMemo } from "react";
import { usePost } from "@/utils/hooks/useApi";
import { API_ROUTES } from "@/constants/api";
import { queryClient } from "@/app/App";
import { Values } from "./AnalyticTypes";

export const useAnalyticEmbed = (values: Values) => {
  const [reports, setReports] = useState({});
  const [showFilter, setShowFilter] = useState(false);
  const [isFullscreenMap, setIsFullscreenMap] = useState(false);

  const today = new Date();
  const [currentFilter, setCurrentFilter] = useState({
    type: "currentMonth",
    startDate: new Intl.DateTimeFormat("en-US").format(
      new Date(today.getFullYear(), today.getMonth(), 1)
    ),
    endDate: new Intl.DateTimeFormat("en-US").format(today),
  });

  const { mutate: reportsMutate } = usePost(
    API_ROUTES.getReports,
    {
      onSuccess: (data: any) => {
        queryClient.invalidateQueries({ queryKey: ["get-reports"] });
        if (data?.result?.status) setReports(data?.result?.totals || {});
        else setReports(data?.result || {});
      },
      onError: (err: any) => console.error("Reports error:", err),
    },
    {},
    true
  );

  const buildPayload = (filter = currentFilter) => {
    const payload: any = {
      startDate: filter.startDate,
      endDate: filter.endDate,
      platform:
        values?.platforms?.id === "All"
          ? ""
          : values?.platforms?.name?.toLowerCase(),
      isMap: values?.embedOption !== "report",
      highlightCountry: values?.highlightCountry?.id,
    };

    if (values?.highlightCountry?.id === "United States") {
      payload.state_name = values?.state_name?.id;
    }

    return payload;
  };

  const handleFilterChange = (filter: any) => {
    setCurrentFilter({
      type: filter.type,
      startDate: filter.startDate,
      endDate: filter.endDate,
    });
    reportsMutate(buildPayload(filter));
  };

  useEffect(() => {
    reportsMutate(buildPayload());
  }, [
    values?.platforms?.id,
    values?.embedOption,
    values?.highlightCountry?.id,
    values?.state_name?.id,
    currentFilter.startDate,
    currentFilter.endDate,
  ]);

  const handleCloseFullscreen = () => {
    if (document.exitFullscreen) document.exitFullscreen();
    else if ((document as any).webkitExitFullscreen)
      document.webkitExitFullscreen();

    setIsFullscreenMap(false);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    const onFsChange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreenMap(false);
        document.body.style.overflow = "";
      }
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const resolvedWidth = Math.max(values?.width || 600, 300);
  const resolvedHeight = Math.max(values?.height || 600, 400);
  const selectedReports = useMemo(() => values?.reportItems || [], [values]);

  return {
    reports,
    showFilter,
    setShowFilter,
    isFullscreenMap,
    setIsFullscreenMap,
    selectedReports,
    resolvedWidth,
    resolvedHeight,
    currentFilter,
    handleFilterChange,
    handleCloseFullscreen,
  };
};
