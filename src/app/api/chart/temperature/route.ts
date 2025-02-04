import { NextResponse } from 'next/server';
import { Reading } from '@/models/reading';
import { connectDB } from '@/lib/db';

interface TemperatureReading {
    temperature: number;
    timestamp: string;
}

export async function GET() {   
    try {
        await connectDB();
        const readings = await Reading.find()
            .select('temperature timestamp -_id')
            .sort({ timestamp: -1 })
            .limit(10);

        const formattedData = readings
            .map((reading): TemperatureReading => ({
                temperature: reading.temperature,
                timestamp: reading.timestamp
            }))
            .reverse();

        return NextResponse.json({
            data: {
                temperature: formattedData.map(d => d.temperature),
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