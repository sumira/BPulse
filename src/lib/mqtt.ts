import mqtt, { IClientOptions, MqttClient } from 'mqtt';

interface MQTTConfig {
  onConnect?: () => void;
  onMessage?: (topic: string, message: Buffer) => void;
  onError?: (error: Error) => void;
}

export function createMQTTConnection(config: MQTTConfig): MqttClient {
  const brokerUrl = "wss://29e69e59ef7d4c5eb41e2507cb41dfc7.s1.eu.hivemq.cloud:8884/mqtt";
  const options: IClientOptions = {
    protocol: "wss",
    username: "node",
    password: "ndm9897",
  };

  const client = mqtt.connect(brokerUrl, options);

  client.on("connect", () => {
    console.log("Connected to HiveMQ Cloud");
    config.onConnect?.();
  });

  client.on("message", (topic, message) => {
    config.onMessage?.(topic, message);
  });

  client.on("error", (error) => {
    config.onError?.(error);
  });

  return client;
}