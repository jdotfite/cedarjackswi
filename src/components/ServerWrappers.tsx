import { StoryblokServerComponent } from '@storyblok/react/rsc';
import HeroCarousel from './HeroCarousel';
import BeerList from './BeerList';
import EventsSection from './EventsSection';

interface ServerWrapperProps {
  blok: any;
}

export function HeroCarouselWrapper({ blok }: ServerWrapperProps) {
  return <HeroCarousel blok={blok} />;
}

export function BeerListWrapper({ blok }: ServerWrapperProps) {
  return <BeerList blok={blok} />;
}

export function EventsSectionWrapper({ blok }: ServerWrapperProps) {
  return <EventsSection blok={blok} />;
}
