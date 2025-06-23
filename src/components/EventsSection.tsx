'use client';

import React from 'react';
import { LinkButton } from './Button';

interface StoryblokEvent {
  _uid: string;
  date: string;
  name: string;
  cta?: {
    url: string;
    cached_url: string;
  };
  component: string;
}

interface EventsSectionProps {
  blok?: {
    title?: string;
    main_title?: string;
    Events?: StoryblokEvent[];
  };
  title?: string;
  tagline?: string;
  events?: StoryblokEvent[];
}

// Helper function to format date
const formatEventDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate().toString();
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
  
  return { day, month, weekday };
};

const EventsSection: React.FC<EventsSectionProps> = ({
  blok,
  events,
  title,
  tagline,
}) => {
  // Use events from props, blok, or empty array if no events
  const eventsList = events || blok?.Events || [];
  const sectionTitle = title || blok?.main_title || 'UPCOMING EVENTS';
  const sectionTagline = tagline || blok?.title || 'Enjoy our';

  // Don't render section if no events
  if (eventsList.length === 0) {
    return null;
  }  return (
    <section className="bg-black text-white py-16 px-4 font-oswald">
      <div className="max-w-6xl mx-auto px-8">
        {/* Section Title  */}
        <div className="text-center mb-12">
          <h2>
            <span className="italic text-orange-400 text-[45px] block mb-2 font-quentin leading-[0.8]">
              {sectionTagline}
            </span>
            <span className="uppercase font-bold text-4xl md:text-6xl tracking-wide">
              {sectionTitle}
            </span>
          </h2>
        </div>{/* Events List */}
        <div className="space-y-0">
          {eventsList.map((event, index) => {
            const { day, month, weekday } = formatEventDate(event.date);            return (
              <div
                key={event._uid}
                className={`
                  ${index !== eventsList.length - 1 ? 'border-b border-gray-800' : ''}
                  group
                `}              >                <a
                  href={event.cta?.url}
                  className="flex items-center justify-between py-6 px-0 transition-colors duration-200 block"
                >
                  {/* Date Section */}
                  <div className="flex items-center space-x-6">
                    <div className="flex items-start space-x-3 min-w-[120px]">
                      {/* Large Date Number */}
                      <div className="text-4xl md:text-5xl text-white group-hover:text-orange-500 transition-colors duration-200 font-oswald leading-[0.9]">
                        {day}
                      </div>
                      
                      {/* Month and Weekday Stacked to the right */}
                      <div className="flex flex-col justify-between text-sm text-gray-400 uppercase font-roboto h-12 text-center">
                        <div className="">
                          {month}
                        </div>
                        <div className="">
                          {weekday}
                        </div>
                      </div>
                    </div>

                    {/* Event Name */}
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl uppercase tracking-wide text-white group-hover:text-orange-500 transition-colors duration-200 font-oswald font-medium">
                        {event.name || 'Unnamed Event'}
                      </h3>
                    </div>
                  </div>

                  {/* Link Section - VIEW EVENT button */}
                  <div className="flex-shrink-0 ml-4">
                    <div className="inline-block font-semibold uppercase tracking-wide transition-colors duration-200 text-center bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-sm rounded ">
                      VIEW EVENT
                    </div>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
