import { createContext, useContext, useEffect, useState } from "react";

const ViewportContext = createContext();

function getViewportCategory(width) {
  if (width < 745) return "mobile";
  if (width < 950) return "tablet";
  return "desktop";
}

export function ViewportProvider({ children }) {
  const [viewport, setViewport] = useState(() =>
    getViewportCategory(window.innerWidth)
  );

  useEffect(() => {
    const handleResize = () =>
      setViewport(getViewportCategory(window.innerWidth));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ViewportContext.Provider value={{ viewport }}>
      {children}
    </ViewportContext.Provider>
  );
}

export function useViewport() {
  return useContext(ViewportContext);
}
