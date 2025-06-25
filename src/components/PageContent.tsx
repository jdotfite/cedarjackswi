import { StoryblokComponent, storyblokEditable } from '@storyblok/react';
import React from 'react';

interface PageContentProps {
  blok: any;
}

export default function PageContent({ blok }: PageContentProps) {
  return (
    <main {...storyblokEditable(blok)}>
      {blok.body?.map((nestedBlok: any) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </main>
  );
}
