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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {blok.footer_sections?.map((section, index) => {
            // Define flex classes based on column position
            let flexClass = '';
            if (index === 0) {
              flexClass = 'flex justify-start'; // First column: flex start (left)
            } else if (index === 1 || index === 2) {
              flexClass = 'flex justify-center'; // Middle columns: flex center
            } else if (index === 3) {
              flexClass = 'flex justify-end'; // Last column: flex end (right)
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