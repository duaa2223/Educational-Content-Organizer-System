// import dbConnect from '../../../lib/mongodb';
// import Coupon from '../../../models/coupons';
// import { authMiddleware } from '../../../middlewares/auth';

// async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method Not Allowed' });
//   }

//   await dbConnect();

//   try {
//     const { code } = req.body;
//     const userId = req.userId; // This comes from the authMiddleware
// console.log('id',userId)
//     const coupon = await Coupon.findOne({ code, issuedTo: userId, isUsed: false });

//     if (!coupon) {
//       return res.status(400).json({ message: 'Invalid or expired coupon' });
//     }

//     if (new Date(coupon.validUntil) < new Date()) {
//       return res.status(400).json({ message: 'Coupon has expired' });
//     }

//     return res.status(200).json({ coupon: { code: coupon.code, discount: coupon.discount } });
//   } catch (error) {
//     console.error('Error validating coupon:', error);
//     return res.status(500).json({ message: 'Server error' });
//   }
// }

// export default authMiddleware(handler);
////////////////////////////////////////////////////////////////////////////////////
// import dbConnect from '../../../lib/mongodb';
// import Coupon from '../../../models/coupons';
// import { authMiddleware } from '../../../middlewares/auth';

// export const POST = authMiddleware(async (req, res) => {
//   await dbConnect();

//   try {
//     const { code } = await req.json();
//     const userId = req.userId; // This comes from the authMiddleware

//     const coupon = await Coupon.findOne({ code, issuedTo: userId, isUsed: false });

//     if (!coupon) {
//       console.log('Coupon not found or does not match criteria:', { code, userId });
//       return new Response(JSON.stringify({ message: 'Invalid or expired coupon' }), {
//         status: 400,
//       });
//     }
    
//     if (new Date(coupon.validUntil) < new Date()) {
//       return new Response(JSON.stringify({ message: 'Coupon has expired' }), {
//         status: 400,
//       });
//     }

//     return new Response(
//       JSON.stringify({
//         coupon: { code: coupon.code, discount: coupon.discount },
//       }),
//       {
//         status: 200,
//       }
//     );
//   } catch (error) {
//     console.error('Error validating coupon:', error);
//     return new Response(JSON.stringify({ message: 'Server error' }), {
//       status: 500,
//     });
//   }
// });
////////////////////////////////////////////////
import dbConnect from '../../../lib/mongodb';
import Coupon from '../../../models/coupons';
import { authMiddleware } from '../../../middlewares/auth';
import { NextResponse } from 'next/server';

export const POST = authMiddleware(async (req) => {
  await dbConnect();
  
  try {
    const { code } = await req.json();
    const userId = req.userId;
    console.log('Received coupon validation request:', { code, userId });

    const coupon = await Coupon.findOne({ code, issuedTo: userId, isUsed: false });
    console.log('Coupon found:', coupon);

    if (!coupon) {
      console.log('Coupon not found or does not match criteria:', { code, userId });
      return NextResponse.json({ message: 'Invalid or expired coupon' }, { status: 400 });
    }

    if (new Date(coupon.validUntil) < new Date()) {
      console.log('Coupon has expired:', { validUntil: coupon.validUntil });
      return NextResponse.json({ message: 'Coupon has expired' }, { status: 400 });
    }

    console.log('Valid coupon found:', { code: coupon.code, discount: coupon.discount });
    return NextResponse.json({
      coupon: { code: coupon.code, discount: coupon.discount }
    }, { status: 200 });

  } catch (error) {
    console.error('Error validating coupon:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
});




















//////////////////////////////
// import {connectDB } from '../../../lib/mongodb';

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     try {
//       const { code } = req.body;

//       if (!code) {
//         return res.status(400).json({ message: 'Coupon code is required' });
//       }

//       const { db } = await connectDB ();
//       const coupon = await db.collection('coupons').findOne({ 
//         code: code,
//         expirationDate: { $gt: new Date() }
//       });

//       if (!coupon) {
//         return res.status(400).json({ message: 'Invalid or expired coupon' });
//       }

//       return res.status(200).json({
//         code: coupon.code,
//         discount: coupon.discountPercentage
//       });
//     } catch (error) {
//       console.error('Error validating coupon:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }