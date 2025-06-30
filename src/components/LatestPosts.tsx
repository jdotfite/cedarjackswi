// components/LatestPosts.tsx
'use client';
import React from 'react';
import Link from 'next/link';
import { storyblokEditable, SbBlokData } from '@storyblok/react';

interface LatestPostsBlok extends SbBlokData {
  component: 'latest_posts';
  title: string;
  posts: SbBlokData[];
}

export default function LatestPosts({ blok }: { blok: LatestPostsBlok }) {
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
      <h4 className="text-xl font-medium uppercase mb-4">{formatTitleWithOrangePeriod(blok.title)}</h4>
      <ul className="list-none space-y-4">
        {blok.posts && blok.posts.length > 0 ? (
          blok.posts.map((post: any) => (
            <li key={post._uid}>
              <Link 
                href={post.url?.cached_url || '#'} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block hover:text-orange-500 transition-colors"
              >
                <div className="uppercase font-semibold text-sm">
                  {post.title}
                </div>
                <div className="text-sm text-gray-400">
                  {post.date ? new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : ''}
                </div>
              </Link>
            </li>
          ))
        ) : (
          <li className="text-sm text-gray-400">No posts available yet</li>
        )}
      </ul>
    </div>
  );
}