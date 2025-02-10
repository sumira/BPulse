import { NextResponse } from 'next/server';
import { Reading } from '@/models/reading';
import { connectDB } from '@/lib/db';
import MQTTBackendService from '@/lib/mqtt';

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

        const readings = await Reading.aggregate([
            {
                $match: {
                    timestamp: {
                        $gte: new Date(Date.now() - 60 * 60 * 1000) 
                    }
                }
            },
            {
                $group: {
                    _id: {
                        $toDate: {
                            $subtract: [
                                { $toLong: "$timestamp" },
                                { $mod: [{ $toLong: "$timestamp" }, 5 * 60 * 1000] }
                            ]
                        }
                    },
                    temperature: { $avg: "$temperature" },
                    voltage: { $avg: "$voltage" },
                    current: { $avg: "$current" }
                }
            },
            {
                $sort: { "_id": -1 }
            },
            {
                $limit: 12 
            }
        ]);

        const formattedData = readings
            .map(reading => {
                const temp = reading.temperature ? Number(reading.temperature.toFixed(2)) : 0;
                const volt = reading.voltage ? Number(reading.voltage.toFixed(2)) : 0;
                const curr = reading.current ? Number(reading.current.toFixed(2)) : 0;

                return {
                    temperature: temp,
                    voltage: volt,
                    current: curr,
                    timestamp: reading._id
                };
            })
            .filter(reading => 
                reading.temperature !== null && 
                reading.voltage !== null && 
                reading.current !== null
            )
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