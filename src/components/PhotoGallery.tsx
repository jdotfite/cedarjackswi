'use client';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade, Thumbs } from 'swiper/modules';
import { storyblokEditable, SbBlokData } from '@storyblok/react';
import Image from 'next/image';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/thumbs';

interface PhotoItem {
  _uid: string;
  component: 'photo_item';
  image: {
    filename: string;
    alt: string;
  };
  caption?: string;
}

interface PhotoGalleryBlok extends SbBlokData {
  component: 'photo_gallery';
  title?: string;
  photos?: PhotoItem[];
}

interface PhotoGalleryProps {
  blok?: PhotoGalleryBlok;
  title?: string;
  className?: string;
}

export default function PhotoGallery({ blok, title = "Gallery", className = "" }: PhotoGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  // Speakeasy photos from Storyblok - using actual uploaded images
  const samplePhotos = [
    {
      _uid: 'speakeasy1',
      component: 'photo_item' as const,
      image: {
        filename: 'https://a.storyblok.com/f/340027/speakeasy-1.jpg',
        alt: 'Cedar Jacks Speakeasy - Main Area'
      },
      caption: 'The main speakeasy area with comfortable seating'
    },
    {
      _uid: 'speakeasy2', 
      component: 'photo_item' as const,
      image: {
        filename: 'https://a.storyblok.com/f/340027/speakeasy-2.jpg',
        alt: 'Cedar Jacks Speakeasy - Seating Area'
      },
      caption: 'Intimate seating perfect for private events'
    },
    {
      _uid: 'speakeasy3',
      component: 'photo_item' as const,
      image: {
        filename: 'https://a.storyblok.com/f/340027/speakeasy-3.jpg', 
        alt: 'Cedar Jacks Speakeasy - Full View'
      },
      caption: 'Full view of our basement speakeasy'
    },
    {
      _uid: 'speakeasy4',
      component: 'photo_item' as const,
      image: {
        filename: 'https://a.storyblok.com/f/340027/speakeasy-4.jpg',
        alt: 'Cedar Jacks Speakeasy - Entertainment Area'
      },
      caption: 'Entertainment area with games and activities'
    },
    {
      _uid: 'speakeasy5',
      component: 'photo_item' as const,
      image: {
        filename: 'https://a.storyblok.com/f/340027/speakeasy-5.jpg',
        alt: 'Cedar Jacks Speakeasy - Another View'
      },
      caption: 'Another perspective of our speakeasy space'
    },
    {
      _uid: 'speakeasy6',
      component: 'photo_item' as const,
      image: {
        filename: 'https://a.storyblok.com/f/340027/speakeasy-6.jpg',
        alt: 'Cedar Jacks Speakeasy - Bar Area'
      },
      caption: 'The bar area for your private events'
    }
  ];

  // Use Storyblok photos if available, otherwise fall back to sample photos
  const photos = blok?.photos || samplePhotos;
  const galleryTitle = blok?.title || title || "Our Speakeasy";

  return (
    <div {...(blok ? storyblokEditable(blok) : {})} className={`font-oswald ${className}`}>
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-4xl md:text-5xl font-bold uppercase mb-8 text-center text-white">
          {galleryTitle}
          <span className="text-orange-500">.</span>
        </h2>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Main Gallery Swiper */}
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectFade, Thumbs]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            pagination={{
              clickable: true,
              renderBullet: (index: number, className: string) => {
                return `<span class="${className} custom-bullet"></span>`;
              },
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            loop={true}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            className="rounded-lg overflow-hidden shadow-2xl mb-8"
          >
            {photos.map((photo) => (
              <SwiperSlide key={photo._uid}>
                <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
                  <Image
                    src={photo.image.filename}
                    alt={photo.image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    priority={photo._uid === photos[0]._uid}
                  />
                  
                  {/* Speakeasy vibe overlay - lighter for mobile visibility */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/50 z-10"></div>
                  <div className="absolute inset-0 bg-black/15 z-10"></div>
                  
                  {photo.caption && (
                    <div className="absolute bottom-16 left-0 right-0 bg-black/70 text-white p-3 z-20">
                      <p className="text-lg font-medium text-center">{photo.caption}</p>
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons - Matching Homepage Hero */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-30">
            <button className="swiper-button-prev-custom group w-12 h-12 flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer bg-black/20 rounded-full">
              <svg width="24" height="38" viewBox="0 0 24 38" xmlns="http://www.w3.org/2000/svg" className="w-3 h-auto transition-colors duration-300">
                <path 
                  d="M23.99,19.01c0,5.37-.01,10.74.01,16.11,0,1.22-.46,2.11-1.58,2.61-1.14.51-2.21.3-3.13-.51-1.44-1.27-2.87-2.56-4.3-3.84-4.65-4.17-9.3-8.34-13.96-12.49-.69-.61-1.13-1.27-1.02-2.22.08-.63.44-1.09.89-1.5,2.3-2.06,4.6-4.12,6.9-6.17,3.79-3.38,7.59-6.76,11.38-10.13,1.3-1.16,3-1.14,4.16.04.47.49.65,1.08.65,1.74,0,5.46,0,10.91,0,16.37Z"
                  className="fill-white group-hover:fill-[#ea580c]"
                />
              </svg>
            </button>
          </div>
          
          <div className="absolute right-4 top-1/2 -translate-y-1/2 z-30">
            <button className="swiper-button-next-custom group w-12 h-12 flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer bg-black/20 rounded-full">
              <svg width="24" height="38" viewBox="0 0 24 38" xmlns="http://www.w3.org/2000/svg" className="w-3 h-auto transition-colors duration-300">
                <path 
                  d="M.01,18.99c0-5.37.01-10.74-.01-16.11C0,1.67.46.78,1.58.28,2.72-.24,3.78-.02,4.71.79c1.44,1.27,2.87,2.56,4.3,3.84,4.65,4.17,9.3,8.34,13.96,12.49.69.61,1.13,1.27,1.02,2.22-.08.63-.44,1.09-.89,1.5-2.3,2.06-4.6,4.12-6.9,6.17-3.79,3.38-7.59,6.76-11.38,10.13-1.3,1.16-3,1.14-4.16-.04-.47-.49-.65-1.08-.65-1.74,0-5.46,0-10.91,0-16.37Z"
                  className="fill-white group-hover:fill-[#ea580c]"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Thumbnail Swiper */}
        <div className="max-w-2xl mx-auto mt-8">
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={12}
            slidesPerView="auto"
            freeMode={true}
            watchSlidesProgress={true}
            modules={[Navigation, Thumbs]}
            className="gallery-thumbs"
            breakpoints={{
              320: {
                slidesPerView: 3,
                spaceBetween: 8,
              },
              480: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 5,
                spaceBetween: 12,
              },
              768: {
                slidesPerView: 6,
                spaceBetween: 12,
              },
              1024: {
                slidesPerView: 8,
                spaceBetween: 12,
              },
            }}
          >
            {photos.map((photo, index) => (
              <SwiperSlide key={photo._uid} className="!w-auto">
                <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden cursor-pointer hover:opacity-75 transition-opacity border-2 border-transparent hover:border-orange-500">
                  <Image
                    src={photo.image.filename}
                    alt={`Thumbnail ${index + 1}`}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                  
                  {/* Speakeasy vibe overlay for thumbnails - lighter for mobile visibility */}
                  <div className="absolute inset-0 bg-black/25 z-10"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/5 to-black/25 z-10"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Custom Pagination Styles */}
      <style jsx>{`
        :global(.gallery-thumbs .swiper-slide-thumb-active .w-16, .gallery-thumbs .swiper-slide-thumb-active .md\\:w-20) {
          border-color: #ea580c !important;
        }

        :global(.swiper-pagination) {
          position: absolute;
          bottom: 8px !important;
          left: 0;
          right: 0;
          display: flex !important;
          justify-content: center;
          z-index: 20;
        }

        :global(.custom-bullet) {
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
        
        :global(.custom-bullet:hover) {
          transform: scale(1.2);
          border-color: rgba(255, 255, 255, 0.9);
          background: rgba(255, 255, 255, 0.2);
        }
        
        :global(.swiper-pagination-bullet-active.custom-bullet) {
          background: #ea580c;
          border-color: #ea580c;
          width: 40px;
          border-radius: 20px;
          transform: scale(1);
          box-shadow: 0 0 20px rgba(234, 88, 12, 0.4);
        }
        
        :global(.swiper-pagination-bullet-active.custom-bullet:hover) {
          transform: scale(1.05);
          box-shadow: 0 0 25px rgba(234, 88, 12, 0.6);
        }
      `}</style>
    </div>
  );
}
