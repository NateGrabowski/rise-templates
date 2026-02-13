"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { MotionConfig } from "motion/react";

const STORAGE_KEY = "performance-mode";

function detectSoftwareRendering(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return false;
    const debugInfo = (gl as WebGLRenderingContext).getExtension(
      "WEBGL_debug_renderer_info",
    );
    if (!debugInfo) return false;
    const renderer = (gl as WebGLRenderingContext).getParameter(
      debugInfo.UNMASKED_RENDERER_WEBGL,
    );
    const softwareRenderers = [
      "swiftshader",
      "llvmpipe",
      "microsoft basic",
      "software rasterizer",
    ];
    return softwareRenderers.some((sr) =>
      (renderer as string).toLowerCase().includes(sr),
    );
  } catch {
    return false;
  }
}

function detectInitialMode(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "lite") return true;
    if (stored === "full") return false;
  } catch {
    // localStorage may be restricted by Group Policy in VDI environments
  }
  // WebGL software renderer is the strongest VDI detection signal
  if (detectSoftwareRendering()) return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

interface PerformanceContextValue {
  isLite: boolean;
  toggleMode: () => void;
}

const PerformanceContext = createContext<PerformanceContextValue>({
  isLite: false,
  toggleMode: () => {},
});

export function usePerformanceMode() {
  return useContext(PerformanceContext);
}

export function PerformanceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLite, setIsLite] = useState(detectInitialMode);
  const [mounted, setMounted] = useState(false);

  // Hydration guard: must re-render after mount to expose real isLite value (same pattern as next-themes)
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  // Sync data attribute and localStorage whenever isLite changes
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-performance",
      isLite ? "lite" : "full",
    );
    try {
      localStorage.setItem(STORAGE_KEY, isLite ? "lite" : "full");
    } catch {
      // localStorage may be restricted by Group Policy in VDI environments
    }
  }, [isLite]);

  const toggleMode = useCallback(() => {
    setIsLite((prev) => !prev);
  }, []);

  // Before mount, always report isLite=false to match SSR output (prevents hydration mismatch).
  // The CSS layer ([data-performance="lite"]) still hides heavy visuals immediately via useEffect.
  const exposedIsLite = mounted ? isLite : false;

  const value = useMemo(
    () => ({ isLite: exposedIsLite, toggleMode }),
    [exposedIsLite, toggleMode],
  );

  return (
    <PerformanceContext.Provider value={value}>
      <MotionConfig reducedMotion={exposedIsLite ? "always" : "user"}>
        {children}
      </MotionConfig>
    </PerformanceContext.Provider>
  );
}
