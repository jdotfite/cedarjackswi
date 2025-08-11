'use client';
import React, { createContext, useContext, useState } from 'react';
import { SbBlokData } from '@storyblok/react';

export interface ResolvedStorySummary {
  id: number;
  uuid: string;
  name: string;
  slug: string;
  content: SbBlokData & { [k: string]: unknown };
}

interface ResolvedStoriesContextValue {
  resolvedStories: ResolvedStorySummary[];
  addStory: (story: ResolvedStorySummary) => void;
}

const ResolvedStoriesContext = createContext<ResolvedStoriesContextValue | undefined>(undefined);

export const ResolvedStoriesProvider: React.FC<{ 
  children: React.ReactNode, 
  resolvedStories?: ResolvedStorySummary[] 
}> = ({ children, resolvedStories: initialStories = [] }) => {
  const [resolvedStories, setResolvedStories] = useState<ResolvedStorySummary[]>(initialStories);

  const addStory = (story: ResolvedStorySummary) => {
    setResolvedStories(prev => (prev.find(s => s.id === story.id) ? prev : [...prev, story]));
  };

  return (
    <ResolvedStoriesContext.Provider value={{ resolvedStories, addStory }}>
      {children}
    </ResolvedStoriesContext.Provider>
  );
};

export const useResolvedStories = () => {
  const ctx = useContext(ResolvedStoriesContext);
  if (!ctx) throw new Error('useResolvedStories must be used within ResolvedStoriesProvider');
  return ctx;
};
