'use client';

import { CartProvider } from '../context/CartContext';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const paypalOptions = {
  "client-id": "ASIiVfZXTYzsxT9mZ18IhENq08lU5oKUDYp_RGyOB1TYbxDPCL-Yl4l0zniwz1ENGxDy7s4NdsbqIzVp",
  currency: "JOD",
  intent: "capture",
};

export default function ClientWrapper({ children }) {
  return (
    <PayPalScriptProvider options={paypalOptions}>
      <CartProvider>
        {children}
      </CartProvider>
    </PayPalScriptProvider>
  );
}