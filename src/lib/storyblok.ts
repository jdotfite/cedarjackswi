import { apiPlugin, storyblokInit, getStoryblokApi as getApi } from '@storyblok/react';
import Page from '@/components/PageContent';
import HeroCarousel from '@/components/HeroCarousel';
import BeerListEditable from '@/components/BeerListEditable';
import BeerMenuLoader from '@/components/BeerMenuLoader';
import BeerListReference from '@/components/BeerListReference';
import EventsSection from '@/components/EventsSection';
import Footer from '@/components/Footer';
import LatestPosts from '@/components/LatestPosts';
import ContactUs from '@/components/ContactUs';
import FollowUs from '@/components/FollowUs';
import OpenHours from '@/components/OpenHours';
import ReservationForm from '@/components/ReservationForm';
import HeroSection from '@/components/HeroSection';

let isInitialized = false;
let storyblokApi: any = null;

export const getStoryblokApi = () => {
  if (!isInitialized) {
    storyblokApi = storyblokInit({
      accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
      use: [apiPlugin],
      components: {
        page: Page,
        hero_carousel: HeroCarousel,
        beer_section: BeerListEditable,
        beer_list: BeerListEditable,
        beer_menu_loader: BeerMenuLoader,
        beer_list_reference: BeerListReference,
        footer: Footer,
        Footer: Footer, // Handle capitalized version
        latest_posts: LatestPosts,
        contact_us: ContactUs,
        follow_us: FollowUs,        open_hours: OpenHours,
        global_hours: OpenHours,        events_section: EventsSection,
        reservation_form: ReservationForm,
        hero_section: HeroSection,
        // Add nested component for hero slides
        hero_slide: ({ blok }: { blok: any }) => null,
        'hero_slide ': ({ blok }: { blok: any }) => null,
        events_item: ({ blok }: { blok: any }) => null,
        // Add beer item component
        beer_item: ({ blok }: { blok: any }) => null, // handled internally by BeerList
      },
      apiOptions: {
        region: 'eu',
      },
      bridge: process.env.NODE_ENV !== 'production', // Enable bridge in development
      enableFallbackComponent: true,
    });
    
    isInitialized = true;
  }
  
  return getApi();
};