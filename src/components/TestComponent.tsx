'use client';
import React from 'react';
import { SbBlokData } from '@storyblok/react';

interface TestComponentBlok extends SbBlokData {
  component: 'test_component';
}

const TestComponent: React.FC<{ blok: TestComponentBlok }> = ({ blok }) => {
  return (
    <div className="bg-red-500 text-white p-4">
      <h2>Test Component Works!</h2>
      <p>Component: {blok.component}</p>
      <pre>{JSON.stringify(blok, null, 2)}</pre>
    </div>
  );
};

export default TestComponent;
