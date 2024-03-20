"use client";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
const Loader = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <div
      className={cn([
        "z-50",
        "bg-gradient-transform",
        "h-full w-full",
        "flex items-center justify-center",
        "fixed top-0 left-0",
        !loading ? "invisible" : "visible",
      ])}
    >
      <div className="absolute h-20 w-20">
        <div
          className={cn(
            styles.loaderWrapper,
            "transition-all",
            !loading ? "opacity-0" : "opacity-100"
          )}
        >
          <div className={styles.loaderInner}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Loader;
