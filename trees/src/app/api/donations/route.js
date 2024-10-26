import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import Donation from '../../../models/donations';

// POST request for creating a donation
export async function POST(req) {
  try {
    const body = await req.json();
    
    await connectDB();

    const donation = await Donation.create(body);
    return NextResponse.json({ success: true, data: donation }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// GET request to fetch all donations
export async function GET() {
  try {
    await connectDB();

    const donations = await Donation.find({});
    return NextResponse.json({ success: true, data: donations }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
