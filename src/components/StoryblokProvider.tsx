'use client';
import { useEffect } from 'react';
import { getStoryblokApi } from '@/lib/storyblok';

export default function StoryblokProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Storyblok API
    getStoryblokApi();
    
    // Load the bridge manually for live editing in development
    if (process.env.NODE_ENV !== 'production') {
      console.log('🔄 Loading Storyblok bridge manually...');
      
      const loadBridge = () => {
        // Check if already loaded
        if (document.querySelector('script[src*="storyblok-v2-latest.js"]') || (window as any).StoryblokBridge) {
          console.log('📋 Bridge script or class already exists');
          if ((window as any).StoryblokBridge && !(window as any).storyblok) {
            initializeBridge();
          }
          return;
        }
        
        // Try multiple CDN sources in case one is blocked
        const scriptSources = [
          'https://app.storyblok.com/f/storyblok-v2-latest.js',
          '//app.storyblok.com/f/storyblok-v2-latest.js',
          'https://cdn.jsdelivr.net/npm/@storyblok/js@latest/dist/index.umd.js'
        ];
        
        let currentSourceIndex = 0;
        
        const tryLoadScript = () => {
          if (currentSourceIndex >= scriptSources.length) {
            console.error('❌ All Storyblok script sources failed to load');
            return;
          }
          
          const script = document.createElement('script');
          script.src = scriptSources[currentSourceIndex];
          script.async = true;
          
          script.onload = () => {
            console.log(`✅ Storyblok bridge script loaded from: ${scriptSources[currentSourceIndex]}`);
            
            // Wait a bit longer for the script to initialize
            setTimeout(() => {
              initializeBridge();
            }, 200);
          };
          
          script.onerror = () => {
            console.warn(`⚠️ Failed to load from: ${scriptSources[currentSourceIndex]}`);
            currentSourceIndex++;
            tryLoadScript();
          };
          
          document.head.appendChild(script);
          console.log(`📜 Attempting to load bridge script from: ${scriptSources[currentSourceIndex]}`);
        };
        
        tryLoadScript();
      };
      
      const initializeBridge = () => {
        if ((window as any).StoryblokBridge) {
          console.log('✅ StoryblokBridge class is available');
          
          // Initialize the bridge
          try {
            const bridge = new (window as any).StoryblokBridge({
              accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN
            });
            (window as any).storyblok = bridge;
            console.log('✅ Storyblok bridge initialized manually');
            
            // Test the bridge
            bridge.pingEditor((response: any) => {
              console.log('✅ Bridge ping successful - Visual Editor detected:', response);
            });
            
            // Listen for bridge events
            bridge.on(['input', 'published', 'change'], (event: any) => {
              console.log('🔄 Storyblok bridge event:', event.action, event);
              if (event.action === 'input') {
                // Trigger a page reload on content changes
                window.location.reload();
              }
            });
            
          } catch (error) {
            console.error('❌ Failed to initialize bridge:', error);
          }
        } else {
          console.warn('⚠️ StoryblokBridge class not found after script load');
          // Try to detect if we're in Visual Editor anyway
          if (window.location !== window.parent.location || window.frameElement) {
            console.log('🎯 Detected iframe context - likely in Visual Editor');
          }
        }
      };
      
      // Load immediately or when DOM is ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadBridge);
      } else {
        loadBridge();
      }
    }
  }, []);

  return <>{children}</>;
}
