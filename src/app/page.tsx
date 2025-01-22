import { useUserStore } from "@/store/userStore";
("use client");

import { useEffect, useState, useRef } from "react";
import { GaugeMeter } from "./Components/guage-meter";
import { Battery, Thermometer, Zap } from "lucide-react";
import { StartMenu } from "./Components/start-menu";

export default function Home() {
  //const [connectionStatus, setConnectionStatus] = useState("Disconnected");
  const [temperature, setTemperature] = useState(0);
  const [voltage, setVoltage] = useState(0);
  const [current, setCurrent] = useState(0);
  // const [current, setCurrent] = useState<number | null>(null);

  const [currentTime, setCurrentTime] = useState(new Date());
  const [elapsedTime, setElapsedTime] = useState(0);
  const startTime = useRef(new Date());
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const { userId, deviceId, setUserId, setDeviceId } = useUserStore();

  const handleStartMenuSubmit = () => {
    if (userId && deviceId) {
      console.log("User ID:", userId && "Device ID:", userId, deviceId);
    }
  };

  useEffect(() => {
    try {
      //endpoint for fetching temperature data
      const fetchData = async () => {
        try {
          console.log("Fetching data...");
          console.log(`Current User ID: ${userId}, Device ID: ${deviceId}`);

          const response = await fetch("/api/mqtt/data");
          const data = await response.json();
          setTemperature(data.temperature);
          setVoltage(data.voltage);
          setCurrent(data.current);

          console.log(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      timerRef.current = setInterval(() => {
        setCurrentTime(new Date());
        setElapsedTime(
          Math.floor(
            (new Date().getTime() - startTime.current.getTime()) / 1000
          )
        );
      }, 1000);

      const interval = setInterval(fetchData, 1000);
      return () => clearInterval(interval);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  }, [userId, deviceId]);

  const formatElapsedTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <StartMenu
        userId={userId}
        deviceId={deviceId}
        setUserId={setUserId}
        setDeviceId={setDeviceId}
        onSubmit={handleStartMenuSubmit}
      />
      <div className="flex flex-1 flex-col md:flex-row bg-gray-50">
        <aside className="w-full md:w-64 bg-white shadow-md p-4 border-r">
          <h1 className="text-2xl font-bold mb-2">BPulse Device</h1>

          {/* <div className="flex items-center space-x-2">
            <div
              className={`w-3 h-3 rounded-full ${
                connectionStatus === "Connected" ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <p className="text-gray-600">Status: {connectionStatus}</p>
          </div> */}

          <div className="mb-6 space-y-2 py-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Current Time:</span>
              <span className="font-mono">
                {currentTime.toLocaleTimeString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Elapsed Time:</span>
              <span className="font-mono">
                {formatElapsedTime(elapsedTime)}
              </span>
            </div>
          </div>
        </aside>

        <main className="flex-1 px-3 py-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <GaugeMeter
                minValue={0}
                maxValue={24}
                value={voltage}
                description="Battery Voltage"
                title="Battery"
                icon={Battery}
              />
              <GaugeMeter
                minValue={0}
                maxValue={12}
                value={current}
                description="Battery Discharge Current"
                title="Current"
                icon={Zap}
              />
              <GaugeMeter
                minValue={0}
                maxValue={100}
                value={temperature}
                description="Battery Temperature"
                title="Temperature"
                icon={Thermometer}
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
