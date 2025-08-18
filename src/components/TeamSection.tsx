'use client';
import React from 'react';
import { storyblokEditable, SbBlokData } from '@storyblok/react';

interface TeamMember extends SbBlokData {
  component: 'team_member';
  name: string;
  position: string;
  bio?: string;
  photo?: {
    filename: string;
    alt: string;
  };
}

interface TeamSectionBlok extends SbBlokData {
  component: 'team_section';
  heading: string;
  description?: string;
  team_members: TeamMember[];
  background_color?: 'black' | 'gray' | 'dark_gray';
}

export default function TeamSection({ blok }: { blok: TeamSectionBlok }) {
  // Format heading with orange period
  const formatTitleWithOrangePeriod = (titleText: string) => {
    const baseTitle = titleText?.endsWith('.') ? titleText.slice(0, -1) : titleText;
    return (
      <>
        {baseTitle}
        <span className="text-orange-500">.</span>
      </>
    );
  };

  const backgroundClasses = {
    black: 'bg-black',
    gray: 'bg-neutral-900',
    dark_gray: 'bg-gray-800'
  };

  const bgClass = backgroundClasses[blok.background_color || 'gray'];

  return (
    <section {...storyblokEditable(blok)} className={`${bgClass} py-16 lg:py-24`}>
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-oswald uppercase tracking-wide">
            {formatTitleWithOrangePeriod(blok.heading || 'Our Team')}
          </h2>
          {blok.description && (
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed font-roboto">
              {blok.description}
            </p>
          )}
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {blok.team_members?.map((member) => (
            <div key={member._uid} className="text-center group">
              {/* Photo */}
              <div className="relative mb-6">
                <div className="w-48 h-48 mx-auto rounded-full overflow-hidden shadow-xl">
                  {member.photo?.filename ? (
                    <img 
                      src={member.photo.filename}
                      alt={member.photo.alt || member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                      <svg className="w-20 h-20 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              {/* Info */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-2 font-oswald uppercase tracking-wide">
                  {member.name}
                </h3>
                <p className="text-orange-500 text-lg font-medium mb-4 font-oswald">
                  {member.position}
                </p>
                {member.bio && (
                  <p className="text-white/80 leading-relaxed font-roboto">
                    {member.bio}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
