"use client";
import React, { useRef, useEffect, useState, memo } from "react";

// export default function Threed() {
//   return (
//     <Spline scene="https://prod.spline.design/LgYxjBYA3hz0em38/scene.splinecode" />
//   );
// }

interface SplineViewerProps {
  url?: string;
  eventsTarget: "global" | "local";
}

const SplineViewer1: React.FC<SplineViewerProps> = ({ url, eventsTarget }) => {
  const viewerRef = useRef<HTMLDivElement | null>(null);
  const defaultUrl =
    "https://prod.spline.design/4V-oxtujrIuucDuA/scene.splinecode";
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.defer = true;
    script.src = "https://unpkg.com/@splinetool/viewer/build/spline-viewer.js";
    script.onload = () => {
      if (viewerRef.current?.children.length === 0 && isMounted) {
        const viewer = document.createElement("spline-viewer");
        viewer.setAttribute("url", url || defaultUrl);
        viewer.setAttribute("events-target", eventsTarget);
        viewerRef.current.appendChild(viewer);

        viewerRef.current.children[0].shadowRoot
          ?.querySelectorAll("#logo")[0]
          ?.remove();
      }

      document.getElementById("logo")?.remove();
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [url, eventsTarget, isMounted]);

  return <div ref={viewerRef} />;
};

export { SplineViewer1 };
