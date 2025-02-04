import { NextResponse } from 'next/server';
import { Reading } from '@/models/reading';
import { connectDB } from '@/lib/db';
import MQTTBackendService from '@/lib/mqtt';

interface DataReading {
    temperature: number;
    voltage: number;
    current: number;
    timestamp: string;
}

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

        const readings = await Reading.find()
            .select('temperature voltage current timestamp -_id')
            .sort({ timestamp: -1 })
            .limit(10);

        const formattedData = readings
            .map((reading): DataReading => ({
                temperature: reading.temperature,
                voltage: reading.voltage,
                current: reading.current,
                timestamp: reading.timestamp
            }))
            .reverse();

        return NextResponse.json({
            data: {
                temperature: formattedData.map(d => d.temperature),
                voltage: formattedData.map(d => d.voltage),
                current: formattedData.map(d => d.current),
                timestamp: formattedData.map(d => d.timestamp)
            }
        });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}