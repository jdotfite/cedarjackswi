'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { Play, Calendar, MapPin } from 'lucide-react';
import { storyblokEditable, SbBlokData } from '@storyblok/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// TypeScript interfaces
interface HeroSlideBlok extends SbBlokData {
  component: 'hero_slide';
  background_image: {
    filename: string;
    alt?: string;
  };
  pre_heading: string;
  heading: string;
  subheading: string;
  description: string;
  cta_text: string;
  cta_link: {
    cached_url: string;
  };
  secondary_cta_text: string;
  secondary_cta_link: {
    cached_url: string;
  };
}

interface HeroCarouselBlok extends SbBlokData {
  component: 'hero_carousel';
  slides: HeroSlideBlok[];
}

const HeroCarousel: React.FC<{ blok: HeroCarouselBlok }> = ({ blok }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // If no slides are configured in Storyblok, show empty state
  if (!blok.slides || blok.slides.length === 0) {
    return (
      <div {...storyblokEditable(blok)} className="relative h-screen w-full overflow-hidden bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">No slides configured</h2>
          <p className="text-gray-300">Add slides in Storyblok to display the hero carousel</p>
        </div>
      </div>
    );
  }

  const currentSlide = blok.slides[activeIndex];
  return (
    <div {...storyblokEditable(blok)} className="relative h-screen w-full overflow-hidden bg-black">      {/* CSS Styles */}      <style jsx>{`
        .hero-carousel .swiper-button-prev,
        .hero-carousel .swiper-button-next {
          display: none;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }

        :global(.btn-primary) {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 1rem 2rem;
          background-color: var(--primary-color);
          color: white;
          font-weight: 600;
          font-size: 1.125rem;
          border-radius: 0.375rem;
          transition: all 0.3s;
          transform: translateY(0);
          min-width: 180px;
          text-decoration: none;
        }
        
        :global(.btn-primary:hover) {
          background-color: var(--primary-color-dark);
          transform: translateY(-2px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        :global(.btn-secondary) {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 1rem 2rem;
          background-color: transparent;
          color: white;
          font-weight: 600;
          font-size: 1.125rem;
          border: 2px solid white;
          border-radius: 0.375rem;
          transition: all 0.3s;
          min-width: 180px;
          text-decoration: none;
        }
        
        :global(.btn-secondary:hover) {
          background-color: white;
          color: black;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
        }

        .animation-delay-800 {
          animation-delay: 0.8s;
          opacity: 0;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
          opacity: 0;
        }
      `}</style>

      {/* Swiper Container */}      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        navigation={{
          prevEl: '.custom-prev-container',
          nextEl: '.custom-next-container',
        }}        pagination={{
          clickable: true,
          renderBullet: (index: number, className: string) => {
            return `<span class="${className} custom-bullet"></span>`;
          },
        }}autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        effect="fade"
        fadeEffect={{
          crossFade: true
        }}
        speed={1000}
        loop={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="h-full hero-carousel"
      >
        {blok.slides.map((slide) => (
          <SwiperSlide key={slide._uid}>
            <div className="relative h-full w-full">
              {/* Background Image with Overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${slide.background_image.filename})` }}
              />
              
              {/* Dark Overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
                {/* Animated Background Elements removed */}

              {/* Content Container */}
              <div className="relative z-10 h-full flex items-center">
                <div className="container mx-auto px-6 lg:px-16">
                  <div className="max-w-4xl">                    {/* Pre-heading */}                    {slide.pre_heading && (
                      <div className="animate-fade-in-up">                        <span className="text-[#ea580c] font-quentin tracking-widest text-[45px] leading-[0.8] block">
                          {slide.pre_heading}
                        </span>
                      </div>
                    )}                    {/* Main Heading */}
                    {slide.heading && (
                      <h1 className="text-6xl md:text-8xl lg:text-9xl font-oswald font-black text-white mb-2 leading-none tracking-tight animate-fade-in-up animation-delay-200">
                        {slide.heading}<span className="text-[#ea580c]">.</span>
                      </h1>
                    )}

                    {/* Subheading */}
                    {slide.subheading && (
                      <h2 className="text-2xl md:text-3xl lg:text-4xl text-white font-oswald font-light mb-6 animate-fade-in-up animation-delay-400">
                        {slide.subheading}
                      </h2>
                    )}                    {/* Description */}
                    {slide.description && (
                      <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl leading-relaxed animate-fade-in-up animation-delay-600 font-roboto">
                        {slide.description}
                      </p>
                    )}{/* CTA Buttons */}
                    {(slide.cta_text || slide.secondary_cta_text) && (
                      <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-800">
                        {slide.cta_text && (
                          <a
                            href={slide.cta_link.cached_url}
                            className="btn-primary"
                          >
                            {slide.cta_text}
                          </a>
                        )}
                        
                        {slide.secondary_cta_text && (
                          <a
                            href={slide.secondary_cta_link.cached_url}
                            className="btn-secondary"
                          >
                            {slide.secondary_cta_text}
                          </a>
                        )}
                      </div>
                    )}                    {/* Quick Info Bar */}
                    <div className="flex flex-wrap items-center gap-6 mt-12 text-white/70 animate-fade-in-up animation-delay-1000 font-roboto">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span className="text-sm">3280 Co Hwy P, Jackson, WI</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span className="text-sm">Open Wed-Sat 4PM-12AM</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Play size={16} />
                        <span className="text-sm">Live Music Fridays</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>      {/* Custom Navigation Buttons - Hidden on mobile */}      <div className="custom-prev-container absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden md:block">
        <button className="group w-12 h-12 flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer">
          <svg width="24" height="38" viewBox="0 0 24 38" xmlns="http://www.w3.org/2000/svg" className="w-3 h-auto transition-colors duration-300">
            <path 
              d="M23.99,19.01c0,5.37-.01,10.74.01,16.11,0,1.22-.46,2.11-1.58,2.61-1.14.51-2.21.3-3.13-.51-1.44-1.27-2.87-2.56-4.3-3.84-4.65-4.17-9.3-8.34-13.96-12.49-.69-.61-1.13-1.27-1.02-2.22.08-.63.44-1.09.89-1.5,2.3-2.06,4.6-4.12,6.9-6.17,3.79-3.38,7.59-6.76,11.38-10.13,1.3-1.16,3-1.14,4.16.04.47.49.65,1.08.65,1.74,0,5.46,0,10.91,0,16.37Z"
              className="fill-white group-hover:fill-[#ea580c]"
            />
          </svg>
        </button>
      </div>
      
      <div className="custom-next-container absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden md:block">
        <button className="group w-12 h-12 flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer">          <svg width="24" height="38" viewBox="0 0 24 38" xmlns="http://www.w3.org/2000/svg" className="w-3 h-auto transition-colors duration-300">
            <path 
              d="M.01,18.99c0-5.37.01-10.74-.01-16.11C0,1.67.46.78,1.58.28,2.72-.24,3.78-.02,4.71.79c1.44,1.27,2.87,2.56,4.3,3.84,4.65,4.17,9.3,8.34,13.96,12.49.69.61,1.13,1.27,1.02,2.22-.08.63-.44,1.09-.89,1.5-2.3,2.06-4.6,4.12-6.9,6.17-3.79,3.38-7.59,6.76-11.38,10.13-1.3,1.16-3,1.14-4.16-.04-.47-.49-.65-1.08-.65-1.74,0-5.46,0-10.91,0-16.37Z"
              className="fill-white group-hover:fill-[#ea580c]"            />
          </svg>
        </button>      </div>{/* Pagination is handled by Swiper directly */}{/* Global CSS for Swiper Pagination */}
      <style jsx global>{`
        :root {
          --primary-color: #ea580c;
          --primary-color-dark: #c2410c;
        }        .swiper-pagination {
          position: absolute;
          bottom: 25px !important;
          left: 0;
          right: 0;
          display: flex !important;
          justify-content: center;
          z-index: 20;
        }
          .custom-bullet {
          position: relative;
          display: inline-block;
          width: 14px;
          height: 14px;
          margin: 0 8px;
          background: rgba(255, 255, 255, 0.3);
          border: 2px solid rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform: scale(1);
        }
        
        .custom-bullet:hover {
          transform: scale(1.2);
          border-color: rgba(255, 255, 255, 0.9);
          background: rgba(255, 255, 255, 0.2);
        }
        
        .swiper-pagination-bullet-active.custom-bullet {
          background: var(--primary-color);
          border-color: var(--primary-color);
          width: 40px;
          border-radius: 20px;
          transform: scale(1);
          box-shadow: 0 0 20px rgba(234, 88, 12, 0.4);
        }
        
        .swiper-pagination-bullet-active.custom-bullet:hover {
          transform: scale(1.05);
          box-shadow: 0 0 25px rgba(234, 88, 12, 0.6);
        }
      `}</style>
    </div>
  );
};

export default HeroCarousel;