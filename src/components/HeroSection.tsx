'use client';
import React from 'react';
import { storyblokEditable, SbBlokData } from '@storyblok/react';

interface HeroSectionBlok extends SbBlokData {
  component: 'hero_section';
  title?: string;
  subtitle?: string;
  heading?: string;
  subheading?: string;
  pre_heading?: string;
  description?: string;
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

  // Get the title from either field
  const displayTitle = blok.heading || blok.title;
  // Get the subtitle/description from available fields
  const displaySubtitle = blok.description || blok.subtitle || blok.subheading;

  return (
    <div 
      {...storyblokEditable(blok)} 
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        minHeight: '100dvh',
        backgroundImage: blok.background_image?.filename 
          ? `url(${blok.background_image.filename})` 
          : 'linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url("https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80")'
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/80"></div>
      
      {/* Content */}
      <div className="relative z-10 text-left text-white p-8 max-w-6xl mx-auto">
        {blok.pre_heading && (
          <p className="font-quentin tracking-widest text-[45px] leading-[0.8] block text-orange-500 mb-4">
            {blok.pre_heading}
          </p>
        )}
        <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-wide mb-6 font-oswald">
          {formatTitleWithOrangePeriod(displayTitle || 'RESERVE THE BASEMENT')}
        </h1>
        {displaySubtitle && (
          <p className="text-xl md:text-2xl leading-relaxed font-roboto">
            {displaySubtitle}
          </p>
        )}
      </div>
    </div>
  );
}
