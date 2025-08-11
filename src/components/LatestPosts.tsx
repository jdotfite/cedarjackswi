// components/LatestPosts.tsx
'use client';
import React from 'react';
import Link from 'next/link';
import { storyblokEditable, SbBlokData } from '@storyblok/react';

interface UrlField { cached_url: string }

interface PostBlok extends SbBlokData {
  title: string;
  excerpt?: string;
  url?: UrlField;
  date?: string;
}

interface LatestPostsBlok extends SbBlokData {
  posts: PostBlok[];
  title?: string;
}

export default function LatestPosts({ blok }: { blok: LatestPostsBlok }) {
  // Format title with orange period
  const formatTitleWithOrangePeriod = (titleText?: string) => {
    if (!titleText) return <span className="text-orange-500">.</span>;
    const baseTitle = titleText.endsWith('.') ? titleText.slice(0, -1) : titleText;
    return (
      <>
        <span>{baseTitle}</span>
        <span className="text-orange-500">.</span>
      </>
    );
  };

  return (
    <div {...storyblokEditable(blok)} className="font-oswald">
      {blok.title && (
        <h4 className="text-xl font-medium uppercase mb-4">{formatTitleWithOrangePeriod(blok.title)}</h4>
      )}
      <ul className="list-none space-y-4">
        {Array.isArray(blok.posts) && blok.posts.length > 0 ? (
          blok.posts.map((post) => (
            <li key={post._uid}>
              <Link
                href={post.url?.cached_url || '#'}
                className="block hover:text-orange-500 transition-colors"
              >
                <div className="uppercase font-semibold text-sm">
                  {post.title}
                </div>
                {post.date && (
                  <div className="text-sm text-gray-400">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                )}
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