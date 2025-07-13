import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

const megaMenuData = {
  men: {
    title: "Men's Collection",
    categories: [
      {
        name: 'Footwear',
        items: [
          { name: 'Running Shoes', href: '/products?category=running', image: 'https://source.unsplash.com/300x300/?mens-running-shoes' },
          { name: 'Training Shoes', href: '/products?category=training', image: 'https://source.unsplash.com/300x300/?mens-training-shoes' },
          { name: 'Lifestyle Sneakers', href: '/products?category=lifestyle', image: 'https://source.unsplash.com/300x300/?mens-lifestyle-sneakers' }
        ]
      },
      {
        name: 'Apparel',
        items: [
          { name: 'Hoodies & Sweatshirts', href: '/products?category=lifestyle', image: 'https://source.unsplash.com/300x300/?mens-hoodies' },
          { name: 'Training Shorts', href: '/products?category=training', image: 'https://source.unsplash.com/300x300/?mens-training-shorts' },
          { name: 'Performance Tees', href: '/products?category=training', image: 'https://source.unsplash.com/300x300/?mens-performance-tees' }
        ]
      }
    ],
    featured: {
      title: 'Featured Collection',
      subtitle: 'Velocity Pro Series',
      image: 'https://source.unsplash.com/400x400/?mens-premium-sneakers',
      href: '/products?category=men'
    }
  },
  women: {
    title: "Women's Collection",
    categories: [
      {
        name: 'Footwear',
        items: [
          { name: 'Running Shoes', href: '/products?category=women', image: 'https://source.unsplash.com/300x300/?womens-running-shoes' },
          { name: 'Training Shoes', href: '/products?category=women', image: 'https://source.unsplash.com/300x300/?womens-training-shoes' },
          { name: 'Lifestyle Sneakers', href: '/products?category=women', image: 'https://source.unsplash.com/300x300/?womens-lifestyle-sneakers' }
        ]
      },
      {
        name: 'Apparel',
        items: [
          { name: 'Sports Bras', href: '/products?category=women', image: 'https://source.unsplash.com/300x300/?womens-sports-bras' },
          { name: 'Leggings & Tights', href: '/products?category=women', image: 'https://source.unsplash.com/300x300/?womens-leggings' },
          { name: 'Training Jackets', href: '/products?category=women', image: 'https://source.unsplash.com/300x300/?womens-training-jackets' }
        ]
      }
    ],
    featured: {
      title: 'Featured Collection',
      subtitle: 'Stealth Training Series',
      image: 'https://source.unsplash.com/400x400/?womens-premium-sneakers',
      href: '/products?category=women'
    }
  },
  tech: {
    title: 'Tech Collection',
    categories: [
      {
        name: 'Wearables',
        items: [
          { name: 'Fitness Trackers', href: '/products?category=tech', image: 'https://source.unsplash.com/300x300/?fitness-trackers' },
          { name: 'Smart Watches', href: '/products?category=tech', image: 'https://source.unsplash.com/300x300/?smart-watches' },
          { name: 'Heart Rate Monitors', href: '/products?category=tech', image: 'https://source.unsplash.com/300x300/?heart-rate-monitors' }
        ]
      },
      {
        name: 'Audio',
        items: [
          { name: 'Wireless Earbuds', href: '/products?category=tech', image: 'https://source.unsplash.com/300x300/?wireless-earbuds' },
          { name: 'Sports Headphones', href: '/products?category=tech', image: 'https://source.unsplash.com/300x300/?sports-headphones' },
          { name: 'Bluetooth Speakers', href: '/products?category=tech', image: 'https://source.unsplash.com/300x300/?bluetooth-speakers' }
        ]
      }
    ],
    featured: {
      title: 'Featured Collection',
      subtitle: 'Quantum Series',
      image: 'https://source.unsplash.com/400x400/?premium-tech-gadgets',
      href: '/products?category=tech'
    }
  }
};

export default function MegaMenu({ activeMenu, onClose }) {
  if (!activeMenu || !megaMenuData[activeMenu]) return null;

  const menuData = megaMenuData[activeMenu];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-md border-t border-gray-800 shadow-2xl z-50"
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories */}
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-black text-white mb-8 tracking-tight">
              {menuData.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {menuData.categories.map((category, index) => (
                <div key={category.name}>
                  <h3 className="text-lg font-bold text-blue-400 mb-4 uppercase tracking-wider">
                    {category.name}
                  </h3>
                  <div className="space-y-3">
                    {category.items.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={onClose}
                        className="group flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-200"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover bg-gray-800 group-hover:scale-105 transition-transform duration-200"
                          loading="lazy"
                        />
                        <span className="flex-1">{item.name}</span>
                        <ChevronRightIcon className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Section */}
          <div className="lg:col-span-1">
            <Link
              to={menuData.featured.href}
              onClick={onClose}
              className="group block bg-gray-900 border border-gray-800 overflow-hidden hover:border-gray-600 transition-colors duration-300"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={menuData.featured.image}
                  alt={menuData.featured.subtitle}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <p className="text-xs text-blue-400 uppercase tracking-wider font-bold mb-2">
                  {menuData.featured.title}
                </p>
                <h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                  {menuData.featured.subtitle}
                </h4>
                <p className="text-sm text-gray-400 mt-2">
                  Explore the latest innovations
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}