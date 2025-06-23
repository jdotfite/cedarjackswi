import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-black shadow-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-white font-heading">
              Cedar Jacks WI
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium font-body"
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium font-body"
            >
              About
            </Link>
            <Link 
              href="/services" 
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium font-body"
            >
              Services
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium font-body"
            >
              Contact
            </Link>
          </nav>
          <div className="md:hidden">
            <button className="text-gray-300 hover:text-white">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
