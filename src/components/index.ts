// components/index.ts
import HeroCarousel from './HeroCarousel';
import BeerList from './BeerList';
import Footer from './Footer';
import LatestPosts from './LatestPosts';
import ContactUs from './ContactUs';
import FollowUs from './FollowUs';
import OpenHours from './OpenHours';
import EventsSection from './EventsSection';
import ReservationForm from './ReservationForm';

const components = {
  hero_carousel: HeroCarousel,
  beer_section: BeerList,
  beer_list: BeerList,
  footer: Footer,
  latest_posts: LatestPosts,
  contact_us: ContactUs,
  follow_us: FollowUs,
  open_hours: OpenHours,
  global_hours: OpenHours,
  events_section: EventsSection,
  reservation_form: ReservationForm,
};

export default components;