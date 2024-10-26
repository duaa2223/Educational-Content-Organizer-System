import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import WeeklyCompetition from '@/models/weeklyCompetition';
import Users from '@/models/users';
export async function POST(req) {
    await connectDB();
    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    const newCompetition = new WeeklyCompetition({
        startDate,
        endDate,
        isActive: true
    });
    await newCompetition.save();
    await Users.updateMany({}, { $set: { weeklyPoints: 0 } });
    return NextResponse.json({ message: 'Competition started successfully' });
}

