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
  const directBuyProduct = skuParam ? getProductById(parseInt(skuParam)) : null;
  
  // Use either cart items or direct buy product
  const checkoutItems = directBuyProduct ? [{
    ...directBuyProduct,
    quantity: 1,
    size: directBuyProduct.sizes?.[0] || 'One Size',
    totalPrice: directBuyProduct.price
  }] : items;
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
      <div className="min-h-screen bg-black text-white pt-12 sm:pt-16 lg:pt-20">
        <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6 sm:space-y-8"
          >
            <div className="w-12 sm:w-16 lg:w-20 xl:w-24 h-12 sm:h-16 lg:h-20 xl:h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto">
              <CheckCircleIcon className="h-6 sm:h-8 lg:h-10 xl:h-12 w-6 sm:w-8 lg:w-10 xl:w-12 text-white" />
            </div>
            
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tight mb-3 sm:mb-4 lg:mb-6">
                ORDER
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-white">
                  CONFIRMED
                </span>
              </h1>
              <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-400 font-light max-w-2xl mx-auto">
                Thank you for choosing Siwach Enterprises! Your order has been placed successfully. 
                We'll send you a confirmation email shortly.
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-800 p-3 sm:p-4 lg:p-6 xl:p-8 max-w-md mx-auto">
              <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white mb-2 sm:mb-3 lg:mb-4">Order Details</h3>
              <div className="space-y-2 text-xs sm:text-sm">
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

            <div className="space-y-3 sm:space-y-4">
              <button
                onClick={() => window.location.href = '/'}
                className="bg-white text-black px-4 sm:px-6 lg:px-8 xl:px-12 py-2 sm:py-3 lg:py-4 font-bold text-sm sm:text-base lg:text-lg tracking-wide hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
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
      <div className="min-h-screen bg-black text-white pt-12 sm:pt-16 lg:pt-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-black tracking-tight mb-3 sm:mb-4 lg:mb-6">
              YOUR CART IS EMPTY
            </h1>
            <p className="text-gray-400 mb-4 sm:mb-6 lg:mb-8 text-sm sm:text-base">Add some items to your cart before checkout.</p>
            <a
              href="/products"
              className="bg-white text-black px-4 sm:px-6 lg:px-8 py-2 sm:py-3 font-bold hover:bg-gray-100 transition-colors duration-300 text-sm sm:text-base"
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
    <div className="min-h-screen bg-black text-white pt-12 sm:pt-16 lg:pt-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 sm:space-y-8 lg:space-y-12"
        >
          {/* Header */}
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tight mb-2 sm:mb-3 lg:mb-4">
              CHECKOUT
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white">
                SECURE
              </span>
            </h1>
            <p className="text-gray-400 font-light text-xs sm:text-sm lg:text-base">
              Complete your order and join the Siwach family
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {/* Checkout Form */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 lg:space-y-8">
                {/* Personal Information */}
                <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Personal Information</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-white mb-1 sm:mb-2 uppercase tracking-wider">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 bg-gray-900 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors duration-300 text-xs sm:text-sm lg:text-base"
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-white mb-1 sm:mb-2 uppercase tracking-wider">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 bg-gray-900 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors duration-300 text-xs sm:text-sm lg:text-base"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-white mb-1 sm:mb-2 uppercase tracking-wider">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 bg-gray-900 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors duration-300 text-xs sm:text-sm lg:text-base"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Shipping Address</h2>
                  
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-white mb-1 sm:mb-2 uppercase tracking-wider">
                      Address *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 bg-gray-900 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors duration-300 text-xs sm:text-sm lg:text-base"
                      placeholder="Enter your complete address"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-white mb-1 sm:mb-2 uppercase tracking-wider">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 bg-gray-900 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors duration-300 text-xs sm:text-sm lg:text-base"
                        placeholder="City"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-white mb-1 sm:mb-2 uppercase tracking-wider">
                        State *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        className="w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 bg-gray-900 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors duration-300 text-xs sm:text-sm lg:text-base"
                        placeholder="State"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-white mb-1 sm:mb-2 uppercase tracking-wider">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                        className="w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 bg-gray-900 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors duration-300 text-xs sm:text-sm lg:text-base"
                        placeholder="PIN Code"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Payment Method</h2>
                  
                  <div className="space-y-3 sm:space-y-4">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-400 bg-gray-900 border-gray-700 focus:ring-blue-400"
                      />
                      <span className="text-white text-xs sm:text-sm lg:text-base">Cash on Delivery (COD)</span>
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
                      <span className="text-white text-xs sm:text-sm lg:text-base">UPI Payment</span>
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
                      <span className="text-white text-xs sm:text-sm lg:text-base">Credit/Debit Card</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-white text-black py-2 sm:py-3 lg:py-4 font-bold text-sm sm:text-base lg:text-lg tracking-wide hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
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
              <div className="bg-gray-900 border border-gray-800 p-3 sm:p-4 lg:p-6 xl:p-8">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-4 sm:mb-6 lg:mb-8">Order Summary</h2>
                
                {/* Order Items */}
                <div className="space-y-2 sm:space-y-3 lg:space-y-4 mb-4 sm:mb-6 lg:mb-8">
                  {checkoutItems.map((item) => (
                    <div key={`${item.id}-${item.size || 'default'}`} className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 sm:w-12 lg:w-16 h-10 sm:h-12 lg:h-16 object-cover bg-gray-800"
                      />
                      <div className="flex-1">
                        <h4 className="text-white font-bold text-xs sm:text-sm line-clamp-1">{item.name}</h4>
                        <p className="text-gray-400 text-xs">
                          {item.size && `Size: ${item.size}`} 
                          {item.quantity && ` | Qty: ${item.quantity}`}
                          {!item.size && !item.quantity && 'Qty: 1'}
                        </p>
                      </div>
                      <span className="text-white font-bold text-xs sm:text-sm lg:text-base">
                        ₹{(item.totalPrice || item.price).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2 sm:space-y-3 lg:space-y-4 mb-4 sm:mb-6 lg:mb-8">
                  <div className="flex justify-between text-gray-400 text-xs sm:text-sm">
                    <span>Subtotal</span>
                    <span>₹{checkoutTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-400 text-xs sm:text-sm">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-gray-400 text-xs sm:text-sm">
                    <span>Tax (18%)</span>
                    <span>₹{Math.round(checkoutTotal * 0.18).toLocaleString()}</span>
                  </div>
                  <div className="border-t border-gray-700 pt-3 sm:pt-4">
                    <div className="flex justify-between text-white text-base sm:text-lg lg:text-xl font-bold">
                      <span>Total</span>
                      <span>₹{finalTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="text-center text-gray-400 text-xs sm:text-sm">
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