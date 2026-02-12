"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { MotionConfig } from "motion/react";

const STORAGE_KEY = "performance-mode";

function detectInitialMode(): boolean {
  if (typeof window === "undefined") return false;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "lite") return true;
  if (stored === "full") return false;
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
  const mountedRef = useRef(false);

  // Sync data attribute and localStorage on mount and whenever isLite changes
  useEffect(() => {
    mountedRef.current = true;
    document.documentElement.setAttribute(
      "data-performance",
      isLite ? "lite" : "full",
    );
    localStorage.setItem(STORAGE_KEY, isLite ? "lite" : "full");
  }, [isLite]);

  const toggleMode = useCallback(() => {
    setIsLite((prev) => !prev);
  }, []);

  const value = useMemo(() => ({ isLite, toggleMode }), [isLite, toggleMode]);

  return (
    <PerformanceContext.Provider value={value}>
      <MotionConfig reducedMotion={isLite ? "always" : "user"}>
        {children}
      </MotionConfig>
    </PerformanceContext.Provider>
  );
}
