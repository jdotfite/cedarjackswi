'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Define navigation links in one place
  const navLinks = [
    { href: "/reservation", label: "Private Events" },
    { href: "/drinks", label: "Drinks" },
    { href: "/bites", label: "Bites" },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!mobileMenuOpen) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuOpen && !(event.target as Element).closest('.mobile-menu') && 
          !(event.target as Element).closest('.mobile-menu-button')) {
        setMobileMenuOpen(false);
      }
    };
    
    // Add a class to prevent scrolling when menu is open
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header className={`bg-black shadow-sm border-b border-gray-800 sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'py-1' : 'py-2'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-white font-oswald">
              <img 
                src="/images/logo-cedar-jacks.svg" 
                alt="Cedar Jacks Logo" 
                className="h-14 transition-all" 
              />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className="text-white hover:text-gray-300 text-xl uppercase font-semibold tracking-wide transition-colors duration-200 font-oswald"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              className="text-gray-300 hover:text-white mobile-menu-button focus:outline-none relative z-50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <div className="flex flex-col justify-center space-y-1.5">
                <span className={`block w-6 h-0.75 bg-white transform transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
                <span className={`block w-6 h-0.75 bg-white transform transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`block w-6 h-0.75 bg-white transform transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Drawer */}
      <div 
        className={`mobile-menu fixed top-0 right-0 h-full w-64 bg-black shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b border-gray-800">
            <span className="text-white text-xl font-semibold uppercase tracking-wide font-oswald">MENU</span>
            <button 
              className="text-white hover:text-gray-300 focus:outline-none"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex flex-col py-4 overflow-y-auto flex-1">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className="text-white hover:text-gray-300 hover:bg-gray-900 px-4 py-3 text-xl uppercase font-semibold tracking-wider font-oswald"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label.toUpperCase()}
              </Link>
            ))}
          </div>
          
          <div className="border-t border-gray-800 p-4">
            <Link 
              href="/reservation"
              className="block bg-orange-600 hover:bg-orange-700 text-white text-center py-2 px-4 rounded-md transition-colors uppercase font-semibold tracking-wider text-xl font-oswald"
              onClick={() => setMobileMenuOpen(false)}
            >
              RESERVE NOW
            </Link>
          </div>
        </div>
      </div>
      
      {/* Removed full-screen overlay to prevent page from going black */}
      {/* Instead of overlay, we'll just add a drop shadow to the menu drawer */}
    </header>
  );
}
