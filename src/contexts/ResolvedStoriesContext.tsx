'use client';
import React, { createContext, useContext } from 'react';

interface ResolvedStoriesContextType {
  resolvedStories: any[];
}

const ResolvedStoriesContext = createContext<ResolvedStoriesContextType>({
  resolvedStories: []
});

export const useResolvedStories = () => {
  const context = useContext(ResolvedStoriesContext);
  if (!context) {
    return { resolvedStories: [] };
  }
  return context;
};

export const ResolvedStoriesProvider: React.FC<{
  children: React.ReactNode;
  resolvedStories: any[];
}> = ({ children, resolvedStories }) => {
  return (
    <ResolvedStoriesContext.Provider value={{ resolvedStories }}>
      {children}
    </ResolvedStoriesContext.Provider>
  );
};
