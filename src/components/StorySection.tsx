'use client';
import React from 'react';
import { storyblokEditable, SbBlokData } from '@storyblok/react';

interface StorySection extends SbBlokData {
  component: 'story_section';
  heading?: string;
  content: string;
  image?: {
    filename: string;
    alt: string;
  };
  layout?: 'image_left' | 'image_right' | 'text_only';
  background_color?: 'black' | 'gray' | 'dark_gray';
}

export default function StorySection({ blok }: { blok: StorySection }) {
  // Format heading with orange period
  const formatTitleWithOrangePeriod = (titleText: string) => {
    if (!titleText) return '';
    const baseTitle = titleText?.endsWith('.') ? titleText.slice(0, -1) : titleText;
    return (
      <>
        {baseTitle}
        <span className="text-orange-500">.</span>
      </>
    );
  };

  const backgroundClasses = {
    black: 'bg-black',
    gray: 'bg-neutral-900',
    dark_gray: 'bg-gray-800'
  };

  const bgClass = backgroundClasses[blok.background_color || 'black'];

  // Text only layout
  if (blok.layout === 'text_only' || !blok.image?.filename) {
    return (
      <section {...storyblokEditable(blok)} className={`${bgClass} py-16 lg:py-24`}>
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {blok.heading && (
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 font-oswald uppercase tracking-wide">
                {formatTitleWithOrangePeriod(blok.heading)}
              </h2>
            )}
            <div 
              className="text-lg md:text-xl leading-relaxed text-white/90 font-roboto space-y-6"
              dangerouslySetInnerHTML={{ __html: blok.content }}
            />
          </div>
        </div>
      </section>
    );
  }

  // Image with text layout
  const isImageLeft = blok.layout === 'image_left';
  
  return (
    <section {...storyblokEditable(blok)} className={`${bgClass} py-16 lg:py-24`}>
      <div className="container mx-auto px-6 lg:px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
          isImageLeft ? '' : 'lg:grid-flow-col-dense'
        }`}>
          {/* Image */}
          <div className={`${isImageLeft ? '' : 'lg:col-start-2'}`}>
            <div className="relative">
              <img 
                src={blok.image?.filename}
                alt={blok.image?.alt || ''}
                className="w-full h-64 lg:h-96 object-cover rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 bg-black/20 rounded-lg"></div>
            </div>
          </div>
          
          {/* Content */}
          <div className={`${isImageLeft ? '' : 'lg:col-start-1'}`}>
            {blok.heading && (
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-oswald uppercase tracking-wide">
                {formatTitleWithOrangePeriod(blok.heading)}
              </h2>
            )}
            <div 
              className="text-lg md:text-xl leading-relaxed text-white/90 font-roboto space-y-6"
              dangerouslySetInnerHTML={{ __html: blok.content }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
