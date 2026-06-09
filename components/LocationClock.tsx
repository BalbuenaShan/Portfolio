"use client";

import { useEffect, useState } from "react";

interface TimeData {
  time: string;
}

export default function LocationClock() {
  const [timeData, setTimeData] = useState<TimeData>({
    time: "",
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      // Format time for Davao/Philippines timezone (Asia/Manila) using 24-hour clock
      const formatter = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Manila",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      const timeStr = formatter.format(now);

      setTimeData({ time: timeStr });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-3xl items-center justify-between text-sm text-foreground/80">
      <div className="font-medium text-muted-foreground">Davao, PH</div>

      <div className="font-coolvetica text-accent text-base font-semibold">
        Jazrel Shan Kurvy Balbuena
      </div>

      <div className="font-medium text-muted-foreground">{timeData.time}</div>
    </div>
  );
}
