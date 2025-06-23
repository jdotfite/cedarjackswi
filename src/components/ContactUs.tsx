'use client';
import React from 'react';
import { storyblokEditable, SbBlokData } from '@storyblok/react';

interface ContactUsBlok extends SbBlokData {
  component: 'contact_us';
  title: string;
  email: string;
  phone: string;
  address_line_1: string;
  address_line_2: string;
  city_state_zip: string;
  county: string;
  state: string;
  google_maps_url: {
    cached_url: string;
  };
}

export default function ContactUs({ blok }: { blok: ContactUsBlok }) {
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
    <div {...storyblokEditable(blok)} className="font-oswald">
      <h4 className="text-lg font-medium uppercase mb-4">{formatTitleWithOrangePeriod(blok.title)}</h4>
      <div className="space-y-2">
        {blok.email && (
          <p>
            <a 
              href={`mailto:${blok.email}`} 
              className="text-white hover:text-orange-500 transition-colors"
            >
              {blok.email}
            </a>
          </p>
        )}
        {blok.phone && (
          <p>
            <a 
              href={`tel:${blok.phone.replace(/\D/g, '')}`} 
              className="text-white hover:text-orange-500 transition-colors"
            >
              {blok.phone}
            </a>
          </p>
        )}
        {(blok.address_line_1 || blok.address_line_2 || blok.county || blok.state) && (
          <div className="mt-4">
            <a 
              href={blok.google_maps_url?.cached_url || '#'} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:text-orange-500 transition-colors"
            >
              {blok.address_line_1 && <p>{blok.address_line_1}</p>}
              {blok.address_line_2 && <p>{blok.address_line_2}</p>}
              {blok.county && <p className="mt-2">{blok.county}</p>}
              {blok.state && <p>{blok.state}</p>}
            </a>
          </div>
        )}
        {(!blok.email && !blok.phone && !blok.address_line_1 && !blok.address_line_2 && !blok.county && !blok.state) && (
          <p className="text-sm text-gray-400">Contact information not yet configured</p>
        )}
      </div>
    </div>
  );
}