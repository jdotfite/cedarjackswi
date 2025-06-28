'use client';
import React from 'react';
import Link from 'next/link';
import { storyblokEditable, SbBlokData } from '@storyblok/react';

interface SocialLinkItem extends SbBlokData {
  component: 'social_link_item';
  platform: string;
  url: {
    cached_url: string;
  };
}

interface FollowUsBlok extends SbBlokData {
  component: 'follow_us';
  title: string;
  follow_description?: string;
  social_links?: SocialLinkItem[];
  tagline?: string;
}

export default function FollowUs({ blok }: { blok: FollowUsBlok }) {
  // Format title with orange period
  const formatTitleWithOrangePeriod = (titleText: string) => {
    const baseTitle = titleText?.endsWith('.') ? titleText.slice(0, -1) : titleText;
    return (
      <>
        {baseTitle}
        <span className="text-orange-500">.</span>
      </>
    );
  };
  
  return (
    <div {...storyblokEditable(blok)} className="font-oswald">
      <h4 className="text-lg font-medium uppercase mb-4">{formatTitleWithOrangePeriod(blok.title)}</h4>
      <div className="space-y-3">
        {blok.follow_description && <p>{blok.follow_description}</p>}
        
        <div className="space-y-2">
          {blok.social_links?.map((socialLink) => (
            <p key={socialLink._uid}>
              <Link 
                href={socialLink.url.cached_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-orange-500 transition-colors"
              >
                {socialLink.platform}
              </Link>
            </p>
          ))}
        </div>
        
        {blok.tagline && (
          <p className="text-sm text-gray-400 mt-4">
            {blok.tagline.includes('•') ? (
              <span dangerouslySetInnerHTML={{
                __html: blok.tagline.replace(/•/g, '<span class="text-white">•</span>')
              }} />
            ) : (
              blok.tagline
            )}
          </p>
        )}
        
        {(!blok.social_links || blok.social_links.length === 0) && !blok.follow_description && !blok.tagline && (
          <p className="text-sm text-gray-400">Social media links not yet configured</p>
        )}
      </div>
    </div>
  );
}