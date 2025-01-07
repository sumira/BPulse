import { NextRequest, NextResponse } from 'next/server';
import MQTTBackendService from '@/lib/mqtt';

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const mqtt = MQTTBackendService.getInstance();
    const temperature = mqtt.getTopicValue('bpulse/temperature');
    const voltage = mqtt.getTopicValue('bpulse/voltage');
    const current = mqtt.getTopicValue('bpulse/current');

    // if (temperature === undefined || voltage === undefined || current === undefined) {
    //   return NextResponse.json(
    //     { error: 'Topic data not found' }
    //   );
    // }

    return NextResponse.json({ temperature, voltage, current });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}