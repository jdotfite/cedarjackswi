'use client';
import React from 'react';
import { storyblokEditable, SbBlokData } from '@storyblok/react';

interface HeroSectionBlok extends SbBlokData {
  component: 'hero_section';
  title: string;
  subtitle?: string;
  background_image?: {
    filename: string;
    alt: string;
  };
}

export default function HeroSection({ blok }: { blok: HeroSectionBlok }) {
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

  return (
    <div 
      {...storyblokEditable(blok)} 
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: blok.background_image?.filename 
          ? `url(${blok.background_image.filename})` 
          : 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("/api/placeholder/1200/800")'
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white p-8 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-wide mb-6 font-quentin">
          {formatTitleWithOrangePeriod(blok.title || 'RESERVE THE BASEMENT')}
        </h1>
        {blok.subtitle && (
          <p className="text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto">
            {blok.subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
