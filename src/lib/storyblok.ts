import { storyblokInit, apiPlugin, getStoryblokApi as getApi } from '@storyblok/react/rsc';
import HeroCarousel from '@/components/HeroCarousel';
import BeerList from '@/components/BeerList';
import Footer from '@/components/Footer';
import LatestPosts from '@/components/LatestPosts';
import ContactUs from '@/components/ContactUs';
import FollowUs from '@/components/FollowUs';
import OpenHours from '@/components/OpenHours';
import PageContent from '@/components/PageContent';

const components = {
  page: PageContent,
  hero_carousel: HeroCarousel,
  beer_section: BeerList,  beer_list: BeerList,
  footer: Footer,
  latest_posts: LatestPosts,
  contact_us: ContactUs,
  follow_us: FollowUs,
  open_hours: OpenHours,
  global_hours: OpenHours,
};

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  components,
});

export const getStoryblokApi = getApi;