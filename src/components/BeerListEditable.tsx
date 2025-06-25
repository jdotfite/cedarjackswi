'use client';
import React from 'react';
import { storyblokEditable, SbBlokData } from '@storyblok/react';
import { Button } from './Button';

interface BeerItem extends SbBlokData {
  _uid: string;
  component: 'beer_item';
  name: string;
  description: string;
  abv: string;
  ibu: string;
  style: string;
  price: string;
  image?: {
    filename: string;
    alt?: string;
  };
}

interface BeerListBlok extends SbBlokData {
  component: 'beer_list' | 'beer_section';
  title?: string;
  subtitle?: string;
  beers?: BeerItem[];
  show_view_menu_button?: boolean;
  menu_button_text?: string;
  menu_button_link?: {
    cached_url: string;
  };
}

const BeerList: React.FC<{ blok: BeerListBlok }> = ({ blok }) => {
  console.log('BeerList blok:', blok);

  return (
    <section 
      {...storyblokEditable(blok)} 
      className="bg-black text-white py-16" 
      style={{ fontFamily: 'Oswald, sans-serif' }}
    >
      <div className="max-w-6xl mx-auto px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-orange-400">
            {blok.title || 'Our Craft Beer Selection'}
          </h2>
          {blok.subtitle && (
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {blok.subtitle}
            </p>
          )}
        </div>        {/* Beer Grid */}
        {blok.beers && blok.beers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {blok.beers.map((beer) => (
              <div
                key={beer._uid}
                {...storyblokEditable(beer)}
                className="bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition-colors"
              >
                {beer.image && (
                  <div className="mb-4">
                    <img
                      src={beer.image.filename}
                      alt={beer.image.alt || beer.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
                
                <h3 className="text-2xl font-bold mb-2 text-orange-400">
                  {beer.name}
                </h3>
                
                {beer.style && (
                  <p className="text-gray-400 mb-2 text-sm uppercase tracking-wide">
                    {beer.style}
                  </p>
                )}
                
                {beer.description && (
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {beer.description}
                  </p>
                )}
                
                <div className="flex justify-between items-center text-sm">
                  <div className="flex space-x-4">
                    {beer.abv && (
                      <span className="text-orange-300">
                        <strong>ABV:</strong> {beer.abv}%
                      </span>
                    )}
                    {beer.ibu && (
                      <span className="text-orange-300">
                        <strong>IBU:</strong> {beer.ibu}
                      </span>
                    )}
                  </div>
                  {beer.price && (
                    <span className="text-white font-bold text-lg">
                      ${beer.price}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 py-12">
            <h3 className="text-xl mb-2">No beers configured</h3>
            <p>Add beer items in Storyblok to display your craft beer selection</p>
          </div>
        )}

        {/* View Menu Button */}
        {blok.show_view_menu_button && (
          <div className="text-center">
            <Button
              href={blok.menu_button_link?.cached_url || '/digital-menu'}
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-bold text-lg transition-colors"
            >
              {blok.menu_button_text || 'View Full Menu'}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BeerList;
