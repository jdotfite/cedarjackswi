'use client';
import React from 'react';
import Head from 'next/head';

const FontLoader: React.FC = () => {
  return (
    <>
      <style jsx global>{`
        /* Font display strategy to reduce FOUT (Flash of Unstyled Text) */
        @font-face {
          font-family: 'Quentin';
          src: url('/fonts/Quentin.otf') format('opentype');
          font-weight: normal;
          font-style: normal;
          font-display: block; /* Forces a short block period and fast swap */
        }
      `}</style>
    </>
  );
};

export default FontLoader;
