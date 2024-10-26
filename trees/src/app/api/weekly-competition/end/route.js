import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import WeeklyCompetition from '@/models/weeklyCompetition';
import Users from '@/models/users';
import Coupon from '@/models/coupons';
export async function POST(req) {
    await connectDB();
    const competition = await WeeklyCompetition.findOne({ isActive: true });
    if (!competition) {
        return NextResponse.json({ message: 'No active competition found' }, { status: 400 });
    }
    competition.isActive = false;
    competition.endDate = new Date();
    await competition.save();
    const topUsers = await Users.find().sort('-weeklyPoints').limit(3);
    const discounts = [25, 15, 10];
    for (let i = 0; i < topUsers.length; i++) {
        const user = topUsers[i];
        const coupon = new Coupon({
            code: `ECO${i + 1}${Date.now().toString().slice(-6)}`,
            discount: discounts[i],
            validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            issuedTo: user._id
        });
        await coupon.save();
        user.coupons.push(coupon._id);
        await user.save();
    }
    return NextResponse.json({ message: 'Competition ended successfully' });
}