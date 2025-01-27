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

    await Reading.create({
      temperature,
      voltage,
      current,
      timestamp: new Date()
    });

    const latestReading = await Reading.findOne()
      .sort({ timestamp: -1 })
      .select('temperature voltage current timestamp');

    return NextResponse.json(latestReading);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}