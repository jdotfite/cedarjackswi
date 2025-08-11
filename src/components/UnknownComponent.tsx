import { SbBlokData } from '@storyblok/react';

export default function UnknownComponent({ blok }: { blok: SbBlokData }) {
  return (
    <div className="p-4 border border-dashed border-gray-500 text-gray-300 text-sm">
      Unknown component: {blok.component}
    </div>
  );
}
