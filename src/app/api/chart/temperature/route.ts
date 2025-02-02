import { NextResponse } from 'next/server';
import { Reading } from '@/models/reading';
import { connectDB } from '@/lib/db';

export async function GET() {   

    try {
        await connectDB();
        const readings = await Reading.find().sort({ timestamp: -1 }).limit(10);
        const data = readings.map((reading) => ({temperature: reading.temperature, timestamp: reading.timestamp})).reverse();
        


        return NextResponse.json({ data });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
        );
    }
}