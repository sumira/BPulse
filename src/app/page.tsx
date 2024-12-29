"use client";
import { useEffect, useState } from "react";
import { createMQTTConnection } from "@/lib/mqtt";
import { GaugeMeter } from "./Components/guage-meter";
import { Battery, Thermometer, Zap } from "lucide-react";

export default function Home() {
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");
  const [messages, setMessages] = useState<string[]>([]);
  const [value, setValue] = useState(0);

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
    } catch (err) {
      if (err instanceof Error) {
        console.error("Failed to connect:", err.message);
        setConnectionStatus("Connection Failed");
      }
    }
  }, []);

  return (
    <>
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">
          BPulse Device Connection Status
        </h1>
        <p className="mb-4">Status: {connectionStatus}</p>
        <div className="mb-4">
          <h2 className="text-xl font-bold">Messages:</h2>
          {messages.map((message, index) => (
            <div key={index} className="p-2 border-b">
              {message}
            </div>
          ))}
        </div>
        <div className="mb-4s flex place-content-start p-3 gap-2">
          <GaugeMeter
            minValue={0}
            maxValue={24}
            value={value}
            description={"Battery Voltage"}
            title="Battery"
            icon={Battery}
          />
          <GaugeMeter
            minValue={0}
            maxValue={12}
            value={value}
            description={"Battery Discharge Current"}
            title="Current"
            icon={Zap}
          />
          <GaugeMeter
            minValue={0}
            maxValue={12}
            value={value}
            description={"Battery Temperature"}
            title="Temperature"
            icon={Thermometer}
          />
        </div>
      </main>
    </>
  );
}
