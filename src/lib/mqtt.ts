import mqtt, { IClientOptions, MqttClient } from 'mqtt';

class MQTTBackendService {
  private static instance: MQTTBackendService;
  private client: MqttClient;
  private topicData: Map<string, string> = new Map();

  private constructor() {
    const options: IClientOptions = {
      protocol: "wss",
      username: "node",
      password: "ndm9897",
    };

    this.client = mqtt.connect(
      "wss://29e69e59ef7d4c5eb41e2507cb41dfc7.s1.eu.hivemq.cloud:8884/mqtt", 
      options
    );
    this.setupMQTT();
  }

  private setupMQTT() {
    this.client.on('connect', () => {
      console.log('Backend MQTT Connected');
      this.subscribeToTopics();
    });

    this.client.on('message', (topic, message) => {
      this.topicData.set(topic, message.toString());
    });
  }

  public publishToTopic(topic: string, message: string) {
    try {
      console.log('Publishing to topic:', topic);
      if (!this.client.connected) {
        throw new Error('MQTT client not connected');
      }

      const options = {
        qos: 1 as 0 | 1 | 2,
        retain: false
      };

      this.client.publish(topic, message, options, (error) => {
        if (error) {
          console.error(`Error publishing to ${topic}:`, error);
        } else {
          console.log(`Published to ${topic}: ${message}`);
        }
      });
    } catch (error) {
      console.error('Error in publishToTopic:', error);
      throw error;
    }
  }

  private subscribeToTopics() {
    const topics = [
      'bpulse/status',
      'bpulse/temperature',
      'bpulse/voltage',
      'bpulse/current'
    ];
    topics.forEach(topic => this.client.subscribe(topic));
  }

  public getTopicValue(topic: string) {
    return this.topicData.get(topic);
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new MQTTBackendService();
    }
    return this.instance;
  }
}

export default MQTTBackendService;