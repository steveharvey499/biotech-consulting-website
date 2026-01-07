"use client";

import { useEffect, useRef } from "react";

const HubSpotMeetingWidget = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const meetingUrl = process.env.NEXT_PUBLIC_HUBSPOT_MEETING_URL;

  useEffect(() => {
    if (!meetingUrl || !containerRef.current) {
      return;
    }

    // Create iframe for HubSpot meeting scheduler
    const iframe = document.createElement("iframe");
    iframe.src = meetingUrl;
    iframe.style.width = "100%";
    iframe.style.minHeight = "650px";
    iframe.style.border = "none";
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allow", "camera; microphone");

    containerRef.current.appendChild(iframe);

    return () => {
      // Cleanup: remove iframe on unmount
      if (containerRef.current && containerRef.current.contains(iframe)) {
        containerRef.current.removeChild(iframe);
      }
    };
  }, [meetingUrl]);

  if (!meetingUrl) {
    return (
      <div className="text-center py-12">
        <p className="text-navy-700">
          Meeting scheduler is not configured. Please set{" "}
          <code className="bg-navy-100 px-2 py-1 rounded">
            NEXT_PUBLIC_HUBSPOT_MEETING_URL
          </code>{" "}
          environment variable.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full min-h-[650px] rounded-lg overflow-hidden"
    />
  );
};

export default HubSpotMeetingWidget;

