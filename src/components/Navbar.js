// ──────────────────────────────────────────────────────────
//  Navbar.js   (src/components/Navbar.js)
// ──────────────────────────────────────────────────────────
import React, { Fragment, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import {
  ShoppingBagIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { logout } from '../store/authSlice';

import CartDrawer from './CartDrawer';
import MegaMenu from './MegaMenu';
import SearchBar from './SearchBar';

// 👉  default‑import so braces aren’t required
//    (adjust path to ../../hooks/... if Navbar is nested deeper)
import { useNavigationHistory } from '../hooks/useNavigationHistory';



const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Men', href: '/products?category=men' },
  { name: 'Women', href: '/products?category=women' },
  { name: 'Tech', href: '/products?category=tech' },
  { name: 'New', href: '/products?category=new' },
];

export default function Navbar() {
  const dispatch          = useDispatch();
  const location          = useLocation();
  const cartItems         = useSelector((s) => s.cart.totalQuantity);
  const { isAuthenticated } = useSelector((s) => s.auth);

  const [isScrolled,   setIsScrolled]   = useState(false);
  const [isCartOpen,   setIsCartOpen]   = useState(false);
  const [activeMenu,   setActiveMenu]   = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { canGoBack, canGoForward, goBack, goForward } = useNavigationHistory();

  /* ── Scroll shadow / blur ── */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Helpers ── */
  const handleLogout = () => dispatch(logout());

  const isActive = (href) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href) || location.search.includes(href.split('?')[1]);
  };

  const handleMenuHover = (m) => setActiveMenu(m);
  const handleMenuLeave = () => setActiveMenu(null);

  /* ─────────────────────────────────────────────────────── */
  return (
    <>
      <Disclosure
        as="nav"
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-black/95 backdrop-blur-md shadow-2xl border-b border-gray-800'
            : 'bg-transparent'
        }`}
      >
        {({ open }) => (
          <>
            {/* Top bar */}
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
              <div className="flex justify-between h-12 sm:h-16 items-center">

                {/* ◀ ▶ History buttons */}
                <div className="hidden sm:flex items-center gap-1 mr-4">
                  {/* Back */}
                  <button
                    onClick={goBack}
                    disabled={!canGoBack}
                    className={`group p-2 rounded-lg transition-all duration-300 ${
                      canGoBack
                        ? 'text-white hover:bg-white/10 hover:backdrop-blur-sm'
                        : 'text-gray-600 opacity-50 cursor-not-allowed'
                    }`}
                    title="Back (Alt + ←)"
                  >
                    <ChevronLeftIcon className="h-5 w-5" />
                    <span className="sr-only">Back</span>
                  </button>

                  {/* Forward */}
                  <button
                    onClick={goForward}
                    disabled={!canGoForward}
                    className={`group p-2 rounded-lg transition-all duration-300 ${
                      canGoForward
                        ? 'text-white hover:bg-white/10 hover:backdrop-blur-sm'
                        : 'text-gray-600 opacity-50 cursor-not-allowed'
                    }`}
                    title="Forward (Alt + →)"
                  >
                    <ChevronRightIcon className="h-5 w-5" />
                    <span className="sr-only">Forward</span>
                  </button>
                </div>

                {/* Logo */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex-shrink-0"
                >
                  <Link to="/" className="flex items-center group">
                    <span className="text-xl sm:text-2xl font-black text-white tracking-tighter group-hover:text-blue-400 transition-colors duration-300">
                      SIWACH
                    </span>
                  </Link>
                </motion.div>

                {/* Desktop nav links */}
                <div className="hidden lg:flex lg:space-x-8">
                  {navigation.map((item, i) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      onMouseEnter={() => item.name !== 'Home' && handleMenuHover(item.name.toLowerCase())}
                      onMouseLeave={handleMenuLeave}
                    >
                      <Link
                        to={item.href}
                        className={`px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium uppercase tracking-wider transition-all duration-300 relative group ${
                          isActive(item.href) ? 'text-blue-400' : 'text-white hover:text-blue-400'
                        }`}
                      >
                        {item.name}
                        <span
                          className={`absolute bottom-0 left-0 h-0.5 bg-blue-400 transition-all duration-300 ${
                            isActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full'
                          }`}
                        />
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Right‑side icons */}
                <div className="hidden sm:flex sm:items-center sm:space-x-2 lg:space-x-4">
                  {/* Search */}
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    onClick={() => setIsSearchOpen(true)}
                    className="p-1.5 sm:p-2 text-white hover:text-blue-400 transition-all duration-300 transform hover:scale-110"
                  >
                    <MagnifyingGlassIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </motion.button>

                  {/* Cart */}
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    onClick={() => setIsCartOpen(true)}
                    className="relative p-1.5 sm:p-2 text-white hover:text-blue-400 transition-all duration-300 transform hover:scale-110 group"
                  >
                    <ShoppingBagIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                    {cartItems > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-black bg-blue-400 rounded-full group-hover:bg-white transition-colors duration-300"
                      >
                        {cartItems}
                      </motion.span>
                    )}
                  </motion.button>

                  {/* User / auth */}
                  {isAuthenticated ? (
                    <Menu as="div" className="relative">
                      <Menu.Button className="bg-transparent rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 p-1.5 sm:p-2 hover:bg-white/10 transition-colors duration-300">
                        <UserIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-lg shadow-2xl py-1 bg-black border border-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none backdrop-blur-md">
                          <Menu.Item>
                            <Link
                              to="/profile"
                              className="block px-4 py-2 text-sm text-white hover:bg-gray-800 transition-colors duration-200"
                            >
                              Your Profile
                            </Link>
                          </Menu.Item>
                          <Menu.Item>
                            <button
                              onClick={() => dispatch(logout())}
                              className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-800 transition-colors duration-200"
                            >
                              Sign out
                            </button>
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                    >
                      <Link
                        to="/login"
                        className="bg-white text-black px-3 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                      >
                        SIGN IN
                      </Link>
                    </motion.div>
                  )}
                </div>

                {/* Mobile buttons */}
                <div className="sm:hidden flex items-center space-x-2">
                  {/* Mobile cart */}
                  <button
                    onClick={() => setIsCartOpen(true)}
                    className="relative p-1.5 text-white hover:text-blue-400 transition-colors duration-300"
                  >
                    <ShoppingBagIcon className="h-5 w-5" />
                    {cartItems > 0 && (
                      <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-black bg-blue-400 rounded-full">
                        {cartItems}
                      </span>
                    )}
                  </button>

                  {/* Hamburger */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-1.5 rounded-md text-white hover:text-blue-400 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-300">
                    {open ? (
                      <XMarkIcon className="block h-5 w-5" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-5 w-5" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            {/* Mobile nav links */}
            <Disclosure.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-black/95 backdrop-blur-md border-t border-gray-800">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-3 py-2 text-base font-medium uppercase tracking-wider transition-colors duration-300 ${
                      isActive(item.href)
                        ? 'text-blue-400 bg-gray-800'
                        : 'text-white hover:text-blue-400 hover:bg-gray-800'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                {!isAuthenticated && (
                  <div className="border-t border-gray-800 pt-4 mt-4">
                    <Link
                      to="/login"
                      className="text-white hover:text-blue-400 block px-3 py-2 text-base font-medium transition-colors duration-300"
                    >
                      Sign In
                    </Link>
                  </div>
                )}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      {/* Other overlays */}
      <MegaMenu  activeMenu={activeMenu} onClose={handleMenuLeave} />
      <CartDrawer isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
      <SearchBar  isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
