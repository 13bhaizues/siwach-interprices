import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, PlayIcon } from '@heroicons/react/24/outline';
import { getFeaturedProducts } from '../data/allProducts';

// Hero carousel data with premium dark imagery
const heroSlides = [
  {
    id: 1,
    title: 'VELOCITY PRO',
    subtitle: 'ENGINEERED FOR CHAMPIONS',
    description: 'Experience the future of athletic performance with our revolutionary Velocity Pro series. Precision-crafted for those who refuse to settle.',
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    cta: 'SHOP VELOCITY PRO',
    ctaLink: '/products?featured=velocity-pro',
    theme: 'dark'
  },
  {
    id: 2,
    title: 'STEALTH TRAINING',
    subtitle: 'WHERE ELEGANCE MEETS POWER',
    description: 'Discover our premium women\'s collection designed for the modern athlete. Sophisticated protection that adapts to every challenge.',
    image: 'https://images.pexels.com/photos/7432771/pexels-photo-7432771.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    cta: 'EXPLORE COLLECTION',
    ctaLink: '/products?category=women',
    theme: 'light'
  },
  {
    id: 3,
    title: 'QUANTUM TECH',
    subtitle: 'INTELLIGENCE ON YOUR WRIST',
    description: 'Revolutionary fitness tracking technology that learns from your performance. The future of athletic intelligence is here.',
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    cta: 'DISCOVER TECH',
    ctaLink: '/products?category=tech',
    theme: 'dark'
  }
];

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleOnHover = {
  whileHover: { scale: 1.05 },
  transition: { duration: 0.3 }
};

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const featuredProducts = getFeaturedProducts();

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="bg-black text-white overflow-hidden">
      {/* Hero Carousel Section */}
      <section className="relative h-screen sm:h-[70vh] md:h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={heroSlides[currentSlide].image}
                alt={heroSlides[currentSlide].title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30" >
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
              <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full">
                <div className="max-w-4xl">
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="space-y-8"
                  >
                    <div>
                      <motion.h1
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-3xl sm:text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter leading-none text-white font-display"
                      >
                        {heroSlides[currentSlide].title}
                      </motion.h1>
                      <motion.h2
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-sm sm:text-lg md:text-2xl lg:text-4xl font-light text-gray-300 tracking-wide mt-2 sm:mt-4 leading-relaxed"
                      >
                        {heroSlides[currentSlide].subtitle}
                      </motion.h2>
                    </div>

                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                      className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl leading-relaxed font-light"
                    >
                      {heroSlides[currentSlide].description}
                    </motion.p>

                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 1 }}
                    >
                      <Link
                        to={heroSlides[currentSlide].ctaLink}
                        className="inline-flex items-center bg-accent text-white px-6 sm:px-8 lg:px-12 py-3 sm:py-4 font-bold text-sm sm:text-base lg:text-lg tracking-wide hover:bg-accent-600 transition-all duration-300 transform hover:scale-105 shadow-glow rounded-xl"
                      >
                        {heroSlides[currentSlide].cta}
                        <PlayIcon className="ml-2 sm:ml-3 h-4 w-4 sm:h-5 sm:w-5" />
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 lg:left-8 top-1/2 transform -translate-y-1/2 z-20 p-2 sm:p-3 lg:p-4 glass-dark hover:bg-white/20 transition-colors duration-200 rounded-full"
        >
          <ChevronLeftIcon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 lg:right-8 top-1/2 transform -translate-y-1/2 z-20 p-2 sm:p-3 lg:p-4 glass-dark hover:bg-white/20 transition-colors duration-200 rounded-full"
        >
          <ChevronRightIcon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2 sm:gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-accent scale-125 shadow-glow' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        {/* Auto-play indicator */}
        <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 right-2 sm:right-4 lg:right-8 z-20">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`px-2 sm:px-3 lg:px-4 py-1 sm:py-2 text-xs sm:text-sm font-bold transition-colors duration-200 rounded-lg glass-dark ${
              isAutoPlaying 
                ? 'text-accent' 
                : 'text-gray-400'
            }`}
          >
            {isAutoPlaying ? 'PAUSE' : 'PLAY'}
          </button>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gray-950 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-hero-pattern opacity-20" />
        
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12 lg:mb-20"
          >
            <div className="inline-block mb-3 sm:mb-4 lg:mb-6">
              <span className="text-xs sm:text-sm font-bold tracking-[0.3em] text-accent uppercase">
                Premium Collection
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black mb-3 sm:mb-4 lg:mb-6 tracking-tight font-display">
              FEATURED
              <span className="block gradient-text">
                PRODUCTS
              </span>
            </h2>
            <p className="text-sm sm:text-base lg:text-xl text-gray-400 max-w-2xl mx-auto font-light">
              Engineered for excellence. Designed for champions. Discover our most coveted pieces.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                variants={fadeInUp}
                {...scaleOnHover}
                className="card-premium group overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 sm:h-64 lg:h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
               <div className="absolute top-2 sm:top-3 lg:top-4 right-2 sm:right-3 lg:right-4 bg-green-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
  In Stock
</div>
    

                  {/* Quick Actions Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/40">
                    <div className="flex gap-2 sm:gap-3">
                      <Link
                        to={`/product/${product.id}`}
                        className="bg-white text-black px-3 sm:px-4 lg:px-6 py-2 sm:py-3 font-bold hover:bg-gray-100 transition-colors duration-200 rounded-xl text-xs sm:text-sm"
                      >
                        BUY
                      </Link>
                      <button className="bg-accent text-white px-3 sm:px-4 lg:px-6 py-2 sm:py-3 font-bold hover:bg-accent-600 transition-colors duration-200 rounded-xl text-xs sm:text-sm">
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-3 sm:p-4 lg:p-6">
                  <div className="text-xs text-accent uppercase tracking-wider font-bold mb-1 sm:mb-2">
                    {product.category}
                  </div>
                  
                  <h3 className="text-sm sm:text-base lg:text-xl font-bold group-hover:text-accent transition-colors duration-300 leading-tight mb-2 sm:mb-3 line-clamp-2">
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-400 leading-relaxed mb-3 sm:mb-4 text-xs sm:text-sm line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="text-lg sm:text-xl lg:text-2xl font-black text-white">
                        ₹{product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs sm:text-sm text-gray-500 line-through">
                          ₹{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    
                    <span className="text-xs text-green-400 font-bold">
                      ✅ In Stock
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* View All CTA */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-8 sm:mt-12 lg:mt-20"
          >
            <Link
              to="/products"
              className="inline-block bg-gradient-to-r from-accent to-accent-600 text-white px-6 sm:px-8 lg:px-12 py-3 sm:py-4 font-bold text-sm sm:text-base lg:text-lg tracking-wide hover:from-accent-600 hover:to-accent-700 transition-all duration-300 transform hover:scale-105 shadow-glow rounded-xl"
            >
              VIEW ALL PRODUCTS
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-black relative">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12 lg:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black mb-3 sm:mb-4 lg:mb-6 tracking-tight font-display">
              SHOP BY
              <span className="block gradient-text">
                CATEGORY
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                name: "Men's Collection",
                image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
                href: '/products?category=men',
                description: 'Engineered for peak performance'
              },
              {
                name: "Women's Collection",
                image: 'https://imgs.search.brave.com/TCQx7w1BjIDd1XNnCpVQJHJIzUxFoWChWfOWiaxVebg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuY3RmYXNzZXRz/Lm5ldC8wazgxMm82/Mm5kdHcvMWN5a3Zo/ZkNsUEtOcVFYbnNG/T1lDTC8wMjRkMjA5/YjUxMTFmMWFhMGZm/OGI3YTZlZWNhNGVk/YS9LYXlsYUl0c2lu/ZXNfSGlnaEludGVu/c2l0eVN0cmVuZ3Ro/XzVfMTAyNHg2ODNf/MjdjM2E1M19lbjNm/ZDNjNWM2YWE4ODEy/MDQyNjM5YzEyZmMy/ODZiN2ZhLmpwZz93/PTEwMjQmcT04NQ',
                href: '/products?category=women',
                description: 'Where elegance meets power'
              },
              {
                name: 'Tech Collection',
                image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
                href: '/products?category=tech',
                description: 'Revolutionary technology'
              }
            ].map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden card-premium h-64 sm:h-80 lg:h-96"
              >
                <Link to={category.href} className="block h-full">
                  <div className="absolute inset-0">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  </div>

                  <div className="relative z-10 h-full flex items-end p-4 sm:p-6 lg:p-8">
                    <div>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white group-hover:text-accent transition-colors duration-300 mb-1 sm:mb-2">
                        {category.name}
                      </h3>
                      <p className="text-gray-300 mb-2 sm:mb-3 lg:mb-4 text-sm sm:text-base">
                        {category.description}
                      </p>
                      <div className="flex items-center text-accent group-hover:text-white transition-colors duration-300">
                        <span className="font-bold text-sm sm:text-base">EXPLORE</span>
                        <ChevronRightIcon className="ml-1 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-accent/20 via-black to-black relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-16 sm:w-24 lg:w-32 h-16 sm:h-24 lg:h-32 bg-accent/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-20 sm:w-32 lg:w-40 h-20 sm:h-32 lg:h-40 bg-blue-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="max-w-4xl mx-auto text-center px-3 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-4 sm:mb-6 font-display">
              READY TO ELEVATE
              <span className="block gradient-text">
                YOUR GAME?
              </span>
            </h2>
            <p className="text-sm sm:text-base lg:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto font-light">
              Join thousands of athletes who trust our premium gear to push their limits and achieve greatness.
            </p>
            <Link
              to="/products"
              className="inline-block bg-gradient-to-r from-accent to-accent-600 text-white px-6 sm:px-8 lg:px-12 py-3 sm:py-4 text-sm sm:text-base lg:text-xl font-bold tracking-wide hover:from-accent-600 hover:to-accent-700 transition-all duration-300 transform hover:scale-105 shadow-glow-lg rounded-xl"
            >
              SHOP ALL PRODUCTS
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}