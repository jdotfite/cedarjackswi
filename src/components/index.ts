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
import PhotoGallery from './PhotoGallery';
import SpaceInfo from './SpaceInfo';
import ReservationHero from './ReservationHero';
import AboutHero from './AboutHero';
import StorySection from './StorySection';
import TeamSection from './TeamSection';
import AboutPhotoGallery from './AboutPhotoGallery';

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
  photo_gallery: PhotoGallery,
  space_info: SpaceInfo,
  reservation_hero: ReservationHero,
  about_hero: AboutHero,
  story_section: StorySection,
  team_section: TeamSection,
  about_photo_gallery: AboutPhotoGallery,
};

export default components;