'use client';
import React from 'react';
import { storyblokEditable, SbBlokData } from '@storyblok/react';

interface AboutHeroBlok extends SbBlokData {
  component: 'about_hero';
  title: string;
  subtitle?: string;
  description?: string;
  background_image?: {
    filename: string;
    alt: string;
  };
}

export default function AboutHero({ blok }: { blok: AboutHeroBlok }) {
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
          : 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80")'
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white p-8 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-wide mb-6 font-oswald">
          {formatTitleWithOrangePeriod(blok.title || 'About Cedar Jacks')}
        </h1>
        {blok.subtitle && (
          <h2 className="text-2xl md:text-3xl font-light mb-6 font-oswald text-orange-500">
            {blok.subtitle}
          </h2>
        )}
        {blok.description && (
          <p className="text-lg md:text-xl leading-relaxed max-w-4xl mx-auto font-roboto">
            {blok.description}
          </p>
        )}
      </div>
    </div>
  );
}
