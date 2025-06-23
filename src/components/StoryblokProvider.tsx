'use client';
import { storyblokInit, apiPlugin } from '@storyblok/react';
import HeroCarousel from '@/components/HeroCarousel';
import BeerList from '@/components/BeerList';
import Footer from '@/components/Footer';
import LatestPosts from '@/components/LatestPosts';
import ContactUs from '@/components/ContactUs';
import FollowUs from '@/components/FollowUs';
import OpenHours from '@/components/OpenHours';
import EventsSection from '@/components/EventsSection';
import PageContent from '@/components/PageContent';

const components = {
  page: PageContent,
  hero_carousel: HeroCarousel,
  beer_section: BeerList,
  beer_list: BeerList,
  footer: Footer,
  Footer: Footer, // Handle capitalized component name from Storyblok
  latest_posts: LatestPosts,
  contact_us: ContactUs,
  follow_us: FollowUs,
  hours: OpenHours,
  global_hours: OpenHours,
  open_hours: OpenHours,
  events_section: EventsSection,
};

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  components,
});

export default function StoryblokProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
