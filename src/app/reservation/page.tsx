import { notFound } from 'next/navigation';
import { storyblokEditable } from '@storyblok/react';
import { getStoryblokApi } from '@/lib/storyblok';
import ReservationForm from '@/components/ReservationForm';

export default async function ReservationPage() {
  let storyblokApi = getStoryblokApi();
  
  try {
    const { data } = await storyblokApi.get('cdn/stories/reservation', {
      version: process.env.NODE_ENV === 'production' ? 'published' : 'draft',
    });    return (
      <div>
        {/* Check if story has body array or render content directly */}
        {data.story.content.body && data.story.content.body.length > 0 ? (
          <ReservationForm blok={data.story.content.body[0]} />
        ) : (
          <ReservationForm blok={data.story.content} />
        )}
      </div>
    );
  } catch (error) {
    console.error('Error fetching reservation story:', error);
    notFound();
  }
}

export async function generateMetadata() {
  return {
    title: 'Reserve the Basement - Cedar Jacks',
    description: 'Reserve the basement at Cedar Jacks for your private event.',
  };
}
