'use client';
import React from 'react';
import { storyblokEditable, SbBlokData } from '@storyblok/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface GalleryImage extends SbBlokData {
  component: 'gallery_image';
  image: {
    filename: string;
    alt: string;
  };
  caption?: string;
}

interface AboutPhotoGalleryBlok extends SbBlokData {
  component: 'about_photo_gallery';
  heading: string;
  description?: string;
  images: GalleryImage[];
  layout?: 'carousel' | 'grid';
  background_color?: 'black' | 'gray' | 'dark_gray';
}

export default function AboutPhotoGallery({ blok }: { blok: AboutPhotoGalleryBlok }) {
  // Format heading with orange period
  const formatTitleWithOrangePeriod = (titleText: string) => {
    const baseTitle = titleText?.endsWith('.') ? titleText.slice(0, -1) : titleText;
    return (
      <>
        {baseTitle}
        <span className="text-orange-500">.</span>
      </>
    );
  };

  const backgroundClasses = {
    black: 'bg-black',
    gray: 'bg-neutral-900',
    dark_gray: 'bg-gray-800'
  };

  const bgClass = backgroundClasses[blok.background_color || 'black'];

  if (blok.layout === 'grid') {
    return (
      <section {...storyblokEditable(blok)} className={`${bgClass} py-16 lg:py-24`}>
        <div className="container mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-oswald uppercase tracking-wide">
              {formatTitleWithOrangePeriod(blok.heading || 'Our Space')}
            </h2>
            {blok.description && (
              <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed font-roboto">
                {blok.description}
              </p>
            )}
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blok.images?.map((imageBlok) => (
              <div key={imageBlok._uid} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg shadow-xl">
                  <img 
                    src={imageBlok.image.filename}
                    alt={imageBlok.image.alt}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                  {imageBlok.caption && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-white text-sm font-medium">{imageBlok.caption}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Carousel Layout (default)
  return (
    <section {...storyblokEditable(blok)} className={`${bgClass} py-16 lg:py-24`}>
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-oswald uppercase tracking-wide">
            {formatTitleWithOrangePeriod(blok.heading || 'Our Space')}
          </h2>
          {blok.description && (
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed font-roboto">
              {blok.description}
            </p>
          )}
        </div>

        {/* Carousel */}
        <div className="max-w-5xl mx-auto">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            centeredSlides={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            pagination={{
              clickable: true,
              el: '.swiper-pagination-custom',
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
                centeredSlides: true,
              },
              768: {
                slidesPerView: 2,
                centeredSlides: true,
              },
              1024: {
                slidesPerView: 2.5,
                centeredSlides: true,
              },
            }}
            className="about-gallery-swiper"
          >
            {blok.images?.map((imageBlok) => (
              <SwiperSlide key={imageBlok._uid}>
                <div className="relative group">
                  <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden shadow-xl">
                    <img 
                      src={imageBlok.image.filename}
                      alt={imageBlok.image.alt}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                  </div>
                  {imageBlok.caption && (
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white text-sm font-medium bg-black/60 backdrop-blur-sm px-3 py-2 rounded">
                        {imageBlok.caption}
                      </p>
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button className="swiper-button-prev-custom bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="swiper-pagination-custom flex space-x-2"></div>
            <button className="swiper-button-next-custom bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .about-gallery-swiper .swiper-pagination-custom .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: #6b7280;
          opacity: 1;
          margin: 0 4px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        
        .about-gallery-swiper .swiper-pagination-custom .swiper-pagination-bullet-active {
          background: #ea580c;
          transform: scale(1.2);
        }
      `}</style>
    </section>
  );
}
