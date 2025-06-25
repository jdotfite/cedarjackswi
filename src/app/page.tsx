'use client';

import { useEffect, useState } from 'react';
import { getStoryblokApi } from '@/lib/storyblok';
import { StoryblokComponent, storyblokEditable, useStoryblokState, ISbStoryData } from '@storyblok/react';
import { ResolvedStoriesProvider } from '@/contexts/ResolvedStoriesContext';

export default function Home() {  const [story, setStory] = useState<ISbStoryData | null>(null);
  const [resolvedStories, setResolvedStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Use Storyblok state for live editing
  const storyFromBridge = useStoryblokState(story);
  
  useEffect(() => {
    const fetchStory = async () => {
      try {
        const storyblokApi = getStoryblokApi();          // Always fetch the 'home' story for the root page
        const { data } = await storyblokApi.get('cdn/stories/home', {
          version: 'draft',
          resolve_relations: ['beer_list_reference.beer_list_story']        });
        
        console.log('API Response:', { story: data.story.name, rels: data.rels });
        
        setStory(data.story);
        setResolvedStories(data.rels || []);
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
      </div>
    </ResolvedStoriesProvider>
  );
}