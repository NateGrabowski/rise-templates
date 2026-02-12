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

function detectInitialMode(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "lite") return true;
    if (stored === "full") return false;
  } catch {
    // localStorage may be restricted by Group Policy in VDI environments
  }
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
