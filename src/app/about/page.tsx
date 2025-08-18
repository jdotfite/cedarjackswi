import { notFound } from 'next/navigation';
import { getStoryblokApi } from '@/lib/storyblok';
import { StoryblokComponent } from '@storyblok/react';

export default async function AboutPage() {
  const storyblokApi = getStoryblokApi();
  
  // During build time, if the API key is not available, render a fallback UI
  if (!storyblokApi) {
    console.warn('Storyblok API client not initialized. Rendering fallback UI.');
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white p-8">
          <h1 className="text-4xl font-bold mb-4 font-oswald">About Cedar Jacks</h1>
          <p className="text-xl mb-8">Your favorite neighborhood gastropub in Wisconsin.</p>
          <div className="max-w-4xl mx-auto text-lg leading-relaxed space-y-6">
            <p>
              Welcome to Cedar Jacks, where great food meets great atmosphere. Located in the heart of Wisconsin, 
              we've been serving our community with exceptional craft cocktails, delicious food, and unforgettable experiences.
            </p>
            <p>
              Our story began with a simple vision: create a place where friends and family can gather to enjoy 
              quality food, craft beverages, and genuine hospitality. Today, we continue that tradition with our 
              unique speakeasy basement available for private events.
            </p>
            <p>
              From intimate gatherings to lively celebrations, Cedar Jacks provides the perfect backdrop for your 
              special moments. Come experience what makes us a cornerstone of the Wisconsin dining scene.
            </p>
          </div>
        </div>
      </div>
    );
  }

  try {
    const { data } = await storyblokApi.get('cdn/stories/about', {
      version: process.env.NODE_ENV === 'production' ? 'published' : 'draft',
      resolve_relations: [
        'team_section.team_members',
        'photo_gallery.images'
      ]
    });
    
    return (
      <div className="bg-black">
        {data.story.content.body?.map((blok: any) => (
          <StoryblokComponent blok={blok} key={blok._uid} />
        ))}
      </div>
    );
  } catch (error) {
    console.error('Error fetching about story:', error);
    // Return fallback content instead of notFound for better UX
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white p-8">
          <h1 className="text-4xl font-bold mb-4 font-oswald">About Cedar Jacks</h1>
          <p className="text-xl mb-8">Your favorite neighborhood gastropub in Wisconsin.</p>
          <div className="max-w-4xl mx-auto text-lg leading-relaxed space-y-6">
            <p>
              Welcome to Cedar Jacks, where great food meets great atmosphere. Located in the heart of Wisconsin, 
              we've been serving our community with exceptional craft cocktails, delicious food, and unforgettable experiences.
            </p>
            <p>
              Our story began with a simple vision: create a place where friends and family can gather to enjoy 
              quality food, craft beverages, and genuine hospitality. Today, we continue that tradition with our 
              unique speakeasy basement available for private events.
            </p>
            <p>
              From intimate gatherings to lively celebrations, Cedar Jacks provides the perfect backdrop for your 
              special moments. Come experience what makes us a cornerstone of the Wisconsin dining scene.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export async function generateMetadata() {
  return {
    title: 'About Us - Cedar Jacks',
    description: 'Learn about Cedar Jacks, your favorite neighborhood gastropub in Wisconsin. Discover our story, mission, and what makes us special.',
  };
}
