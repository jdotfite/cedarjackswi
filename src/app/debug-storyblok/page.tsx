'use client';
import { useEffect, useState } from 'react';

export default function StoryblokDebug() {
  const [bridgeStatus, setBridgeStatus] = useState<string>('Checking...');
  const [windowStoryblok, setWindowStoryblok] = useState<any>(null);

  useEffect(() => {
    const checkBridge = () => {
      if (typeof window !== 'undefined') {
        const storyblok = (window as any).storyblok;
        setWindowStoryblok(storyblok);
        
        if (storyblok) {
          setBridgeStatus('✅ Storyblok Bridge is loaded');
          
          // Listen for story changes
          storyblok.on(['input', 'published', 'change'], (payload: any) => {
            console.log('Storyblok event received:', payload);
          });
          
          // Ping Storyblok
          storyblok.pingEditor(() => {
            console.log('Pinged Storyblok Editor successfully');
          });
        } else {
          setBridgeStatus('❌ Storyblok Bridge not found');
        }
      }
    };

    // Check immediately
    checkBridge();
    
    // Check again after a delay (in case script is still loading)
    const timeout = setTimeout(checkBridge, 2000);
    
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Storyblok Debug Information</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Bridge Status</h2>
          <p className="text-lg">{bridgeStatus}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
          <div className="space-y-2">
            <p><strong>NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN:</strong> {process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN ? '✅ Set' : '❌ Not set'}</p>
            <p><strong>NODE_ENV:</strong> {process.env.NODE_ENV}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Window Storyblok Object</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
            {windowStoryblok ? JSON.stringify(Object.keys(windowStoryblok), null, 2) : 'Not available'}
          </pre>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Instructions</h2>
          <div className="space-y-2 text-sm">
            <p>1. Make sure you're accessing this page through the Storyblok Visual Editor</p>
            <p>2. The preview URL should be: <code className="bg-gray-100 px-2 py-1 rounded">https://localhost:3010/debug-storyblok</code></p>
            <p>3. If the bridge is not loaded, check that:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>You're using HTTPS (https://localhost:3010)</li>
              <li>The Visual Editor preview URL is correctly set in Storyblok</li>
              <li>There are no console errors blocking the script</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
