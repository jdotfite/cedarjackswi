'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Squash as Hamburger } from 'hamburger-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Define navigation links in one place
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-150 ${
      scrolled 
        ? 'bg-black/95 backdrop-blur-sm shadow-lg' 
        : 'bg-black'
    }`}>
      <div className="container mx-auto px-8">
        <nav className="flex items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 z-50">
            <img 
              src="/images/logo-cedar-jacks.svg" 
              alt="Cedar Jacks Logo" 
              className="h-12 transition-all" 
            />
          </Link>
          
          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center justify-end space-x-8 flex-1 ml-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href} 
                  className="relative text-white text-lg font-medium tracking-wide transition-colors duration-200 font-oswald uppercase hover:text-orange-500 group"
                >
                  {link.label}
                  <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-orange-500 transition-all duration-150 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>
          
          {/* Hamburger Menu */}
          <div className="md:hidden ml-auto z-50">
            <Hamburger 
            toggled={mobileMenuOpen} 
            toggle={setMobileMenuOpen} 
            duration={0.3}
            color="white"
            size={24}
          />
        </div>
      </nav>
      </div>
      
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black flex items-center justify-center md:hidden">
          <ul className="flex flex-col items-center space-y-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href} 
                  className="text-white text-2xl font-medium tracking-wide transition-colors duration-200 font-oswald uppercase hover:text-orange-500"
                  onClick={closeMobileMenu}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
