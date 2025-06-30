'use client';
import React, { useState } from 'react';
import { storyblokEditable, SbBlokData } from '@storyblok/react';

interface ReservationFormBlok extends SbBlokData {
  component: 'reservation_form';
  pre_heading?: string;
  heading: string;
  subheading?: string;
  description?: string;
  success_message?: string;
  background_image?: {
    filename: string;
    alt: string;
  };
}

export default function ReservationForm({ blok }: { blok: ReservationFormBlok }) {
  const [isSubmitting, setIsSubmitting] = useState(false);  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    email: '',
    notes: ''
  });

  // Format title with orange period
  const formatTitleWithOrangePeriod = (titleText: string) => {
    const baseTitle = titleText?.endsWith('.') ? titleText.slice(0, -1) : titleText;
    return (
      <>
        {baseTitle}
        <span className="text-orange-500">.</span>
      </>
    );
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Format date input for better UX
    if (name === 'date') {
      let formattedValue = value.replace(/\D/g, ''); // Remove non-digits
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.substring(0, 2) + '/' + formattedValue.substring(2);
      }
      if (formattedValue.length >= 5) {
        formattedValue = formattedValue.substring(0, 5) + '/' + formattedValue.substring(5, 9);
      }
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const form = e.target as HTMLFormElement;
      const formDataObj = new FormData(form);
      
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataObj,
      });      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          phone: '',
          date: '',
          email: '',
          notes: ''
        });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your reservation. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };  if (isSubmitted) {
    return (
      <div 
        {...storyblokEditable(blok)} 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: blok.background_image?.filename 
            ? `url(${blok.background_image.filename})` 
            : 'linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url("https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80")'
        }}      >
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="relative z-10 text-center text-white p-8">
          <h2 className="text-4xl font-bold mb-4 font-quentin">
            Thank You!
          </h2>
          <p className="text-xl font-roboto">
            {blok.success_message || "Your reservation request has been submitted. We'll be in touch soon to confirm your booking."}
          </p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="mt-6 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded font-medium transition-colors"
          >
            Submit Another Reservation
          </button>
        </div>
      </div>
    );
  }  return (
    <div 
      {...storyblokEditable(blok)} 
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: blok.background_image?.filename 
          ? `url(${blok.background_image.filename})` 
          : 'linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url("https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80")'
      }}    >
      <div className="absolute inset-0 bg-black/80"></div>
      
      {/* Form container */}
      <div className="relative z-10 w-full max-w-2xl mx-auto p-6">        <div className="text-white mb-8">
          {/* Pre-heading */}
          {blok.pre_heading && (
            <div className="font-quentin text-orange-500 text-2xl md:text-3xl mb-2">
              {blok.pre_heading}
            </div>
          )}
          
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-wide mb-4 font-oswald">
            {formatTitleWithOrangePeriod(blok.heading || 'RESERVATION FORM')}
          </h1>
          
          {/* Subheading */}
          {blok.subheading && (
            <h2 className="text-xl md:text-2xl text-white font-oswald font-light mb-4">
              {blok.subheading}
            </h2>
          )}
          
          {/* Description */}
          {blok.description && (
            <p className="text-lg md:text-xl leading-relaxed max-w-2xl font-roboto text-white/90">
              {blok.description}
            </p>
          )}
        </div><form 
          onSubmit={handleSubmit}
          action="https://api.web3forms.com/submit"
          method="POST"
          className="space-y-6"
        >
          {/* Web3Forms Access Key - Replace with your actual access key */}
          <input type="hidden" name="access_key" value={process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || 'YOUR_ACCESS_KEY_HERE'} />
          
          {/* Custom subject for better email organization */}
          <input type="hidden" name="subject" value="New Basement Reservation Request" />
          
          {/* From name for better email identification */}
          <input type="hidden" name="from_name" value="Cedar Jacks Reservation Form" />
          
          {/* Honeypot field for spam protection */}
          <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />          {/* Form fields grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name*"
                required
                className="w-full bg-transparent border border-gray-400 text-white placeholder-gray-400 px-4 py-3 focus:border-orange-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Phone */}
            <div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone*"
                required
                className="w-full bg-transparent border border-gray-400 text-white placeholder-gray-400 px-4 py-3 focus:border-orange-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Date - using text input with placeholder for better UX */}
            <div>
              <input
                type="text"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                placeholder="mm/dd/yyyy"
                required
                pattern="^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$"
                title="Please enter date in MM/DD/YYYY format"
                className="w-full bg-transparent border border-gray-400 text-white placeholder-gray-400 px-4 py-3 focus:border-orange-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email*"
                required
                className="w-full bg-transparent border border-gray-400 text-white placeholder-gray-400 px-4 py-3 focus:border-orange-500 focus:outline-none transition-colors"
              />
            </div>
          </div>          {/* Notes - Full width */}
          <div className="mt-6">
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Notes"
              rows={6}
              className="w-full bg-transparent border border-gray-400 text-white placeholder-gray-400 px-4 py-3 focus:border-orange-500 focus:outline-none transition-colors resize-none"
            />
          </div>

          {/* Submit button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white font-bold py-4 px-8 uppercase tracking-wide transition-colors duration-200 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
