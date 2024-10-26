'use client'
import React, { useState, useEffect } from 'react';

const Coupons = ({ userId }) => {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCoupons();
    }, [userId]);

    const fetchCoupons = async () => {
        try {
            setLoading(true);
            setError(null);
            const token = localStorage.getItem('token');
            const response = await fetch(`/api/coupons/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setCoupons(data.coupons);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching coupons:', err);
            setError(`Failed to fetch coupons: ${err.message}`);
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center">Loading coupons...</div>;
    if (error) return <div className="text-red-500 text-center">{error}</div>;

    return (
        <div className="mt-4">
            <h3 className="text-xl font-semibold text-green-800 mb-2">Your Coupons</h3>
            {coupons.length === 0 ? (
                <p className="text-green-600">You haven't earned any coupons yet. Keep participating to earn rewards!</p>
            ) : (
                <ul className="space-y-2">
                    {coupons.map((coupon) => (
                        <li key={coupon._id} className={`p-2 rounded-md ${coupon.isUsed ? 'bg-gray-200' : 'bg-green-100'}`}>
                            <p className="font-bold">{coupon.code}</p>
                            <p>{coupon.discount}% off</p>
                            <p className="text-sm text-green-700">Valid until: {new Date(coupon.validUntil).toLocaleDateString()}</p>
                            <p className={`text-sm ${coupon.isUsed ? 'text-red-500' : 'text-green-500'}`}>
                                {coupon.isUsed ? 'Used' : 'Available'}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Coupons;