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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 justify-items-center">
          {blok.footer_sections?.map((section) => (
            <div key={section._uid} className="max-w-xs w-full md:max-w-none md:w-auto text-left flex flex-col justify-end">
              <StoryblokComponent blok={section} />
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}