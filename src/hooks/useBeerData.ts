import { useState, useEffect } from 'react';

export interface BeerItem {
  _uid: string;
  logo?: { filename: string };
  name: string;
  price: number | string;
  description?: string;
}

export interface BeerData {
  subtitle: string;
  title: string;
  beers: BeerItem[];
}

export const useBeerData = () => {
  const [beerData, setBeerData] = useState<BeerData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const STORYBLOK_TOKEN = process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN;

  useEffect(() => {
    const fetchBeerData = async () => {
      if (!STORYBLOK_TOKEN) {
        setError('Storyblok access token missing');
        setLoading(false);
        console.error('Missing NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN');
        return;
      }
      try {
        const response = await fetch(
          `https://api.storyblok.com/v2/cdn/stories/beer-menu?token=${STORYBLOK_TOKEN}&version=draft`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch beer data');
        }
        const data = await response.json();
        setBeerData(data.story.content as BeerData);
      } catch (err) {
        const message = (err as Error).message || 'Unknown error';
        setError(message);
        console.error('Error fetching beer data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBeerData();
  }, [STORYBLOK_TOKEN]);

  return { beerData, loading, error };
};
