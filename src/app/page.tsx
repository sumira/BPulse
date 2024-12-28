"use client";
import { useEffect, useState } from "react";
import { createMQTTConnection } from "@/lib/mqtt";
import { GaugeMeter } from "./Components/guage-meter";

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
        <div>
          <GaugeMeter
            minValue={0}
            maxValue={100}
            value={value}
            description={"Chart"}
            title="Battery"
          />
        </div>
      </main>
    </>
  );
}
