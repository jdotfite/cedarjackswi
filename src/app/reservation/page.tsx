import { notFound } from 'next/navigation';
import { storyblokEditable, StoryblokComponent } from '@storyblok/react';
import { getStoryblokApi } from '@/lib/storyblok';
import ReservationForm from '@/components/ReservationForm';
import PhotoGallery from '@/components/PhotoGallery';
import SpaceInfo from '@/components/SpaceInfo';
import ReservationHero from '@/components/ReservationHero';

export default async function ReservationPage() {
  const storyblokApi = getStoryblokApi();
  
  // During build time, if the API key is not available, render a fallback UI
  if (!storyblokApi) {
    console.warn('Storyblok API client not initialized. Rendering fallback UI.');
    return (
      <div className="bg-black">
        <ReservationHero blok={{
          component: 'reservation_hero',
          pre_heading: 'Reserve your space',
          heading: 'Speakeasy Rental',
          subheading: 'Perfect for Private Events & Celebrations',
          description: 'Transform our speakeasy into your personal event space. From intimate gatherings to lively celebrations, we provide everything you need for an unforgettable experience. Complete with full audio system, HD projection, craft cocktails, and endless entertainment options.',
          background_image: {
            filename: '/images/speakeasy-bg.jpg',
            alt: 'Cedar Jacks Speakeasy Interior'
          }
        }} />
        <PhotoGallery title="Our Speakeasy" />
        <SpaceInfo />
        <div className="bg-neutral-900">
          <ReservationForm blok={{
            component: 'reservation_form',
            heading: 'Reserve Our Basement',
            subheading: 'Fill out the form below to request a reservation',
            pre_heading: 'Reservation',
            description: 'Please provide your information to request a reservation.',
            success_message: 'Thank you for your reservation request! We will contact you shortly.'
          }} />
        </div>
        {/* Footer fallback - you might want to add a simple footer here */}
      </div>
    );
  }

  try {
    // Fetch both reservation and footer stories in parallel
    const [reservationResponse, footerResponse] = await Promise.all([
      storyblokApi.get('cdn/stories/reservation', {
        version: process.env.NODE_ENV === 'production' ? 'published' : 'draft',
      }),
      storyblokApi.get('cdn/stories/footer', {
        version: process.env.NODE_ENV === 'production' ? 'published' : 'draft'
      })
    ]);
    
    return (
      <div className="bg-black">
        {/* Render content from Storyblok story */}
        {reservationResponse.data.story.content.body && reservationResponse.data.story.content.body.length > 0 ? (
          reservationResponse.data.story.content.body.map((blok: any) => (
            <StoryblokComponent blok={blok} key={blok._uid} />
          ))
        ) : (
          <>
            {/* Fallback content if no Storyblok body */}
            <ReservationHero blok={{
              component: 'reservation_hero',
              pre_heading: 'Reserve your space',
              heading: 'Speakeasy Rental',
              subheading: 'Perfect for Private Events & Celebrations',
              description: 'Transform our speakeasy into your personal event space. From intimate gatherings to lively celebrations, we provide everything you need for an unforgettable experience. Complete with full audio system, HD projection, craft cocktails, and endless entertainment options.',
              background_image: {
                filename: '/images/speakeasy-bg.jpg',
                alt: 'Cedar Jacks Speakeasy Interior'
              }
            }} />
            <PhotoGallery title="Our Speakeasy" />
            <SpaceInfo />
            <div className="bg-neutral-900">
              <ReservationForm blok={reservationResponse.data.story.content} />
            </div>
          </>
        )}
        
        {/* Add SpaceInfo and ReservationForm after Storyblok content */}
        <SpaceInfo />
        <div className="bg-neutral-900">
          <ReservationForm blok={{
            component: 'reservation_form',
            heading: 'Reserve Our Basement',
            subheading: 'Fill out the form below to request a reservation',
            pre_heading: 'Reservation',
            description: 'Please provide your information to request a reservation.',
            success_message: 'Thank you for your reservation request! We will contact you shortly.'
          }} />
        </div>
        
        {/* Footer */}
        {footerResponse.data.story && <StoryblokComponent blok={footerResponse.data.story.content} />}
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
