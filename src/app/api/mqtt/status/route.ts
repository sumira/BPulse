import { NextResponse } from 'next/server';
import MQTTBackendService from '@/lib/mqtt';

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