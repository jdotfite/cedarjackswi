'use client';
import React from 'react';
import { StoryblokComponent, storyblokEditable, SbBlokData } from '@storyblok/react';

interface FooterBlok extends SbBlokData {
  component: 'footer' | 'Footer';
  footer_sections: SbBlokData[];
}

export default function Footer({ blok }: { blok: FooterBlok }) {
  return (
    <footer {...storyblokEditable(blok)} className="bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {blok.footer_sections?.map((section, index) => {
            // Define flex classes based on column position and screen size
            let flexClass = '';
            
            // Responsive alignment classes
            if (index === 0) {
              flexClass = 'flex justify-start'; // First column: left aligned on all screens
            } else if (index === 1) {
              flexClass = 'flex justify-start md:justify-start lg:justify-center'; // Second column: left on medium, center on large
            } else if (index === 2) {
              flexClass = 'flex justify-start md:justify-start lg:justify-center'; // Third column: left on medium, center on large
            } else if (index === 3) {
              flexClass = 'flex justify-start md:justify-start lg:justify-end'; // Fourth column: left on medium, right on large
            }

            return (
              <div key={section._uid} className={`w-full ${flexClass}`}>
                <div className="text-left">
                  <StoryblokComponent blok={section} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </footer>
  );
}