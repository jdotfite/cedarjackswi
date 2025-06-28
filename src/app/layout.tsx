// app/layout.tsx
import type { Metadata } from "next";
import { Oswald, Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import StoryblokProvider from "@/components/StoryblokProvider";
import FontLoader from "@/components/FontLoader";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cedar Jacks WI",
  description: "Your trusted partner for quality services in Wisconsin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${roboto.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="preload"
          href="/fonts/Quentin.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Suppress browser extension runtime errors
              window.addEventListener('error', function(e) {
                if (e.message && (
                  e.message.includes('Extension') || 
                  e.message.includes('runtime.lastError') ||
                  e.filename && e.filename.includes('runExtension')
                )) {
                  e.preventDefault();
                  return false;
                }
              });
              
              // Suppress unhandled promise rejections from extensions
              window.addEventListener('unhandledrejection', function(e) {
                if (e.reason && (
                  String(e.reason).includes('Extension') ||
                  String(e.reason).includes('runtime.lastError')
                )) {
                  e.preventDefault();
                  return false;
                }
              });
            `,
          }}
        />
      </head>
      <body
        className="antialiased bg-[var(--background)] text-[var(--foreground)]"
        suppressHydrationWarning
      >
        <FontLoader />
        <StoryblokProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">{children}</main>
          </div>
        </StoryblokProvider>
      </body>
    </html>
  );
}