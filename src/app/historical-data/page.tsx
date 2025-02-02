"use client";
import { useEffect, useState } from "react";
import TempChart from "../Components/temperature-chart";

export default function Home() {
  const [temperatures, setTemperatures] = useState<number[]>([]);
  const [timestamps, setTimestamps] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/chart/temperature");
        const data = await response.json();
        setTemperatures(data.temperatures);
        setTimestamps(
          data.timestamps.map((t: string) => new Date(t).toLocaleTimeString())
        );
      } catch (error) {
        console.error("Error fetching temperature data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main>
      <TempChart temperatures={temperatures} timestamps={timestamps} />
    </main>
  );
}
