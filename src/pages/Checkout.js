import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { clearCart } from '../store/cartSlice';
import { getProductById } from '../data/allProducts';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

export default function Checkout() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { items, totalAmount } = useSelector((state) => state.cart);
  const [isLoading, setIsLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'cod'
  });

  // Handle direct buy from product page
  const skuParam = searchParams.get('sku');
  const directBuyProduct = skuParam ? getProductById(skuParam) : null;
  
  // Use either cart items or direct buy product
  const checkoutItems = directBuyProduct ? [directBuyProduct] : items;
  const checkoutTotal = directBuyProduct ? directBuyProduct.price : totalAmount;
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate order processing
    setTimeout(() => {
      setOrderPlaced(true);
      dispatch(clearCart());
      setIsLoading(false);
    }, 2000);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-black text-white pt-16 sm:pt-20">
        <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <div className="w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto">
              <CheckCircleIcon className="h-8 sm:h-10 lg:h-12 w-8 sm:w-10 lg:w-12 text-white" />
            </div>
            
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 sm:mb-6">
                ORDER
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-white">
                  CONFIRMED
                </span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-400 font-light max-w-2xl mx-auto">
                Thank you for choosing Siwach Enterprises! Your order has been placed successfully. 
                We'll send you a confirmation email shortly.
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-800 p-4 sm:p-6 lg:p-8 max-w-md mx-auto">
              <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">Order Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Order Total:</span>
                  <span className="text-white font-bold">₹{Math.round(checkoutTotal * 1.18).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Payment Method:</span>
                  <span className="text-white">Cash on Delivery</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Delivery:</span>
                  <span className="text-white">3-5 Business Days</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => window.location.href = '/'}
                className="bg-white text-black px-6 sm:px-8 lg:px-12 py-3 sm:py-4 font-bold text-sm sm:text-base lg:text-lg tracking-wide hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              >
                CONTINUE SHOPPING
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (checkoutItems.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white pt-16 sm:pt-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-4 sm:mb-6">
              YOUR CART IS EMPTY
            </h1>
            <p className="text-gray-400 mb-6 sm:mb-8">Add some items to your cart before checkout.</p>
            <a
              href="/products"
              className="bg-white text-black px-6 sm:px-8 py-2 sm:py-3 font-bold hover:bg-gray-100 transition-colors duration-300 text-sm sm:text-base"
            >
              SHOP NOW
            </a>
          </div>
        </div>
      </div>
    );
  }

  const finalTotal = Math.round(checkoutTotal * 1.18);

  return (
    <div className="min-h-screen bg-black text-white pt-16 sm:pt-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 sm:space-y-12"
        >
          {/* Header */}
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3 sm:mb-4">
              CHECKOUT
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white">
                SECURE
              </span>
            </h1>
            <p className="text-gray-400 font-light text-sm sm:text-base">
              Complete your order and join the Siwach family
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Checkout Form */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                {/* Personal Information */}
                <div className="space-y-4 sm:space-y-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-white">Personal Information</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-white mb-2 uppercase tracking-wider">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-900 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors duration-300 text-sm sm:text-base"
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-white mb-2 uppercase tracking-wider">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-900 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors duration-300 text-sm sm:text-base"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-white mb-2 uppercase tracking-wider">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-900 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors duration-300 text-sm sm:text-base"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="space-y-4 sm:space-y-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-white">Shipping Address</h2>
                  
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-white mb-2 uppercase tracking-wider">
                      Address *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-900 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors duration-300 text-sm sm:text-base"
                      placeholder="Enter your complete address"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-white mb-2 uppercase tracking-wider">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-900 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors duration-300 text-sm sm:text-base"
                        placeholder="City"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-white mb-2 uppercase tracking-wider">
                        State *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-900 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors duration-300 text-sm sm:text-base"
                        placeholder="State"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-white mb-2 uppercase tracking-wider">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-900 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors duration-300 text-sm sm:text-base"
                        placeholder="PIN Code"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="space-y-4 sm:space-y-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-white">Payment Method</h2>
                  
                  <div className="space-y-4">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-400 bg-gray-900 border-gray-700 focus:ring-blue-400"
                      />
                      <span className="text-white text-sm sm:text-base">Cash on Delivery (COD)</span>
                    </label>
                    
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        checked={formData.paymentMethod === 'upi'}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-400 bg-gray-900 border-gray-700 focus:ring-blue-400"
                      />
                      <span className="text-white text-sm sm:text-base">UPI Payment</span>
                    </label>
                    
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-400 bg-gray-900 border-gray-700 focus:ring-blue-400"
                      />
                      <span className="text-white text-sm sm:text-base">Credit/Debit Card</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-white text-black py-3 sm:py-4 font-bold text-base sm:text-lg tracking-wide hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                >
                  {isLoading ? 'PLACING ORDER...' : 'PLACE ORDER'}
                </button>
              </form>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:sticky lg:top-24 lg:self-start"
            >
              <div className="bg-gray-900 border border-gray-800 p-4 sm:p-6 lg:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8">Order Summary</h2>
                
                {/* Order Items */}
                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  {checkoutItems.map((item) => (
                    <div key={`${item.id}-${item.size || 'default'}`} className="flex items-center gap-3 sm:gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 sm:w-16 h-12 sm:h-16 object-cover bg-gray-800"
                      />
                      <div className="flex-1">
                        <h4 className="text-white font-bold text-xs sm:text-sm line-clamp-1">{item.name}</h4>
                        <p className="text-gray-400 text-xs">
                          {item.size && `Size: ${item.size}`} 
                          {item.quantity && ` | Qty: ${item.quantity}`}
                          {!item.size && !item.quantity && 'Qty: 1'}
                        </p>
                      </div>
                      <span className="text-white font-bold text-sm sm:text-base">
                        ₹{(item.totalPrice || item.price).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span>₹{checkoutTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Tax (18%)</span>
                    <span>₹{Math.round(checkoutTotal * 0.18).toLocaleString()}</span>
                  </div>
                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex justify-between text-white text-lg sm:text-xl font-bold">
                      <span>Total</span>
                      <span>₹{finalTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="text-center text-gray-400 text-sm">
                  <p>🔒 Secure checkout powered by industry-standard encryption</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}