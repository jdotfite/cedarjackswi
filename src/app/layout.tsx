// app/layout.tsx
import type { Metadata } from "next";
import { Oswald, Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
// Remove this line: import Footer from "@/components/Footer";
import StoryblokProvider from "@/components/StoryblokProvider";
import FontLoader from "@/components/FontLoader";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-heading",
});

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Cedar Jacks WI",
  description: "Your trusted partner for quality services in Wisconsin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {  return (
    <html lang="en">
      <head>
        <link 
          rel="preload" 
          href="/fonts/Quentin.otf" 
          as="font" 
          type="font/otf" 
          crossOrigin="anonymous" 
        />
      </head>
      <body
        className={`${oswald.variable} ${roboto.variable} antialiased bg-[var(--background)] text-[var(--foreground)]`}
      >
        <FontLoader />
        <StoryblokProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            {/* Remove <Footer /> - it will come from Storyblok now */}
          </div>
        </StoryblokProvider>
      </body>
    </html>
  );
}