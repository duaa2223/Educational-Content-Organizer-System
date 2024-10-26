import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import WeeklyCompetition from '@/models/weeklyCompetition';
export async function GET(req) {
    await connectDB();
    const competition = await WeeklyCompetition.findOne({ isActive: true });
    if (competition) {
        const now = new Date();
        const timeRemaining = Math.max(0, Math.floor((competition.endDate - now) / 1000));
        return NextResponse.json({ isActive: true, timeRemaining });
    } else {
        return NextResponse.json({ isActive: false, timeRemaining: 0 });
    }
}