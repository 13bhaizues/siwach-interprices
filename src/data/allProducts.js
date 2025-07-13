// Unified Product Collection for Siwach Enterprises
// Merging products.js and enhancedProducts.js with proper categorization

import { allProducts as baseProducts } from './products';
import { enhancedProducts } from './enhancedProducts';

// Enhanced products with proper categorization mapping
const categorizedEnhancedProducts = enhancedProducts.map(product => ({
  ...product,
  // Map enhanced product categories to base product structure
  category: product.category === 'men' ? 'running' : 
           product.category === 'women' ? 'training' : 
           product.category === 'tech' ? 'tech' : 
           product.category,
  // Add gender property for filtering
  gender: product.category === 'men' ? 'men' : 
          product.category === 'women' ? 'women' : 
          'unisex',
  // Add section property for menu filtering
  section: product.category === 'tech' ? 'tech' : 
           product.category === 'men' ? 'men' : 
           product.category === 'women' ? 'women' : 
           'unisex',
  // Ensure all products have required fields
  rating: product.reviews?.length > 0 
    ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length 
    : 4.5,
  reviews: product.reviews?.length || Math.floor(Math.random() * 500) + 100,
  inStock: product.inStock !== undefined ? product.inStock : true,
  featured: product.featured || false,
  // Add badge if not present
  badge: product.badge || (product.featured ? '🔥 Bestseller' : '✅ Verified'),
  // Ensure imageSrc is available for compatibility
  imageSrc: product.image || product.imageSrc
}));

// Base products with enhanced metadata
const categorizedBaseProducts = baseProducts.map(product => ({
  ...product,
  // Add gender property based on category analysis
  gender: product.category === 'running' || product.category === 'training' || product.category === 'basketball' || product.category === 'soccer' ? 
          (product.name.toLowerCase().includes('women') || product.name.toLowerCase().includes('ladies') ? 'women' : 'men') :
          product.category === 'lifestyle' ? 'unisex' :
          product.category === 'tech' ? 'unisex' : 'men',
  // Add section property
  section: product.category === 'tech' ? 'tech' :
           (product.name.toLowerCase().includes('women') || product.name.toLowerCase().includes('ladies') ? 'women' : 'men'),
  // Ensure image compatibility
  image: product.imageSrc || product.image,
  // Add enhanced fields if missing
  fullDescription: product.description,
  specifications: {
    'Material': 'Premium synthetic materials',
    'Weight': '280g average',
    'Warranty': '1 Year',
    'Origin': 'Made in India'
  },
  features: [
    'Premium construction',
    'Comfortable fit',
    'Durable materials',
    'Professional grade'
  ],
  sizes: product.category === 'tech' ? ['One Size'] : ['7', '8', '9', '10', '11', '12'],
  deliveryEstimate: 'Arrives in 2-3 days',
  returnPolicy: '30-day free returns',
  warranty: '1 Year Manufacturer Warranty'
}));

// Merge all products ensuring no duplicates
const mergedProductIds = new Set();
export const allProducts = [
  ...categorizedEnhancedProducts.filter(product => {
    if (mergedProductIds.has(product.id)) return false;
    mergedProductIds.add(product.id);
    return true;
  }),
  ...categorizedBaseProducts.filter(product => {
    if (mergedProductIds.has(product.id)) return false;
    mergedProductIds.add(product.id);
    return true;
  })
];

// Helper functions for filtering
export const getProductsByCategory = (category) => {
  if (category === 'all') return allProducts;
  return allProducts.filter(product => product.category === category);
};

export const getProductsByGender = (gender) => {
  if (gender === 'all') return allProducts;
  return allProducts.filter(product => product.gender === gender);
};

export const getProductsBySection = (section) => {
  if (section === 'all') return allProducts;
  return allProducts.filter(product => product.section === section);
};

export const getFeaturedProducts = () => {
  return allProducts.filter(product => product.featured);
};

export const getProductById = (id) => {
  return allProducts.find(product => product.id === parseInt(id));
};

export const searchProducts = (query) => {
  return allProducts.filter(product => 
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase()) ||
    (product.fullDescription && product.fullDescription.toLowerCase().includes(query.toLowerCase())) ||
    (product.tags && product.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())))
  );
};

export const getProductsByPriceRange = (min, max) => {
  return allProducts.filter(product => product.price >= min && product.price <= max);
};

export const getProductsByBadge = (badge) => {
  return allProducts.filter(product => product.badge?.includes(badge));
};

export const getBestsellerProducts = () => {
  return allProducts.filter(product => product.badge?.includes('Bestseller') || product.badge?.includes('🔥'));
};

export const getNewProducts = () => {
  return allProducts.filter(product => product.badge?.includes('New') || product.badge?.includes('🆕'));
};

export const getPremiumProducts = () => {
  return allProducts.filter(product => product.badge?.includes('Premium') || product.badge?.includes('💎'));
};

export const getTechProducts = () => {
  return allProducts.filter(product => product.category === 'tech' || product.section === 'tech');
};

export const getMenProducts = () => {
  return allProducts.filter(product => product.gender === 'men' || product.section === 'men');
};

export const getWomenProducts = () => {
  return allProducts.filter(product => product.gender === 'women' || product.section === 'women');
};

export const getProductRecommendations = (productId, limit = 4) => {
  const currentProduct = getProductById(productId);
  if (!currentProduct) return [];
  
  return allProducts
    .filter(product => 
      product.id !== productId && 
      (product.category === currentProduct.category || 
       product.gender === currentProduct.gender || 
       product.featured)
    )
    .slice(0, limit);
};

// Enhanced search with multiple criteria
export const searchEnhancedProducts = (query) => {
  return searchProducts(query);
};

// Get enhanced products (for backward compatibility)
export const getEnhancedProductsByCategory = (category) => {
  return getProductsByCategory(category);
};

export const getEnhancedFeaturedProducts = () => {
  return getFeaturedProducts();
};

export const getEnhancedProductById = (id) => {
  return getProductById(id);
};

// Statistics
export const getProductStats = () => {
  return {
    total: allProducts.length,
    men: getMenProducts().length,
    women: getWomenProducts().length,
    tech: getTechProducts().length,
    featured: getFeaturedProducts().length,
    categories: [...new Set(allProducts.map(p => p.category))].length
  };
};

console.log('Product Stats:', getProductStats());