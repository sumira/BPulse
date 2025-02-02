import { NextResponse } from 'next/server';
import MQTTBackendService from '@/lib/mqtt';
import { connectDB } from '@/lib/db';
import { Reading } from '@/models/reading';

export async function GET() {
  try {
    await connectDB();
    const mqtt = MQTTBackendService.getInstance();
    
    const temperature = mqtt.getTopicValue('bpulse/temperature');
    const voltage = mqtt.getTopicValue('bpulse/voltage');
    const current = mqtt.getTopicValue('bpulse/current');
    const status = mqtt.getTopicValue('bpulse/status');

    await Reading.create({
      temperature,
      voltage,
      current,
      status,
      timestamp: new Date()
    });

    const latestReading = await Reading.findOne()
      .sort({ timestamp: -1 })
      .select('temperature voltage current status timestamp');

    return NextResponse.json(latestReading);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { status } = await request.json();
    const mqtt = MQTTBackendService.getInstance();
    
    if (status !== 'start' && status !== 'stop') {
      return NextResponse.json(
        { error: 'Invalid status. Must be "start" or "stop"' },
        { status: 400 }
      );
    }

    mqtt.publishToTopic('bpulse/status', status);

    return NextResponse.json({ 
      message: `Published status: ${status}`,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Error publishing status:', error);
    return NextResponse.json(
      { error: 'Failed to publish status' },
      { status: 500 }
    );
  }
}