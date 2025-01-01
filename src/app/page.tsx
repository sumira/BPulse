"use client";

import { useEffect, useState, useRef } from "react";
import { createMQTTConnection } from "@/lib/mqtt";
import { GaugeMeter } from "./Components/guage-meter";
import { Battery, Thermometer, Zap } from "lucide-react";

export default function Home() {
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");
  const [messages, setMessages] = useState<string[]>([]);
  const [value, setValue] = useState(0);

  const [currentTime, setCurrentTime] = useState(new Date());
  const [elapsedTime, setElapsedTime] = useState(0);
  const startTime = useRef(new Date());

  useEffect(() => {
    try {
      const mqttClient = createMQTTConnection({
        onConnect: () => setConnectionStatus("Connected"),
        onMessage: (topic, message) => {
          setMessages((prev) => [...prev, message.toString()]);
          setValue(parseInt(message.toString()));
        },
        onError: (error) => {
          console.error("MQTT Error:", error);
          setConnectionStatus("Error");
        },
      });

      return () => {
        mqttClient.end();
      };

      return () => clearInterval(timer);
    } catch (err) {
      if (err instanceof Error) {
        console.error("Failed to connect:", err.message);
        setConnectionStatus("Connection Failed");
      }
    }
  }, []);

  const timer = setInterval(() => {
    setCurrentTime(new Date());
    setElapsedTime(
      Math.floor((new Date().getTime() - startTime.current.getTime()) / 1000)
    );
  }, 1000);

  const formatElapsedTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white shadow-md p-6 border-r">
        <h1 className="text-2xl font-bold mb-6">BPulse Device</h1>

        <div className="flex items-center space-x-2">
          <div
            className={`w-3 h-3 rounded-full ${
              connectionStatus === "Connected" ? "bg-green-500" : "bg-red-500"
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
            <span className="font-mono">{formatElapsedTime(elapsedTime)}</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Gauge Meters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <GaugeMeter
              minValue={0}
              maxValue={24}
              value={value}
              description="Battery Voltage"
              title="Battery"
              icon={Battery}
            />
            <GaugeMeter
              minValue={0}
              maxValue={12}
              value={value}
              description="Battery Discharge Current"
              title="Current"
              icon={Zap}
            />
            <GaugeMeter
              minValue={0}
              maxValue={100}
              value={value}
              description="Battery Temperature"
              title="Temperature"
              icon={Thermometer}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
