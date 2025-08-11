import { notFound } from 'next/navigation';
import { storyblokEditable } from '@storyblok/react';
import { getStoryblokApi } from '@/lib/storyblok';
import ReservationForm from '@/components/ReservationForm';

export default async function ReservationPage() {
  const storyblokApi = getStoryblokApi();
  
  // During build time, if the API key is not available, render a fallback UI
  if (!storyblokApi) {
    console.warn('Storyblok API client not initialized. Rendering fallback UI.');
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Make a Reservation</h1>
        <ReservationForm blok={{
          component: 'reservation_form',
          heading: 'Reserve Our Basement',
          subheading: 'Fill out the form below to request a reservation',
          pre_heading: 'Reservation',
          description: 'Please provide your information to request a reservation.',
          success_message: 'Thank you for your reservation request! We will contact you shortly.'
        }} />
      </div>
    );
  }
  
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
