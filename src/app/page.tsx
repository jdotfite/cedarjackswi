'use client';

import { useEffect, useState } from 'react';
import { getStoryblokApi } from '@/lib/storyblok';
import { StoryblokComponent, storyblokEditable, useStoryblokState, ISbStoryData } from '@storyblok/react';
import { ResolvedStoriesProvider } from '@/contexts/ResolvedStoriesContext';

export default function Home() {
  const [story, setStory] = useState<ISbStoryData | null>(null);
  const [footerStory, setFooterStory] = useState<ISbStoryData | null>(null);
  const [resolvedStories, setResolvedStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Use Storyblok state for live editing
  const storyFromBridge = useStoryblokState(story);
  
  useEffect(() => {
    const fetchStory = async () => {
      try {
        const storyblokApi = getStoryblokApi();
        
        if (!storyblokApi) {
          console.warn('Storyblok API client not initialized');
          setError('Content management system not available. Please check your environment configuration.');
          setLoading(false);
          return;
        }
        
        // Fetch both home and footer stories in parallel
        const [homeResponse, footerResponse] = await Promise.all([
          storyblokApi.get('cdn/stories/home', {
            version: 'draft',
            resolve_relations: [
              'beer_list_reference.beer_list_story',
              'beer_list.beers',
              'hero_carousel.slides',
              'events_section.events'
            ]
          }),
          storyblokApi.get('cdn/stories/footer', {
            version: 'draft'
          })
        ]);
        
        console.log('API Response:', { 
          story: homeResponse.data.story.name, 
          footer: footerResponse.data.story.name,
          footerComponent: footerResponse.data.story.content.component, // Add component name debugging
          rels: homeResponse.data.rels 
        });
        
        setStory(homeResponse.data.story);
        setFooterStory(footerResponse.data.story);
        setResolvedStories(homeResponse.data.rels || []);
      } catch (err) {
        console.error('Error fetching story:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, []);

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-white font-oswald uppercase">Loading...</h1>
          <p className="text-gray-300">Fetching content from Storyblok...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-red-400 font-oswald uppercase">Error</h1>
          <p className="text-gray-300 mb-4">Failed to load content: {error}</p>
        </div>
      </div>
    );
  }

  if (!storyFromBridge) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-white font-oswald uppercase">No Content</h1>
          <p className="text-gray-300 mb-4">No story found</p>
        </div>
      </div>
    );
  }
    return (
    <ResolvedStoriesProvider resolvedStories={resolvedStories}>
      <div className="bg-white" {...storyblokEditable(storyFromBridge.content)}>
        <StoryblokComponent blok={storyFromBridge.content} />
        {footerStory && <StoryblokComponent blok={footerStory.content} />}
      </div>
    </ResolvedStoriesProvider>
  );
}