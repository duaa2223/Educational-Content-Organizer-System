'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { PayPalButtons } from "@paypal/react-paypal-js";
import img from './donation-image.webp';

const DonationForm = () => {
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const donationAmounts = [10, 25, 50, 100, 250];

  const handleAmountSelect = (selectedAmount) => {
    setAmount(selectedAmount);
  };

  const handlePayPalApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      setMessage(`Thank you ${name} for your donation of $${amount}!`);
      setAmount('');
      setName('');
      setEmail('');
    });
  };

  return (
    <section className="relative w-full min-h-[600px] overflow-hidden">
      <Image
        src={img}
        alt="Donation background"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
      <div className="absolute inset-0 bg-black bg-opacity-60" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4 py-12">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-center mb-6 font-shadows"
        >
          Plant Hope: Your Donation, Our Future
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-center mb-8 max-w-2xl"
        >
          Every contribution, no matter how small, helps us create a greener world. Join us in our mission to plant trees and restore our planet.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-md"
        >
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Select Donation Amount</label>
            <div className="grid grid-cols-3 gap-4">
              {donationAmounts.map((amt) => (
                <motion.button
                  key={amt}
                  onClick={() => handleAmountSelect(amt)}
                  className={`p-4 rounded-lg text-center ${
                    amount === amt ? 'bg-green-500' : 'bg-gray-700'
                  } hover:bg-green-600 transition duration-300`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ${amt}
                </motion.button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:border-green-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium mb-2">Your Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:border-green-500"
              required
            />
          </div>
          {amount && (
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: amount,
                        currency_code: "JOD",
                      },
                    },
                  ],
                });
              }}
              onApprove={handlePayPalApprove}
            />
          )}
          {message && (
            <p className="mt-4 text-center text-lg">
              {message}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default DonationForm;