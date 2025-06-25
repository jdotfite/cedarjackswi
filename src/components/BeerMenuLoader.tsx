'use client';
import React, { useEffect, useState } from 'react';
import { getStoryblokApi } from '@/lib/storyblok';
import { storyblokEditable, SbBlokData, ISbStoryData } from '@storyblok/react';
import { Button } from './Button';

interface BeerItem {
  _uid: string;
  component: 'beer_item';
  name: string;
  description: string;
  price: string;
  logo?: {
    filename: string;
    alt?: string;
  };
}

interface BeerMenuData {
  title: string;
  subtitle: string;
  beers: BeerItem[];
  component: 'beer_list';
}

interface BeerMenuLoaderBlok extends SbBlokData {
  component: 'beer_menu_loader';
  menu_story_slug?: string;
  show_view_menu_button?: boolean;
  menu_button_text?: string;
  menu_button_link?: {
    cached_url: string;
  };
}

const BeerMenuLoader: React.FC<{ blok: BeerMenuLoaderBlok }> = ({ blok }) => {
  const [beerData, setBeerData] = useState<BeerMenuData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBeerMenu = async () => {
      try {
        const storyblokApi = getStoryblokApi();
        const slug = blok.menu_story_slug || 'beer-menu';
        
        const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
          version: 'draft'
        });
        
        setBeerData(data.story.content);
      } catch (error) {
        console.error('Error fetching beer menu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBeerMenu();
  }, [blok.menu_story_slug]);

  if (loading) {
    return (
      <section className="bg-black text-white py-16">
        <div className="max-w-6xl mx-auto px-8 text-center">
          <p className="text-gray-400">Loading beer menu...</p>
        </div>
      </section>
    );
  }

  if (!beerData) {
    return (
      <section className="bg-black text-white py-16">
        <div className="max-w-6xl mx-auto px-8 text-center">
          <p className="text-gray-400">Beer menu not found</p>
        </div>
      </section>
    );
  }

  return (
    <section 
      {...storyblokEditable(blok)} 
      className="bg-black text-white py-16" 
      style={{ fontFamily: 'Oswald, sans-serif' }}
    >
      <div className="max-w-6xl mx-auto px-8">
        {/* Header - Using your original styling */}
        <div className="text-center mb-12">
          <h2>
            <span className="italic text-orange-400 text-[45px] block mb-2 font-quentin leading-[0.8]">
              {beerData.subtitle}
            </span>
            <span className="uppercase font-bold text-4xl md:text-6xl tracking-wide">
              {beerData.title}
            </span>
          </h2>
        </div>

        {/* Beer List - Using your original menu-style layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-6">
          {beerData.beers.map((beer) => (
            <div key={beer._uid} className="flex items-start">
              {/* Logo */}
              <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center mr-4">
                {beer.logo?.filename ? (
                  <img
                    src={beer.logo.filename}
                    alt={beer.name}
                    className="w-10 h-10 object-contain"
                  />
                ) : (
                  <span className="text-2xl">🍺</span>
                )}
              </div>
              
              {/* Details */}
              <div className="flex-1 min-w-0">
                {/* Name, dots, and price row */}
                <div className="flex items-baseline">
                  <h3 className="uppercase font-bold text-lg tracking-wide whitespace-nowrap">
                    {beer.name}
                  </h3>
                  
                  <div className="relative table-cell h-[2px] w-[98%] border-b-2 border-dotted border-white mx-2 z-10"></div>
                  
                  <span className="font-bold text-lg whitespace-nowrap">
                    ${beer.price}
                  </span>
                </div>
                
                {/* Description */}
                {beer.description && (
                  <p className="text-orange-400 text-sm leading-tight" style={{ fontFamily: 'var(--font-body)' }}>
                    {beer.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Button */}
        {blok.show_view_menu_button && (
          <div className="text-center mt-12">
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

export default BeerMenuLoader;
