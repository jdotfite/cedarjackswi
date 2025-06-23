'use client';
import React from 'react';
import { useBeerData } from '../hooks/useBeerData';

const BeerDigitalScreen: React.FC = () => {
  const { beerData, loading, error } = useBeerData();

  if (loading) {
    return (
      <div className="h-screen bg-black flex items-center justify-center text-white" style={{ fontFamily: 'Oswald, sans-serif' }}>
        <div className="text-center">
          <div className="text-6xl text-orange-400 mb-4">🍺</div>
          <div className="text-4xl">Loading Beer Menu...</div>
        </div>
      </div>
    );
  }

  if (error || !beerData?.beers) {
    return (
      <div className="h-screen bg-black flex items-center justify-center text-white" style={{ fontFamily: 'Oswald, sans-serif' }}>
        <div className="text-center text-red-400 text-3xl">
          Error loading beer menu: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8" style={{ fontFamily: 'Oswald, sans-serif' }}>
      <div className="text-center mb-16">
        <h1 className="text-6xl lg:text-8xl font-light tracking-wider mb-8">
          <span className="text-orange-400 italic text-4xl lg:text-6xl block mb-4">
            {beerData.subtitle}
          </span>
          <span className="font-bold">{beerData.title}</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {beerData.beers.map((beer) => (
          <div key={beer._uid} className="bg-gray-900 rounded-xl p-8 hover:bg-gray-800 transition-colors duration-300 border border-gray-700">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="bg-orange-400 rounded-full w-24 h-24 flex items-center justify-center">
                {beer.logo?.filename ? (
                  <img
                    src={beer.logo.filename}
                    alt={beer.name}
                    className="w-16 h-16 object-contain"
                  />
                ) : (
                  <span className="text-4xl">🍺</span>
                )}
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold tracking-wider text-white mb-2">
                {beer.name}
              </h2>
              <div className="text-orange-400 font-bold text-3xl lg:text-4xl">
                ${beer.price}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-16 text-gray-400 text-xl lg:text-2xl">
        <p>All beers served at optimal temperature</p>
      </div>
    </div>
  );
};

export default BeerDigitalScreen;
