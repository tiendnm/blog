"use client";
import { useTheme } from "@/providers/theme";
import GiscusReact from "@giscus/react";
import { useGiscusContext } from "./provider";

const GiscusClient = () => {
  const theme = useTheme();
  const giscus = useGiscusContext();
  if (!giscus.config) {
    return <></>;
  }
  return (
    <div className="mt-5">
      {theme.darkMode ? (
        <GiscusReact {...giscus.config} theme={"noborder_dark"} />
      ) : (
        <GiscusReact {...giscus.config} theme={"noborder_light"} />
      )}
    </div>
  );
};

export default GiscusClient;
