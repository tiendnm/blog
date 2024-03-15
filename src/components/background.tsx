"use client";
import { CustomThreeJsRender } from "@/lib/custom-three-js";
import { useTheme } from "@/providers/theme";
import { useEffect, useRef } from "react";

//Function Component
export default function ThreeJSBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const threeRef = useRef<CustomThreeJsRender | null>(null);
  const { darkMode } = useTheme();
  useEffect(() => {
    threeRef.current?.changeTheme(darkMode);
  }, [darkMode]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const canvas = canvasRef.current;
      const threejs = new CustomThreeJsRender({ canvas, darkMode });
      threeRef.current = threejs;
      threejs.init();
      return () => {
        threeRef.current = null;
        threejs.dispose();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas className="fixed top-0 left-0" ref={canvasRef}></canvas>;
}
