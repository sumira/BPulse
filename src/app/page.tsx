"use client";
import { useEffect, useState } from "react";
import mqtt, { IClientOptions } from "mqtt";
import { GaugeMeter } from "./Components/guage-meter";

export default function Home() {
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");
  const [messages, setMessages] = useState<string[]>([]);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const brokerUrl =
      "wss://29e69e59ef7d4c5eb41e2507cb41dfc7.s1.eu.hivemq.cloud:8884/mqtt";
    const options: IClientOptions = {
      protocol: "wss",
      username: "node",
      password: "ndm9897",
    };

    try {
      const mqttClient = mqtt.connect(brokerUrl, options);

      mqttClient.on("connect", () => {
        console.log("Connected to HiveMQ Cloud");
        setConnectionStatus("Connected");

        mqttClient.subscribe("test/topic", (err) => {
          if (!err) {
            console.log("Subscribed successfully");
          }
        });
      });

      mqttClient.on("error", (err) => {
        console.error("Connection error:", err);
        setConnectionStatus("Error");
      });

      mqttClient.on("message", (topic, message) => {
        setMessages((prev) => [...prev, message.toString()]);
        console.log("Received message:", message.toString());
        setValue(parseInt(message.toString()));
      });

      //setClient(mqttClient);

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
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">MQTT Connection Status</h1>
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
  );
}
