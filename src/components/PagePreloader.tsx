import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const PagePreloader = () => {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setVisible(true);
    setFadeOut(false);

    const fadeTimer = setTimeout(() => setFadeOut(true), 600);
    const hideTimer = setTimeout(() => setVisible(false), 1000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-background transition-opacity duration-400 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-4">
        {/* POS Terminal Icon */}
        <div className="relative w-16 h-20">
          <div className="absolute inset-0 rounded-lg border-2 border-primary/60 bg-primary/10 animate-pulse" />
          <div className="absolute top-2 left-2 right-2 h-6 rounded-sm bg-primary/20 animate-pulse" style={{ animationDelay: "0.2s" }} />
          <div className="absolute bottom-2 left-3 right-3 flex gap-1 justify-center">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-primary animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
        {/* Loading bar */}
        <div className="w-24 h-1 rounded-full bg-muted overflow-hidden">
          <div className="h-full bg-primary rounded-full animate-[loading_0.8s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
};

export default PagePreloader;
