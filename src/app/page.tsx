"use client";
import { useEffect, useState, useRef } from "react";
import { GaugeMeter } from "./Components/guage-meter";
import { Battery, Thermometer, Zap } from "lucide-react";
import { FaPowerOff, FaPlay } from "react-icons/fa";

export default function Home() {
  const [connectionStatus, setConnectionStatus] = useState("stop");
  const [temperature, setTemperature] = useState(0);
  const [voltage, setVoltage] = useState(0);
  const [current, setCurrent] = useState(0);
  const [isRunning, setIsRunning] = useState(() => {
    const storedIsRunning = localStorage.getItem("isRunning");
    return storedIsRunning === "true" || false;
  });

  const [currentTime, setCurrentTime] = useState(new Date());
  const [elapsedTime, setElapsedTime] = useState(0);
  const startTime = useRef(new Date());
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const postConnectionStatus = async (status: string) => {
    try {
      console.log("Posting connection status...");
      const response = await fetch("/api/mqtt/status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        console.error("Failed to post connection status:", response.status);
        return null;
      }
      return await response.json();
    } catch (error) {
      console.error("Error posting connection status:", error);
      return null;
    }
  };

  useEffect(() => {
    try {
      const fetchDataAndUpdateStatus = async () => {
        try {
          console.log("Fetching data...");
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

      const startTimer = () => {
        startTime.current = new Date();
        timerRef.current = setInterval(() => {
          setCurrentTime(new Date());
          setElapsedTime(
            Math.floor(
              (new Date().getTime() - startTime.current.getTime()) / 1000
            )
          );
        }, 1000);
      };

      const stopTimer = () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      };

      if (isRunning) {
        startTimer();
      } else {
        stopTimer();
        setElapsedTime(0);
      }

      const interval = setInterval(fetchDataAndUpdateStatus, 5000);
      fetchDataAndUpdateStatus();

      return () => {
        clearInterval(interval);
        stopTimer();
      };
    } catch (err) {
      console.error("Error in useEffect:", err);
    }
  }, [isRunning]);

  useEffect(() => {
    localStorage.setItem("isRunning", String(isRunning));
  }, [isRunning]);

  const formatElapsedTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStartStop = async () => {
    const newStatus = !isRunning;
    setIsRunning(newStatus);
    const newConnectionStatus = newStatus ? "start" : "stop";
    setConnectionStatus(newConnectionStatus);
    console.log("Start/Stop:", newStatus);
    await postConnectionStatus(newConnectionStatus);
  };

  return (
    <>
      <div className="flex flex-1 flex-col md:flex-row bg-gray-50">
        <aside className="w-full md:w-64 bg-white shadow-md p-4 border-r">
          <h1 className="text-2xl font-bold mb-2">BPulse Device</h1>

          <div className="flex items-center space-x-2">
            <div
              className={`w-3 h-3 rounded-full ${
                connectionStatus === "start" ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <p className="text-gray-600">Status: {connectionStatus}</p>
          </div>

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

          <button
            onClick={handleStartStop}
            className={`flex items-center justify-center w-full p-2 rounded-md ${
              isRunning
                ? "bg-red-500 hover:bg-red-700 text-white"
                : "bg-green-500 hover:bg-green-700 text-white"
            }`}
          >
            {isRunning ? (
              <>
                <FaPowerOff className="mr-2" /> Stop
              </>
            ) : (
              <>
                <FaPlay className="mr-2" /> Start
              </>
            )}
          </button>
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
