// // pages/api/checkout.js
// import dbConnect from '../../../lib/mongodb';
// import Order from '../../../models/orders';
// import User from '../../../models/users';
// import Product from '../../../models/products';

// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   await dbConnect();

//   try {
//     const { userId, cart, paymentInfo, shippingAddress } = req.body;

//     // Validate user
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Validate products and calculate total
//     let totalAmount = 0;
//     const orderProducts = [];
//     for (const item of cart) {
//       const product = await Product.findById(item.id);
//       if (!product) {
//         return res.status(404).json({ message: `Product ${item.id} not found` });
//       }
//       totalAmount += product.price * item.quantity;
//       orderProducts.push({
//         product: product._id,
//         quantity: item.quantity
//       });
//     }

//     // Create order
//     const order = new Order({
//       user: userId,
//       products: orderProducts,
//       totalAmount,
//       paymentInfo: {
//         method: paymentInfo.method,
//         transactionId: paymentInfo.transactionId,
//         paidAt: new Date()
//       },
//       shippingAddress,
//       status: 'paid'
//     });

//     await order.save();

//     // Here you would typically integrate with a payment gateway
//     // For now, we'll assume the payment was successful

//     res.status(200).json({ message: 'Order placed successfully', orderId: order._id });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// }
/////////////////////////////////////////////////////////////////////////////////////////////
// import { NextResponse } from 'next/server';
// import dbConnect from '../../../lib/mongodb';
// import Order from '../../../models/orders';
// import User from '../../../models/users';
// import Product from '../../../models/products';
// import { authMiddleware } from '../../../middlewares/auth';

// export async function POST(request) {
//   await dbConnect();

//   try {
//     const { cart, paymentInfo, shippingAddress } = await request.json();
//     const userId = request.userId; // This comes from the authMiddleware

//     // Validate user
//     const user = await User.findById(userId);
//     if (!user) {
//       return NextResponse.json({ message: 'User not found' }, { status: 404 });
//     }

//     // Validate products and calculate total
//     let totalAmount = 0;
//     const orderProducts = [];
//     for (const item of cart) {
//       const product = await Product.findById(item.id);
//       if (!product) {
//         return NextResponse.json({ message: `Product ${item.id} not found` }, { status: 404 });
//       }
//       totalAmount += product.price * item.quantity;
//       orderProducts.push({
//         product: product._id,
//         quantity: item.quantity
//       });
//     }

//     // Create order
//     const order = new Order({
//       user: userId,
//       products: orderProducts,
//       totalAmount,
//       paymentInfo: {
//         method: 'credit_card', // Assuming credit card payment for now
//         transactionId: 'dummy-transaction-id', // You'd get this from a real payment gateway
//         paidAt: new Date()
//       },
//       shippingAddress,
//       status: 'paid' // Assuming payment is successful
//     });

//     await order.save();

//     // Here you would typically integrate with a payment gateway
//     // For now, we'll assume the payment was successful

//     return NextResponse.json({ message: 'Order placed successfully', orderId: order._id }, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ message: 'Server error' }, { status: 500 });
//   }
// }

// export default authMiddleware(POST);
//////////////////////////////////////////////////////////////////////////////////////
// import { NextResponse } from 'next/server';
// import dbConnect from '../../../lib/mongodb';
// import Order from '../../../models/orders';
// import User from '../../../models/users';
// import Product from '../../../models/products';
// import { authMiddleware } from '../../../middlewares/auth';
// import Coupon from '../../../models/coupons';
// export const POST = authMiddleware(async function(request) {
//   await dbConnect();

//   try {
//     const { cart, paymentInfo, shippingAddress } = await request.json();
//     const userId = request.userId;

//     if (!userId) {
//       return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
//     }

//     // Validate products and calculate total
//     let totalAmount = 0;
//     const orderProducts = [];
//     for (const item of cart) {
//       // استخدم item.product بدلاً من item.id
//       const product = await Product.findById(item.product); 
//       if (!product) {
//         return NextResponse.json({ message: `Product ${item.product} not found` }, { status: 404 });
//       }
//       totalAmount += product.price * item.quantity;
//       orderProducts.push({
//         product: product._id,
//         quantity: item.quantity
//       });
//     }

//     // Create order
//     const order = new Order({
//       user: userId,
//       products: orderProducts,
//       totalAmount,
//       paymentInfo, // استخدم paymentInfo المستلم من الطلب
//       shippingAddress,
//       status: 'pending' // assuming payment is successful
//     });

    
//     if (paymentInfo.method === 'credit_card') {
//       // Here you would typically integrate with a payment processor
//       // For this example, we'll assume the payment is always successful
//       order.status = 'paid';
//     } else if (paymentInfo.method === 'paypal') {
//       // For PayPal, we've already received confirmation in the frontend
//       // You might want to verify the transaction with PayPal here
//       order.status = 'paid';
//       order.paypalOrderId = paymentInfo.paypalOrderId;
//     } else {
//       return NextResponse.json({ message: 'Invalid payment method' }, { status: 400 });
//     }

    
//     await order.save();

//     return NextResponse.json({ message: 'Order placed successfully', orderId: order._id }, { status: 200 });
//   } catch (error) {
//     console.error('Server error:', error);
//     return NextResponse.json({ message: 'Server error', details: error.message }, { status: 500 });
//   }
// });

