// components/OpenHours.tsx
'use client';
import React from 'react';
import { storyblokEditable, SbBlokData } from '@storyblok/react';

// Define types for the hours data
interface HourItem {
  day: string;
  time: string;
  closed: boolean;
}

interface HourEntry {
  _uid: string;
  component: 'hour_entry';
  day: string;
  opening_time: string;
  closing_time: string;
  is_closed: boolean;
}

interface OpenHoursBlok extends SbBlokData {
  component: 'open_hours';
  title?: string;
  hours_data?: HourEntry[];
}

interface OpenHoursProps {
  blok?: OpenHoursBlok;
  title?: string;
  className?: string;
}

export default function OpenHours({ blok, title = "", className = "" }: OpenHoursProps) {
  // Helper function to append period to title
  const formatTitle = (titleText: string) => {
    return titleText?.endsWith('.') ? titleText : `${titleText}.`;
  };

  // Helper function to capitalize day names
  const capitalizeDay = (day: string) => {
    return day.charAt(0).toUpperCase() + day.slice(1);
  };

  // Helper function to format time (convert 24hr to 12hr if needed)
  const formatTime = (time: string) => {
    if (!time) return '';
    
    // If time is already in 12hr format, return as is
    if (time.toLowerCase().includes('am') || time.toLowerCase().includes('pm')) {
      return time.toUpperCase();
    }
    
    // Convert 24hr to 12hr format
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  // If blok is provided, use it; otherwise, fall back to default hours
  if (blok && blok.hours_data && blok.hours_data.length > 0) {
    // Process the hours data from Storyblok
    const hours: HourItem[] = blok.hours_data.map((entry: HourEntry): HourItem => ({
      day: capitalizeDay(entry.day),
      time: entry.is_closed 
        ? 'Closed' 
        : `${formatTime(entry.opening_time)} - ${formatTime(entry.closing_time)}`,
      closed: entry.is_closed
    }));

    return (
      <div {...storyblokEditable(blok)} className={`font-oswald ${className}`}>
        <h4 className="text-lg font-medium uppercase mb-4">{formatTitle(blok.title || title)}</h4>
        <ul className="list-none space-y-2">
          {hours.map(({ day, time, closed }: HourItem) => (
            <li key={day} className="flex items-center">
              <span className="uppercase">{day}</span>
              <span className="flex-1 border-b border-dotted border-white mx-2" />
              <span className="uppercase">
                {closed ? 'Closed' : time}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  // If blok is provided but no hours data, or for backward compatibility
  if (blok) {
    // If no hours data is available, provide default hours
    const defaultHours: HourItem[] = [
      { day: 'Monday', time: 'Closed', closed: true },
      { day: 'Tuesday', time: 'Closed', closed: true },
      { day: 'Wednesday', time: '4:00 PM - 12:00 AM', closed: false },
      { day: 'Thursday', time: '4:00 PM - 12:00 AM', closed: false },
      { day: 'Friday', time: '4:00 PM - 12:00 AM', closed: false },
      { day: 'Saturday', time: '4:00 PM - 12:00 AM', closed: false },
      { day: 'Sunday', time: 'Closed', closed: true }
    ];

    return (
      <div {...storyblokEditable(blok)} className={`font-oswald ${className}`}>
        <h4 className="text-lg font-medium uppercase mb-4">{formatTitle(blok.title || title)}</h4>
        <ul className="list-none space-y-2">
          {defaultHours.map(({ day, time, closed }: HourItem) => (
            <li key={day} className="flex items-center">
              <span className="uppercase">{day}</span>
              <span className="flex-1 border-b border-dotted border-white mx-2" />
              <span className="uppercase">
                {closed ? 'Closed' : time}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  // Fallback to default hours for standalone usage
  const defaultHours: HourItem[] = [
    { day: 'Monday', time: 'Closed', closed: true },
    { day: 'Tuesday', time: 'Closed', closed: true },
    { day: 'Wednesday', time: '4:00 PM - 12:00 AM', closed: false },
    { day: 'Thursday', time: '4:00 PM - 12:00 AM', closed: false },
    { day: 'Friday', time: '4:00 PM - 12:00 AM', closed: false },
    { day: 'Saturday', time: '4:00 PM - 12:00 AM', closed: false },
    { day: 'Sunday', time: 'Closed', closed: true }
  ];
  return (
    <div className={`font-oswald ${className}`}>
      <h4 className="text-lg uppercase mb-4">{formatTitle(title)}</h4>
      <ul className="list-none space-y-2">
        {defaultHours.map(({ day, time, closed }: HourItem) => (
          <li key={day} className="flex items-center">
            <span className="uppercase">{day}</span>
            <span className="flex-1 border-b border-dotted border-white mx-2" />
            <span className="uppercase">
              {closed ? 'Closed' : time}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Named export for better compatibility
export { OpenHours };