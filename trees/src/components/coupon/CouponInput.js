// import React, { useState } from 'react';
// import { Tag, X } from 'lucide-react';
// import { Alert, AlertDescription } from '@/components/ui/alert';

// const CouponInput = ({ onApplyCoupon, onRemoveCoupon, appliedCoupon }) => {
//   const [couponCode, setCouponCode] = useState('');
//   const [error, setError] = useState('');

//   const handleApplyCoupon = async () => {
//     setError('');
//     try {
//       const response = await fetch('/api/couponsValidate', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: JSON.stringify({ code: couponCode }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || 'Failed to apply coupon');
//       }

//       onApplyCoupon(data.coupon);
//       setCouponCode('');
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="mb-4">
//       <label htmlFor="couponCode" className="block text-sm font-medium text-gray-700 mb-2">
//         Coupon Code
//       </label>
//       {appliedCoupon ? (
//         <div className="flex items-center">
//           <Tag className="mr-2 text-green-600" />
//           <span className="text-green-600 font-medium">{appliedCoupon.code} applied</span>
//           <button
//             onClick={onRemoveCoupon}
//             className="ml-2 text-red-500 hover:text-red-700"
//             aria-label="Remove coupon"
//           >
//             <X size={16} />
//           </button>
//         </div>
//       ) : (
//         <div className="flex">
//           <input
//             type="text"
//             id="couponCode"
//             value={couponCode}
//             onChange={(e) => setCouponCode(e.target.value)}
//             className="flex-grow p-2 border border-gray-300 rounded-l-md focus:ring-green-500 focus:border-green-500"
//             placeholder="Enter coupon code"
//           />
//           <button
//             onClick={handleApplyCoupon}
//             className="bg-green-600 text-white px-4 py-2 rounded-r-md hover:bg-green-700 transition duration-200"
//           >
//             Apply
//           </button>
//         </div>
//       )}
//       {error && (
//         <Alert variant="destructive" className="mt-2">
//           <AlertDescription>{error}</AlertDescription>
//         </Alert>
//       )}
//     </div>
//   );
// };

// export default CouponInput;

// import React, { useState } from 'react';
// import { Tag, X } from 'lucide-react';
// import { Alert, AlertDescription } from '@/components/ui/alert';

// const CouponInput = ({ onApplyCoupon, onRemoveCoupon, appliedCoupon }) => {
//   const [couponCode, setCouponCode] = useState('');
//   const [error, setError] = useState('');

//   const handleApplyCoupon = async () => {
//     setError('');
//     try {
//       const response = await fetch('/api/couponsValidate', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: JSON.stringify({ code: couponCode }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || 'Failed to apply coupon');
//       }

//       onApplyCoupon(data.coupon);
//       setCouponCode('');
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="mb-4">
//       <label htmlFor="couponCode" className="block text-sm font-medium text-gray-700 mb-2">
//         Coupon Code
//       </label>
//       {appliedCoupon ? (
//         <div className="flex items-center">
//           <Tag className="mr-2 text-green-600" />
//           <span className="text-green-600 font-medium">
//             {appliedCoupon.code} applied - {appliedCoupon.discount}% off
//           </span>
//           <button
//             onClick={onRemoveCoupon}
//             className="ml-2 text-red-500 hover:text-red-700"
//             aria-label="Remove coupon"
//           >
//             <X size={16} />
//           </button>
//         </div>
//       ) : (
//         <div className="flex">
//           <input
//             type="text"
//             id="couponCode"
//             value={couponCode}
//             onChange={(e) => setCouponCode(e.target.value)}
//             className="flex-grow p-2 border border-gray-300 rounded-l-md focus:ring-green-500 focus:border-green-500"
//             placeholder="Enter coupon code"
//           />
//           <button
//             onClick={handleApplyCoupon}
//             className="bg-green-600 text-white px-4 py-2 rounded-r-md hover:bg-green-700 transition duration-200"
//           >
//             Apply
//           </button>
//         </div>
//       )}
//       {error && (
//         <Alert variant="destructive" className="mt-2">
//           <AlertDescription>{error}</AlertDescription>
//         </Alert>
//       )}
//     </div>
//   );
// };

// export default CouponInput;
//////////////////////////////////////////////////////////////
// CouponInput.js
import React, { useState } from 'react';

const CouponInput = ({ onApplyCoupon, onRemoveCoupon, appliedCoupon }) => {
  const [couponCode, setCouponCode] = useState('');
  const [error, setError] = useState('');

  const handleApplyCoupon = async () => {
    try {
      const token = localStorage.getItem('token'); 
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('/api/couponsValidate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ code: couponCode }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to apply coupon');
      }

      const couponData = await response.json();
      onApplyCoupon(couponData.coupon);
      setError('');
    } catch (error) {
      console.error('Coupon application error:', error);
      setError(error.message);
      onRemoveCoupon();
    }
  };

  return (
    <div className="flex flex-col items-start space-y-2">
      <div className="flex">
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Enter coupon code"
          className="p-2 border border-gray-300 rounded-md mr-2"
        />
        <button
          onClick={handleApplyCoupon}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          Apply Coupon
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {appliedCoupon && (
        <p className="text-green-500">
          Coupon applied: {appliedCoupon.code} ({appliedCoupon.discount}% off)
        </p>
      )}
    </div>
  );
};

export default CouponInput;
