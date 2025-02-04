"use client";
import { useEffect, useState } from "react";
import TempChart from "../Components/temperature-chart";

const BPulseDashboard = () => {
  const [temperatureData, setTemperatureData] = useState([]);
  const [timestamps, setTimestamps] = useState([]);

  useEffect(() => {
    const fetchTemperatureData = async () => {
      try {
        const response = await fetch("api/chart/temperature");
        const result = await response.json();

        if (result.data) {
          setTemperatureData(result.data.temperature);
          setTimestamps(
            result.data.timestamp.map((ts: number) =>
              new Date(ts).toLocaleTimeString()
            )
          );
        }
      } catch (error) {
        console.error("Error fetching temperature data:", error);
      }
    };

    fetchTemperatureData();
    const interval = setInterval(fetchTemperatureData, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="p-4 w-2/3 h-1/4 mx-auto">
        <h2 className="text-xl font-bold mb-4">Temperature Chart</h2>
        <TempChart data={temperatureData} timestamps={timestamps} />
      </div>
    </>
  );
};

export default BPulseDashboard;
