import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Users from '@/models/users';
import Coupon from '@/models/coupons';
import { authMiddleware } from '@/middlewares/auth';
export const GET = authMiddleware(async (req) => {
    try {
        await connectDB();
        const userId = req.url.split('/').pop();

        const user = await Users.findById(userId).populate('coupons');

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        // Filter out expired coupons
        const validCoupons = user.coupons.filter(coupon => new Date(coupon.validUntil) > new Date());

        return NextResponse.json({ coupons: validCoupons });
    } catch (error) {
        console.error('Error fetching coupons:', error);
        return NextResponse.json({ message: 'Error fetching coupons' }, { status: 500 });
    }
});