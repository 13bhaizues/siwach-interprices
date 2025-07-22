import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, PlayIcon, CheckCircleIcon, TruckIcon, ArrowPathIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { getFeaturedProducts } from '../data/allProducts';
import ProductCard from '../components/ProductCard';

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
      <section className="relative h-[60vh] sm:h-[70vh] md:h-screen overflow-hidden">
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
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30" />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
              <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full">
                <div className="max-w-4xl">
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="space-y-4 sm:space-y-8"
                  >
                    <div>
                      <motion.h1
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-2xl sm:text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter leading-none text-white font-display"
                      >
                        {heroSlides[currentSlide].title}
                      </motion.h1>
                      <motion.h2
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-xs sm:text-sm md:text-lg lg:text-2xl xl:text-4xl font-light text-gray-300 tracking-wide mt-2 sm:mt-4 leading-relaxed"
                      >
                        {heroSlides[currentSlide].subtitle}
                      </motion.h2>
                    </div>

                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                      className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-300 max-w-2xl leading-relaxed font-light"
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
                        className="inline-flex items-center bg-accent text-white px-4 sm:px-6 lg:px-8 xl:px-12 py-2 sm:py-3 lg:py-4 font-bold text-xs sm:text-sm lg:text-base xl:text-lg tracking-wide hover:bg-accent-600 transition-all duration-300 transform hover:scale-105 shadow-glow rounded-xl"
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
            <div className="inline-block mb-2 sm:mb-3 lg:mb-6">
              <span className="text-xs sm:text-sm font-bold tracking-[0.3em] text-accent uppercase">
                Premium Collection
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-black mb-2 sm:mb-3 lg:mb-6 tracking-tight font-display">
              FEATURED
              <span className="block gradient-text">
                PRODUCTS
              </span>
            </h2>
            <p className="text-sm sm:text-base lg:text-xl text-gray-400 max-w-2xl mx-auto font-light">
              Engineered for excellence. Designed for champions. Discover our most coveted pieces.
            </p>
          </motion.div>

          {/* Enhanced Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {featuredProducts.slice(0, 4).map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                className="h-full"
              />
            ))}
          </div>

          {/* View All CTA */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12 sm:mt-16 lg:mt-20"
          >
            <Link
              to="/products"
              className="inline-block bg-gradient-to-r from-accent to-accent-600 text-white px-4 sm:px-6 lg:px-8 xl:px-12 py-2 sm:py-3 lg:py-4 font-bold text-sm sm:text-base lg:text-lg tracking-wide hover:from-accent-600 hover:to-accent-700 transition-all duration-300 transform hover:scale-105 shadow-glow rounded-xl"
            >
              VIEW ALL PRODUCTS
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Trust & Credibility Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white text-black">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-4 tracking-tight">
              WHY CHOOSE
              <span className="block text-accent">
                SIWACH ENTERPRISES
              </span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg">
              Your satisfaction is our priority. We're committed to delivering excellence in every aspect.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                icon: CheckCircleIcon,
                title: '100% Secure Checkout',
                description: 'SSL encrypted payments with multiple secure payment options'
              },
              {
                icon: ArrowPathIcon,
                title: 'Easy 30-Day Returns',
                description: 'Hassle-free returns and exchanges within 30 days'
              },
              {
                icon: TruckIcon,
                title: 'Free Shipping ₹999+',
                description: 'Complimentary shipping on orders above ₹999 across India'
              },
              {
                icon: PhoneIcon,
                title: '24/7 Customer Support',
                description: 'Dedicated support team available via WhatsApp and email'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                  <feature.icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <span className="text-sm font-bold tracking-[0.3em] text-accent uppercase mb-4 block">
                  Our Journey
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black mb-6 tracking-tight">
                  BUILT FOR THE
                  <span className="block text-accent">
                    BOLD
                  </span>
                </h2>
              </div>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-base sm:text-lg">
                  <strong className="text-black">Started in India. Built for the world.</strong> Siwach Enterprises 
                  emerged from Mumbai with a vision to create premium sportswear that embodies the spirit of Indian athletes.
                </p>
                
                <p>
                  We don't just manufacture products; we engineer experiences. Every stitch tells a story of 
                  innovation, every design embodies the fusion of traditional craftsmanship with cutting-edge technology.
                </p>
                
                <p>
                  From local training grounds to international arenas, Siwach has become synonymous with 
                  <strong className="text-accent"> performance</strong>, 
                  <strong className="text-black"> authenticity</strong>, and 
                  <strong className="text-accent"> bold ambition</strong>.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-6">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-black text-accent mb-2">2019</div>
                  <div className="text-xs sm:text-sm text-gray-600 uppercase tracking-wider">Founded</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-black text-black mb-2">100K+</div>
                  <div className="text-xs sm:text-sm text-gray-600 uppercase tracking-wider">Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-black text-accent mb-2">500+</div>
                  <div className="text-xs sm:text-sm text-gray-600 uppercase tracking-wider">Products</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                  alt="Siwach Athletes Training"
                  className="w-full h-96 sm:h-[500px] object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-2xl" />
                
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-6 right-6 bg-white text-black px-4 py-2 font-bold tracking-wider rounded-lg shadow-lg"
                >
                  MADE IN INDIA
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-8 sm:py-12 lg:py-24 bg-black relative">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-6 sm:mb-8 lg:mb-20"
          >
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-black mb-2 sm:mb-3 lg:mb-6 tracking-tight font-display">
              SHOP BY
              <span className="block gradient-text">
                CATEGORY
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-8">
            {[
              {
                name: "Men's Collection",
                image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
                href: '/products?category=men',
                description: 'Engineered for peak performance',
                stats: '200+ Products'
              },
              {
                name: "Women's Collection",
                image: 'https://images.pexels.com/photos/7432771/pexels-photo-7432771.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
                href: '/products?category=women',
                description: 'Where elegance meets power',
                stats: '150+ Products'
              },
              {
                name: 'Tech Collection',
                image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
                href: '/products?category=tech',
                description: 'Revolutionary technology',
                stats: '50+ Products'
              }
            ].map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden card-premium h-32 sm:h-40 lg:h-48 xl:h-64"
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

                  <div className="relative z-10 h-full flex items-end p-3 sm:p-4 lg:p-6">
                    <div>
                      <div className="text-xs text-accent uppercase tracking-wider font-bold mb-1">
                        {category.stats}
                      </div>
                      <h3 className="text-sm sm:text-lg lg:text-xl xl:text-2xl font-black text-white group-hover:text-accent transition-colors duration-300 mb-1 sm:mb-2">
                        {category.name}
                      </h3>
                      <p className="text-gray-300 mb-1 sm:mb-2 lg:mb-3 text-xs sm:text-sm">
                        {category.description}
                      </p>
                      <div className="flex items-center text-accent group-hover:text-white transition-colors duration-300">
                        <span className="font-bold text-xs sm:text-sm">EXPLORE</span>
                        <ChevronRightIcon className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-accent/10 via-white to-accent/5">
        <div className="max-w-4xl mx-auto text-center px-3 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black mb-4 tracking-tight">
                STAY IN THE
                <span className="block text-accent">
                  LOOP
                </span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg">
                Get exclusive access to new releases, special offers, and insider content. 
                Join 10K+ athletes who never miss a drop.
              </p>
            </div>

            <form className="max-w-lg mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-6 py-4 bg-white border-2 border-gray-200 text-black placeholder-gray-500 focus:outline-none focus:border-accent transition-colors duration-300 rounded-xl"
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-accent text-white font-bold hover:bg-accent-600 transition-colors duration-300 rounded-xl"
                >
                  SUBSCRIBE
                </button>
              </div>
            </form>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-600 text-sm">
              <div className="flex items-center gap-2">
                <span>✅</span>
                <span>Early access to sales</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🎁</span>
                <span>Exclusive member discounts</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📱</span>
                <span>New product alerts</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-12 lg:py-24 bg-gradient-to-br from-accent/20 via-black to-black relative overflow-hidden">
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black mb-3 sm:mb-4 lg:mb-6 font-display">
              READY TO ELEVATE
              <span className="block gradient-text">
                YOUR GAME?
              </span>
            </h2>
            <p className="text-sm sm:text-base lg:text-xl text-gray-300 mb-4 sm:mb-6 lg:mb-8 max-w-2xl mx-auto font-light">
              Join thousands of athletes who trust our premium gear to push their limits and achieve greatness.
            </p>
            <Link
              to="/products"
              className="inline-block bg-gradient-to-r from-accent to-accent-600 text-white px-4 sm:px-6 lg:px-8 xl:px-12 py-2 sm:py-3 lg:py-4 text-sm sm:text-base lg:text-xl font-bold tracking-wide hover:from-accent-600 hover:to-accent-700 transition-all duration-300 transform hover:scale-105 shadow-glow-lg rounded-xl"
            >
              SHOP ALL PRODUCTS
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}