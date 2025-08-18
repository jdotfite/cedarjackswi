'use client';
import React from 'react';
import { storyblokEditable, SbBlokData } from '@storyblok/react';

interface ReservationHeroBlok extends SbBlokData {
  component: 'reservation_hero';
  pre_heading?: string;
  heading: string;
  subheading?: string;
  description?: string;
  background_image?: {
    filename: string;
    alt: string;
  };
}

interface ReservationHeroProps {
  blok?: ReservationHeroBlok;
  preHeading?: string;
  heading?: string;
  subheading?: string;
  description?: string;
  backgroundImage?: string;
  className?: string;
}

export default function ReservationHero({ 
  blok, 
  preHeading, 
  heading, 
  subheading, 
  description,
  backgroundImage,
  className = "" 
}: ReservationHeroProps) {
  
  // Format title with orange period
  const formatTitleWithOrangePeriod = (titleText: string) => {
    const baseTitle = titleText?.endsWith('.') ? titleText.slice(0, -1) : titleText;
    return (
      <>
        {baseTitle}
        <span className="text-orange-500">.</span>
      </>
    );
  };

  // Use blok data if available, otherwise use props
  const content = {
    preHeading: blok?.pre_heading || preHeading || '',
    heading: blok?.heading || heading || 'Reserve Your Space',
    subheading: blok?.subheading || subheading || 'Speakeasy Rental',
    description: blok?.description || description || 'Perfect for Private Events & Celebrations',
    backgroundImage: blok?.background_image?.filename || backgroundImage
  };

  return (
    <div 
      {...(blok ? storyblokEditable(blok) : {})}
      className={`relative min-h-screen flex items-center justify-center bg-cover bg-center ${className}`}
      style={{
        backgroundImage: content.backgroundImage 
          ? `url(${content.backgroundImage})` 
          : 'linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url("https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80")'
      }}
    >
      <div className="absolute inset-0 bg-black/80"></div>
      
      {/* Content container */}
      <div className="relative z-10 w-full max-w-2xl mx-auto p-6">
        <div className="text-white mb-8">
          {/* Pre-heading */}
          {content.preHeading && (
            <div className="font-quentin text-orange-500 text-2xl md:text-3xl mb-2">
              {content.preHeading}
            </div>
          )}
          
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-wide mb-4 font-oswald">
            {formatTitleWithOrangePeriod(content.heading)}
          </h1>
          
          {/* Subheading */}
          {content.subheading && (
            <h2 className="text-xl md:text-2xl text-white font-oswald font-light mb-4">
              {content.subheading}
            </h2>
          )}
          
          {/* Description */}
          {content.description && (
            <p className="text-lg md:text-xl leading-relaxed max-w-2xl font-roboto text-white/90">
              {content.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
