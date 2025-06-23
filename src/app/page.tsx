// app/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { getStoryblokApi } from '@/lib/storyblok';
import { StoryblokStory } from '@storyblok/react/rsc';
import { StoryblokComponent } from '@storyblok/react';
import EventsSection from '@/components/EventsSection';

export default function Home() {
  const [story, setStory] = useState<any>(null);
  const [footerStory, setFooterStory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const storyblokApi = getStoryblokApi();
        
        console.log('Fetching stories...');
        
        // Fetch both home story and footer story
        const [homeResponse, footerResponse] = await Promise.all([
          storyblokApi.get('cdn/stories/home', {
            version: 'draft',
          }),
          storyblokApi.get('cdn/stories/footer', {
            version: 'draft',
          })
        ]);
        
        console.log('Home story:', homeResponse.data.story);
        console.log('Footer story:', footerResponse.data.story);
        
        setStory(homeResponse.data.story);
        setFooterStory(footerResponse.data.story);
      } catch (err) {
        console.error('Error fetching stories:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);
  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto"></div>
          <h1 className="text-2xl font-bold mt-4 text-white font-oswald uppercase">Loading Cedar Jacks...</h1>
        </div>
      </div>
    );
  }  if (error || !story) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-white font-oswald uppercase">Page Not Ready</h1>
          <p className="text-gray-300 mb-4">
            Create stories called "home" and "footer" in Storyblok to see content here.
          </p>
          <p className="text-sm text-gray-400">
            Add Hero Carousel, Beer Section, and Footer blocks to your page.
          </p>
        </div>
      </div>
    );
  }  return (
    <div className="bg-white">
      <StoryblokStory story={story} />
      {/* Temporarily showing EventsSection for demo */}
      <EventsSection />
      {footerStory && <StoryblokComponent blok={footerStory.content} />}
    </div>
  );
}