'use client';
import React from 'react';
import { useBeerData } from '../hooks/useBeerData';

const BeerList: React.FC = () => {
  const { beerData, loading, error } = useBeerData();

  if (loading) {
    return (
      <section className="bg-black text-white py-16" style={{ fontFamily: 'Oswald, sans-serif' }}>
        <div className="max-w-6xl mx-auto px-8 text-center">
          <div className="animate-pulse text-orange-400 text-xl">Loading our finest beers...</div>
        </div>
      </section>
    );
  }

  if (error || !beerData?.beers) {
    return (
      <section className="bg-black text-white py-16" style={{ fontFamily: 'Oswald, sans-serif' }}>
        <div className="max-w-6xl mx-auto px-8 text-center text-red-400">
          Error loading beer menu: {error}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-black text-white py-16" style={{ fontFamily: 'Oswald, sans-serif' }}>
      <div className="max-w-6xl mx-auto px-8">
        {/* Header */}        <div className="text-center mb-12">
          <h2>
<span className="italic text-orange-400 text-[45px] block mb-2 font-quentin leading-[0.8]">
      {beerData.subtitle}
    </span>
            <span className="uppercase font-bold text-4xl md:text-6xl tracking-wide">
              {beerData.title}
            </span>
          </h2>
        </div>
        
        {/* Beer List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-6">
          {beerData.beers.map((beer) => (
            <div key={beer._uid} className="flex items-start">
              {/* Logo */}
              <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center mr-4">
                {beer.logo?.filename ? (
                  <img
                    src={beer.logo.filename}
                    alt={beer.name}
                    className="w-10 h-10 object-contain"
                  />
                ) : (
                  <span className="text-2xl">🍺</span>
                )}
              </div>
              
              {/* Details */}
              <div className="flex-1 min-w-0">
                {/* Name, dots, and price row */}
                <div className="flex items-baseline">
                  <h3 className="uppercase font-bold text-lg tracking-wide whitespace-nowrap">
                    {beer.name}
                  </h3>
                  
<div className="relative table-cell  h-[2px] w-[98%] border-b-2 border-dotted border-white mx-2 z-10"></div>
                  
                  <span className="font-bold text-lg whitespace-nowrap">
                    ${beer.price}
                  </span>
                </div>
                
                {/* Description */}
                {beer.description && (
                  <p className="text-orange-400 text-sm leading-tight" style={{ fontFamily: 'var(--font-body)' }}>
                    {beer.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Footer Button */}
        <div className="text-center mt-12">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded uppercase font-semibold tracking-wide transition-colors">
            View Menu
          </button>
        </div>
      </div>
    </section>
  );
};

export default BeerList;
