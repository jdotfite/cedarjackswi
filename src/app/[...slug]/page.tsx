'use client';

import { useEffect, useState } from 'react';
import { getStoryblokApi } from '@/lib/storyblok';
import { StoryblokComponent, storyblokEditable, useStoryblokState, ISbStoryData } from '@storyblok/react';
import { useParams } from 'next/navigation';
import { ResolvedStoriesProvider } from '@/contexts/ResolvedStoriesContext';

export default function StoryPage() {
  const params = useParams();
  const [story, setStory] = useState<ISbStoryData | null>(null);
  const [resolvedStories, setResolvedStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  
  // Use Storyblok state for live editing
  const storyFromBridge = useStoryblokState(story);
  
  // Track if we're on the client side - MUST be called unconditionally
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Fetch story data
  useEffect(() => {
    const fetchStory = async () => {
      try {
        const storyblokApi = getStoryblokApi();
        
        if (!storyblokApi) {
          console.warn('Storyblok API client not initialized');
          setError('Content management system not available at the moment');
          setLoading(false);
          return;
        }
        
        // Get the slug from params, default to 'home' if not provided
        const slug = Array.isArray(params.slug) ? params.slug.join('/') : (params.slug || 'home');
        
        const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
          version: 'draft',
          resolve_links: 'url',
          resolve_relations: [
            'beer_list_reference.beer_list_story',
            'beer_list.beers',
            'hero_carousel.slides',
            'events_section.events'
          ]
        });
        
        setStory(data.story);
        
        // Debug logging
        console.log('Loaded story for about page:', {
          storyName: data.story.name,
          storySlug: data.story.slug,
          contentComponent: data.story.content.component,
          bodyLength: data.story.content.body?.length || 0,
          bodyComponents: data.story.content.body?.map((blok: any) => blok.component) || [],
          fullContent: data.story.content
        });
        
        // Store resolved stories for context
        if (data.rels) {
          const resolved = Object.values(data.rels).map((rel: any) => ({
            id: rel.id,
            uuid: rel.uuid,
            name: rel.name,
            slug: rel.slug,
            content: rel.content
          }));
          setResolvedStories(resolved);
        }
      } catch (err) {
        console.error('Error fetching story:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [params]);

  // Log for debugging - MUST be called unconditionally
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('Storyblok Bridge available:', !!(window as any).storyblok);
      console.log('Story from bridge:', storyFromBridge);
    }
  }, [storyFromBridge]);  // Debug logging for live editing - MUST be called unconditionally
  useEffect(() => {
    if (isClient && storyFromBridge) {
      console.log('Story loaded for live editing:', {
        storyId: storyFromBridge.id,
        storyName: storyFromBridge.name,
        bridgeAvailable: !!(window as any).storyblok,
        content: storyFromBridge.content
      });
    }
  }, [isClient, storyFromBridge]);
  
  // Manual bridge initialization to avoid SSR issues
  useEffect(() => {
    if (isClient && story?.id && typeof window !== 'undefined' && (window as any).storyblok) {
      const bridge = (window as any).storyblok;
      
      console.log('Manually setting up bridge for story:', story.id);
      
      // Listen for story changes from the bridge
      const handleStoryChange = (newStory: any) => {
        console.log('Bridge callback received:', newStory);
        setStory(newStory);
      };
      
      // Set up bridge listeners
      bridge.on(['input', 'published', 'change'], handleStoryChange);
      
      // Cleanup function
      return () => {
        if (bridge && bridge.off) {
          bridge.off(['input', 'published', 'change'], handleStoryChange);
        }
      };
    }
  }, [isClient, story?.id]);

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
    );  }
  
  return (
    <ResolvedStoriesProvider resolvedStories={resolvedStories}>
      <div className="bg-white" {...storyblokEditable(storyFromBridge.content)}>
        {/* Debug info */}
        {process.env.NODE_ENV === 'development' && (
          <div style={{ 
            position: 'fixed', 
            top: '10px', 
            right: '10px', 
            background: 'black', 
            color: 'white', 
            padding: '10px', 
            fontSize: '12px',
            zIndex: 9999,
            maxWidth: '300px'
          }}>
            <div>Story: {storyFromBridge.name}</div>
            <div>Component: {storyFromBridge.content.component}</div>
            <div>Body Items: {storyFromBridge.content.body?.length || 0}</div>
            {storyFromBridge.content.body?.map((blok: any, index: number) => (
              <div key={index}>- {blok.component}</div>
            ))}
          </div>
        )}
        <StoryblokComponent blok={storyFromBridge.content} />
      </div>
    </ResolvedStoriesProvider>
  );
}
