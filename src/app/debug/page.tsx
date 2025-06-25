'use client';

import { useEffect, useState } from 'react';
import { getStoryblokApi } from '@/lib/storyblok';
import { StoryblokComponent, storyblokEditable, useStoryblokState, useStoryblokBridge, ISbStoryData } from '@storyblok/react';
import { useParams } from 'next/navigation';

export default function DebugPage() {
  const [story, setStory] = useState<ISbStoryData | null>(null);
  const [bridgeStatus, setBridgeStatus] = useState<string>('Checking...');
  const [windowStoryblok, setWindowStoryblok] = useState<any>(null);
  
  // Use Storyblok state for live editing
  const storyFromBridge = useStoryblokState(story);

  // Activate the bridge for this debug page
  useStoryblokBridge(
    story?.id || 0,
    (newStory) => {
      console.log('✅ Bridge callback triggered with new story:', newStory);
      setStory(newStory);
      setBridgeStatus('✅ Bridge is working - story updated via callback!');
    }
  );

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const storyblokApi = getStoryblokApi();
        const { data } = await storyblokApi.get(`cdn/stories/debug`, {
          version: 'draft'
        });
        setStory(data.story);
      } catch (err) {
        console.log('No debug story found, using fallback content');
      }
    };

    fetchStory();
  }, []);  useEffect(() => {
    const checkBridge = () => {
      if (typeof window !== 'undefined') {
        const storyblok = (window as any).storyblok;
        const hasScript = document.querySelector('script[src*="storyblok-v2-latest.js"]');
        const storyblokBridge = (window as any).StoryblokBridge;
        
        console.log('Bridge check:', {
          storyblok: !!storyblok,
          StoryblokBridge: !!storyblokBridge,
          hasScript: !!hasScript,
          windowKeys: Object.keys(window).filter(key => key.toLowerCase().includes('story')),
          userAgent: navigator.userAgent,
          url: window.location.href
        });
        
        setWindowStoryblok(storyblok);
        
        if (storyblok) {
          setBridgeStatus('✅ Storyblok Bridge is loaded and working!');
          
          // Listen for story changes
          storyblok.on(['input', 'published', 'change'], (payload: any) => {
            console.log('✅ Storyblok event received:', payload);
            setBridgeStatus('✅ Bridge is working - received live edit event!');
          });
          
          // Ping Storyblok
          storyblok.pingEditor(() => {
            console.log('✅ Pinged Storyblok Editor successfully');
          });
        } else if (storyblokBridge) {
          setBridgeStatus('⚠️ StoryblokBridge class available but bridge not initialized');
        } else {
          const errorMsg = hasScript ? 
            '⚠️ Bridge script loaded but classes not found' : 
            '❌ Storyblok Bridge script not found';
          setBridgeStatus(errorMsg);
        }
      }
    };

    checkBridge();
    const timeout1 = setTimeout(checkBridge, 2000);
    const timeout2 = setTimeout(checkBridge, 5000);
    
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, []);

  const content = storyFromBridge?.content || story?.content;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-8" {...(content ? storyblokEditable(content) : {})}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white text-center">
          🔧 Storyblok Live Editing Debug Page
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">🔗 Bridge Status</h2>
            <p className="text-lg font-mono bg-gray-100 p-3 rounded">{bridgeStatus}</p>
            {content && (
              <div className="mt-4 p-3 bg-green-100 rounded">
                <p className="text-green-800">✅ Story content loaded from Storyblok</p>
              </div>
            )}
          </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">⚙️ Environment</h2>
            <div className="space-y-2 text-sm">
              <p><strong>Access Token:</strong> {process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN ? '✅ Set' : '❌ Missing'}</p>
              <p><strong>Environment:</strong> {process.env.NODE_ENV}</p>
              <p><strong>URL:</strong> {typeof window !== 'undefined' ? window.location.href : 'Server side'}</p>
              <p><strong>In iFrame:</strong> {typeof window !== 'undefined' && (window.location !== window.parent.location || window.frameElement) ? '✅ Yes (Visual Editor)' : '❌ No'}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 md:col-span-2">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">🚫 Ad Blocker Detection</h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 mb-2"><strong>⚠️ Important:</strong></p>
              <p className="text-sm text-red-700 mb-2">
                Ad blockers (like uBlock Origin, AdBlock Plus, etc.) can prevent the Storyblok bridge from loading.
              </p>
              <p className="text-sm text-red-700 mb-2">
                If you see "ERR_BLOCKED_BY_CLIENT" errors in the console, try:
              </p>
              <ol className="list-decimal ml-6 space-y-1 text-sm text-red-700">
                <li>Temporarily disable your ad blocker for localhost:3010</li>
                <li>Add localhost:3010 to your ad blocker's whitelist</li>
                <li>Allow app.storyblok.com in your ad blocker settings</li>
                <li>Try opening in an incognito/private window with extensions disabled</li>
              </ol>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 md:col-span-2">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">🔍 Technical Details</h2>
            <div className="space-y-2 text-xs font-mono bg-gray-50 p-4 rounded">
              <p><strong>Bridge Script:</strong> {typeof window !== 'undefined' && document.querySelector('script[src*="storyblok-v2-latest.js"]') ? '✅ Loaded' : '❌ Not found'}</p>
              <p><strong>StoryblokBridge Class:</strong> {typeof window !== 'undefined' && (window as any).StoryblokBridge ? '✅ Available' : '❌ Not found'}</p>
              <p><strong>window.storyblok:</strong> {typeof window !== 'undefined' && (window as any).storyblok ? '✅ Available' : '❌ Not found'}</p>
              <p><strong>Story ID:</strong> {story?.id || 'Not loaded'}</p>
              <p><strong>Story from Bridge:</strong> {storyFromBridge ? 'Available' : 'Not available'}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 md:col-span-2">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">📝 Live Editing Test</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800 mb-2"><strong>Instructions:</strong></p>
              <ol className="list-decimal ml-6 space-y-1 text-sm text-yellow-700">
                <li>If you see "Bridge is loaded" above, try clicking on this text</li>
                <li>You should see edit controls appear when hovering/clicking</li>
                <li>Make a change to any text and it should update immediately</li>
                <li>If this works, your live editing is functioning correctly!</li>
              </ol>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 md:col-span-2">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">🚀 Next Steps</h2>
            <div className="prose text-sm">
              <p>If the bridge status shows as working:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Go back to your main pages and try editing content</li>
                <li>Text fields, images, and other content should be clickable for editing</li>
                <li>Changes should appear immediately without page reload</li>
              </ul>
              
              <p className="mt-4">If it's not working:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Make sure you're accessing via HTTPS (https://localhost:3010)</li>
                <li>Check that your Storyblok preview URL is set to https://localhost:3010</li>
                <li>Look for JavaScript errors in the browser console</li>
                <li>Verify you're using the correct preview token</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
