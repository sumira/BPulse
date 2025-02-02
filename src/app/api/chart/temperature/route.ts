import { NextResponse } from 'next/server';
import { Reading } from '@/models/reading';
import { connectDB } from '@/lib/db';

export async function GET() {   

    try {
        await connectDB();
        const readings = await Reading.find().sort({ timestamp: -1 }).limit(10);
        return NextResponse.json(readings);
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
        );
    }
}