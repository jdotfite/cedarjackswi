'use client';
import React from 'react';
import { storyblokEditable, SbBlokData } from '@storyblok/react';

interface SpaceInfoBlok extends SbBlokData {
  component: 'space_info';
  title?: string;
  description?: string;
  capacity?: string;
  features?: string[];
  amenities?: string[];
  pricing_note?: string;
  availability_note?: string;
}

interface SpaceInfoProps {
  blok?: SpaceInfoBlok;
  className?: string;
}

export default function SpaceInfo({ blok, className = "" }: SpaceInfoProps) {
  // Default content for when Storyblok data isn't available
  const defaultContent = {
    title: "Our Private Speakeasy",
    description: "Step into our exclusive basement speakeasy, a hidden gem perfect for intimate gatherings and private events. This carefully curated space captures the essence of the Prohibition era with modern comfort and amenities.",
    capacity: "Up to 25 guests",
    features: [
      "Vintage-inspired décor and ambiance",
      "Private bar with premium spirits",
      "Professional sound system",
      "Ambient lighting controls",
      "Climate-controlled environment",
      "Private entrance and exit"
    ],
    amenities: [
      "Dedicated bartender service available",
      "Customizable cocktail menu",
      "Small plates and appetizer options",
      "Reserved parking spaces",
      "Coat check service",
      "Photo-friendly atmosphere"
    ],
    pricing_note: "Pricing varies based on group size, duration, and services requested.",
    availability_note: "Available Wednesday through Saturday evenings. Advance booking required."
  };

  const content = blok || defaultContent;

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
    <div {...(blok ? storyblokEditable(blok) : {})} className={`bg-black text-white font-oswald ${className}`}>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold uppercase mb-6 text-left">
            {formatTitleWithOrangePeriod(content.title || "Our Private Speakeasy")}
          </h2>
          
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-12 text-left max-w-3xl">
            {content.description}
          </p>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Capacity and Basic Info */}
            <div>
              <h3 className="text-2xl font-semibold uppercase mb-6 text-orange-500">
                Space Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-orange-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-lg">{content.capacity}</span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-2xl font-semibold uppercase mb-6 text-orange-500">
                Features
              </h3>
              <ul className="space-y-3">
                {content.features?.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-orange-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Amenities */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold uppercase mb-6 text-orange-500 text-left">
              Available Services
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {content.amenities?.map((amenity, index) => (
                <div key={index} className="flex items-start bg-neutral-900 p-4 rounded-lg">
                  <svg className="w-5 h-5 text-orange-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-neutral-900 p-6 rounded-lg">
            <h3 className="text-xl font-semibold uppercase mb-4 text-orange-500">
              Important Information
            </h3>
            <div className="space-y-3 text-gray-300">
              <p>
                <strong className="text-white">Availability:</strong> {content.availability_note}
              </p>
              <p>
                <strong className="text-white">Pricing:</strong> {content.pricing_note}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
