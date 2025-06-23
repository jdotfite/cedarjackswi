// components/index.ts
import HeroCarousel from './HeroCarousel';
import BeerList from './BeerList';
import Footer from './Footer';
import LatestPosts from './LatestPosts';
import ContactUs from './ContactUs';
import FollowUs from './FollowUs';
import OpenHours from './OpenHours';
import EventsSection from './EventsSection';

export default {
  page: ({ blok, children }: any) => children, // Page wrapper
  hero_carousel: HeroCarousel,
  beer_section: BeerList,
  beer_list: BeerList,
  footer: Footer,
  latest_posts: LatestPosts,
  contact_us: ContactUs,
  follow_us: FollowUs,
  open_hours: OpenHours,
  global_hours: OpenHours, // Keep for backward compatibility
  events_section: EventsSection,
  post_item: ({ blok }: any) => null, // handled within latest_posts
};