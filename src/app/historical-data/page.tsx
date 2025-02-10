"use client";
import { useEffect, useState } from "react";
import TempChart from "../Components/temperature-chart";
import CurrentChart from "../Components/current-chart";
import VoltageChart from "../Components/voltage-chart";

const BPulseDashboard = () => {
  const [temperatureData, setTemperatureData] = useState([]);
  const [CurrentData, setCurrentData] = useState([]);
  const [VoltageData, setVoltageData] = useState([]);
  const [timestamps, setTimestamps] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("api/chart/chart-data");
        const result = await response.json();

        if (result.data) {
          setTemperatureData(result.data.temperature);
          setCurrentData(result.data.current);
          setVoltageData(result.data.voltage);
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

    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="p-4 w-2/3 h-1/4 mx-auto">
        <h2 className="text-xl font-bold mb-4">Temperature Chart</h2>
        <div className="mb-6">
          <TempChart data={temperatureData} timestamps={timestamps} />
        </div>

        <h2 className="text-xl font-bold mb-4">Current Chart</h2>
        <div className="mb-6">
          <CurrentChart data={CurrentData} timestamps={timestamps} />
        </div>

        <h2 className="text-xl font-bold mb-4">Voltage Chart</h2>
        <div className="mb-6">
          <VoltageChart data={VoltageData} timestamps={timestamps} />
        </div>
      </div>
    </>
  );
};

export default BPulseDashboard;