///////////////////////
// import { NextResponse } from 'next/server';
// import dbConnect from '../../../lib/mongodb';
// import Order from '../../../models/orders';
// import User from '../../../models/users';
// import Product from '../../../models/products';
// import Coupon from '../../../models/coupons';
// import { authMiddleware } from '../../../middlewares/auth';

// export const POST = authMiddleware(async function(request) {
//   await dbConnect();

//   try {
//     const { cart, paymentInfo, shippingAddress, couponCode } = await request.json();
//     const userId = request.userId;

//     if (!userId) {
//       return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
//     }

//     // Validate products and calculate total
//     let totalAmount = 0;
//     const orderProducts = [];
//     for (const item of cart) {
//       const product = await Product.findById(item.product);

//       if (!product) {
//         return NextResponse.json({ message: `Product ${item.product} not found` }, { status: 404 });
//       }
//       totalAmount += product.price * item.quantity;
//       orderProducts.push({
//         product: product._id,
//         quantity: item.quantity
//       });
//     }

//     // Apply coupon if provided
//     let appliedCoupon = null;
//     if (couponCode) {
//       appliedCoupon = await Coupon.findOne({ code: couponCode, issuedTo: userId, isUsed: false });
//       if (appliedCoupon && new Date(appliedCoupon.validUntil) > new Date()) {
//         const discountAmount = totalAmount * (appliedCoupon.discount / 100);
//         totalAmount -= discountAmount;
//         appliedCoupon.isUsed = true;
//         await appliedCoupon.save();
//       }
//     }

//     // Create order
//     const order = new Order({
//       user: userId,
//       products: orderProducts,
//       totalAmount,
//       paymentInfo,
//       shippingAddress,
//       status: 'pending',
//       couponApplied: appliedCoupon ? appliedCoupon._id : null
//     });

//     if (paymentInfo.method === 'credit_card') {

//       // Here you would typically integrate with a payment processor
//       // For this example, we'll assume the payment is always successful
//       order.status = 'paid';
//     } else if (paymentInfo.method === 'paypal') {
//       // For PayPal, we've already received confirmation in the frontend
//       // You might want to verify the transaction with PayPal here
//       order.status = 'paid';
//       order.paypalOrderId = paymentInfo.paypalOrderId;
//     } else {
//       return NextResponse.json({ message: 'Invalid payment method' }, { status: 400 });
//     }

//     await order.save();

//     return NextResponse.json({ message: 'Order placed successfully', orderId: order._id }, { status: 200 });
//   } catch (error) {
//     console.error('Server error:', error);
//     return NextResponse.json({ message: 'Server error', details: error.message }, { status: 500 });
//   }
// });
///////////////////////////////////////////////////////////////////////////////////////
import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Order from '../../../models/orders';
import User from '../../../models/users';
import Product from '../../../models/products';
import Coupon from '../../../models/coupons';
import { authMiddleware } from '../../../middlewares/auth';

export const POST = authMiddleware(async function(request) {
  await dbConnect();

  try {
    const { cart, paymentInfo, shippingAddress, couponCode } = await request.json();
    const userId = request.userId;

    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Validate products and calculate total
    let totalAmount = 0;
    const orderProducts = [];
    for (const item of cart) {
      const product = await Product.findById(item.product);

      if (!product) {
        return NextResponse.json({ message: `Product ${item.product} not found` }, { status: 404 });
      }
      totalAmount += product.price * item.quantity;
      orderProducts.push({
        product: product._id,
        quantity: item.quantity
      });
    }

    // Apply coupon if provided
    let appliedCoupon = null;
    if (couponCode) {
      appliedCoupon = await Coupon.findOne({ code: couponCode, issuedTo: userId, isUsed: false });
      if (appliedCoupon && new Date(appliedCoupon.validUntil) > new Date()) {
        const discountAmount = totalAmount * (appliedCoupon.discount / 100);
        totalAmount -= discountAmount;
        appliedCoupon.isUsed = true;
        await appliedCoupon.save();
      } else {
        return NextResponse.json({ message: 'Invalid or expired coupon' }, { status: 400 });
      }
    }

    // Create order
    const order = new Order({
      user: userId,
      products: orderProducts,
      totalAmount,
      paymentInfo,
      shippingAddress,
      status: 'pending',
      couponApplied: appliedCoupon ? appliedCoupon._id : null
    });

    if (paymentInfo.method === 'credit_card') {
      // Here you would typically integrate with a payment processor
      // For this example, we'll assume the payment is always successful
      order.status = 'paid';
    } else if (paymentInfo.method === 'paypal') {
      // For PayPal, we've already received confirmation in the frontend
      // You might want to verify the transaction with PayPal here
      order.status = 'paid';
      order.paypalOrderId = paymentInfo.paypalOrderId;
    } else {
      return NextResponse.json({ message: 'Invalid payment method' }, { status: 400 });
    }

    await order.save();

    return NextResponse.json({ 
      message: 'Order placed successfully', 
      orderId: order._id,
      totalAmount: order.totalAmount,
      discount: appliedCoupon ? appliedCoupon.discount : 0
    }, { status: 200 });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ message: 'Server error', details: error.message }, { status: 500 });
  }
});