import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Users from '@/models/users';
export async function GET(req) {
    try {
        await connectDB();
        const users = await Users.find({})
            .select('name weeklyPoints points registeredEvents')
            .sort({ weeklyPoints: -1 });
        const leaderboardData = users.map((user, index) => ({
            _id: user._id.toString(),
            name: user.name,
            weeklyPoints: user.weeklyPoints,
            points: user.points,
            registeredEvents: user.registeredEvents ? user.registeredEvents.length : 0,
            rank: index + 1
        }));
        return NextResponse.json({ users: leaderboardData });
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        return NextResponse.json({ message: 'Error fetching leaderboard' }, { status: 500 });
    }
}