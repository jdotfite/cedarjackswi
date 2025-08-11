'use client';
import React, { useEffect, useState } from 'react';
import { storyblokEditable, SbBlokData } from '@storyblok/react';
import { Button } from './Button';
import { useResolvedStories } from '@/contexts/ResolvedStoriesContext';
import { getStoryblokApi } from '@/lib/storyblok';

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

interface BeerStoryContent {
  title: string;
  subtitle: string;
  beers: BeerItem[];
  component: 'beer_list';
}

interface ResolvedStory {
  content: BeerStoryContent;
  id: number;
  uuid: string;
  name: string;
  slug: string;
}

interface BeerListReferenceBlok extends SbBlokData {
  component: 'beer_list_reference';
  beer_list_story?: string[]; // Array of UUIDs
  show_view_menu_button?: boolean;
  menu_button_text?: string;
  menu_button_link?: {
    cached_url: string;
  };
}

interface BeerListReferenceProps {
  blok: BeerListReferenceBlok;
}

const BeerListReference: React.FC<BeerListReferenceProps> = ({ blok }) => {
  const { resolvedStories } = useResolvedStories();
  const [beerData, setBeerData] = useState<BeerStoryContent | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Get the first reference from the beer_list_story array
  const beerStoryRef = blok.beer_list_story?.[0];
  
  useEffect(() => {
    const fetchBeerData = async () => {
      try {
        if (!beerStoryRef) {
          console.log('No beer story reference found');
          setLoading(false);
          return;
        }

        // beerStoryRef should be a string (UUID)
        const targetUUID = beerStoryRef;
        
        console.log('BeerListReference Debug:');
        console.log('- beerStoryRef:', beerStoryRef);
        console.log('- targetUUID:', targetUUID);
        console.log('- resolvedStories available:', resolvedStories.length);
        
        // First try to find in resolved stories by UUID
        let referencedStory = resolvedStories.find(story => 
          story.uuid === targetUUID
        );
        
        // If not found by UUID, try by slug (beer-menu is a common slug)
        if (!referencedStory) {
          referencedStory = resolvedStories.find(story => 
            story.slug === 'beer-menu' || story.name === 'beer-menu'
          );
        }
        
        if (!referencedStory) {
          console.log('Story not found in resolved stories, fetching directly...');
          // Fallback: fetch the story directly
          const storyblokApi = getStoryblokApi();
          
          if (!storyblokApi) {
            console.error('Storyblok API client not initialized');
            setLoading(false);
            return;
          }
          
          try {
            // Try fetching by slug first
            const { data } = await storyblokApi.get(`cdn/stories/beer-menu`, {
              version: 'draft'
            });
            referencedStory = data.story;
            console.log('✅ Fetched beer-menu story directly:', referencedStory);
          } catch (slugError) {
            console.log('❌ Could not fetch by slug, trying by UUID...');
            if (targetUUID) {
              const { data } = await storyblokApi.get(`cdn/stories/${targetUUID}`, {
                version: 'draft'
              });
              referencedStory = data.story;
              console.log('✅ Fetched story by UUID:', referencedStory);
            }
          }
        }
        
        if (referencedStory?.content) {
          console.log('✅ Setting beer data from story:', referencedStory.content.title);
          // Cast to the expected type, assuming the structure matches
          setBeerData(referencedStory.content as unknown as BeerStoryContent);
        } else {
          console.log('❌ No valid story content found');
        }
      } catch (error) {
        console.error('❌ Error fetching beer data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBeerData();
  }, [beerStoryRef, resolvedStories]);
  
  if (loading) {
    return (
      <section className="bg-black text-white py-16">
        <div className="max-w-6xl mx-auto px-8 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-32 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }
  
  if (!beerData) {
    return (
      <section 
        {...storyblokEditable(blok)} 
        className="bg-black text-white py-16"
      >
        <div className="max-w-6xl mx-auto px-8 text-center">
          <p className="text-gray-400">Beer menu not available</p>
          <p className="text-sm text-gray-500 mt-2">
            Check that the beer menu story is published and accessible
          </p>
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
        </div>        {/* Beer List - Using your original menu-style layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-6">
          {beerData.beers.map((beer: BeerItem) => (
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

export default BeerListReference;
