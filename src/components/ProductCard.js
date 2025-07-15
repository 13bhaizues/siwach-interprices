// src/components/ProductCard.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';

import {
  HeartIcon,
  EyeIcon,
  ShoppingBagIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import {
  HeartIcon as HeartIconSolid,
  StarIcon as StarIconSolid,
} from '@heroicons/react/24/solid';

import ProductBadge from './ProductBadge';

export default function ProductCard({ product, index = 0, className = '' }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  /* ---------- Image fallback ---------- */
  // Uses imageSrc → image → placeholder (in that order)
  const imgSrc = product.imageSrc || product.image || '/placeholder.png';

  /* ---------- Helpers ---------- */
  const safeSize = product.sizes?.[0] || 'default';
  const reviewCount =
    typeof product.reviews === 'number'
      ? product.reviews
      : product.reviews?.length || 0;

  const averageRating = product.rating ?? 0;
  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const renderStars = (rating) => {
    const stars = [];
    const full = Math.floor(rating);
    const half = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < full) {
        stars.push(<StarIconSolid key={i} className="h-4 w-4 text-yellow-400" />);
      } else if (i === full && half) {
        stars.push(
          <div key={i} className="relative">
            <StarIcon className="h-4 w-4 text-gray-400" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <StarIconSolid className="h-4 w-4 text-yellow-400" />
            </div>
          </div>
        );
      } else {
        stars.push(<StarIcon key={i} className="h-4 w-4 text-gray-400" />);
      }
    }
    return stars;
  };

  /* ---------- Actions ---------- */
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: imgSrc, // ← use the same safe source
        size: safeSize,
      })
    );
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleAddToCart(e); // add first
    navigate(`/checkout?sku=${product.id}`);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  /* ---------- Render ---------- */
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`group relative bg-black border border-gray-800 overflow-hidden hover:border-gray-600 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 ${className}`}
    >
      <Link to={`/product/${product.id}`} className="block">
        {/* Badges */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
          {product.badge && <ProductBadge badge={product.badge} />}
          {discountPercentage > 0 && (
            <ProductBadge badge="SALE" className="bg-red-600 text-white" />
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-4 right-4 z-20 p-2 bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors duration-200"
        >
          {isWishlisted ? (
            <HeartIconSolid className="h-5 w-5 text-red-500" />
          ) : (
            <HeartIcon className="h-5 w-5 text-white" />
          )}
        </button>

        {/* Image */}
        <div className="relative overflow-hidden aspect-square bg-gray-900">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-800 animate-pulse" />
          )}
          <img
            src={imgSrc}
            alt={product.name}
            className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />

          {/* Quick actions */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/40">
            <div className="flex gap-3">
              <motion.button
                onClick={handleBuyNow}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-black p-2 sm:p-3 font-bold hover:bg-gray-100 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-cyan-500/30 transform hover:scale-103"
              >
                <EyeIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm">BUY</span>
              </motion.button>
              <motion.button
                onClick={handleAddToCart}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-white text-white p-2 sm:p-3 font-bold hover:bg-white hover:text-black transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-cyan-500/30 transform hover:scale-103"
              >
                <ShoppingBagIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm">ADD</span>
              </motion.button>
            </div>
          </div>

          {discountPercentage > 0 && (
            <div className="absolute bottom-4 left-4 bg-red-600 text-white px-2 py-1 text-xs font-bold">
              -{discountPercentage}%
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-6 space-y-3">
          <div className="text-xs text-blue-400 uppercase tracking-wider font-bold">
            {product.category}
          </div>

          <h3 className="text-lg font-bold group-hover:text-blue-400 transition-colors duration-300 leading-tight line-clamp-2">
            {product.name}
          </h3>

          <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center gap-2">
            <div className="flex items-center">{renderStars(averageRating)}</div>
            <span className="text-xs text-gray-400">({reviewCount})</span>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <span className="text-xl font-black text-white">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <span
              className={`text-xs font-bold ${
                product.inStock ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {product.inStock ? '✅ In Stock' : '❌ Out of Stock'}
            </span>
            <span className="text-xs text-gray-400">🚚 2‑3 days</span>
          </div>

          <div className="flex gap-2 pt-4">
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-white text-black py-2 px-3 sm:px-4 font-bold text-xs sm:text-sm hover:bg-gray-100 transition-all duration-300 transform hover:scale-103 shadow-lg hover:shadow-cyan-500/30"
            >
              BUY NOW
            </button>
            <button
              onClick={handleAddToCart}
              className="flex-1 border-2 border-white text-white py-2 px-3 sm:px-4 font-bold text-xs sm:text-sm hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-103 shadow-lg hover:shadow-cyan-500/30"
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
