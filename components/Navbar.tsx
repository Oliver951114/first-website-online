'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center space-x-2"
            >
              <span className="text-2xl font-bold text-[#FF7F50]">Andy的AI Lab</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/about"
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive('/about')
                  ? 'text-[#FF7F50]'
                  : 'text-gray-600 hover:text-[#FF7F50]'
              }`}
            >
              關於本站
            </Link>
            <Link
              href="/faq"
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive('/faq')
                  ? 'text-[#FF7F50]'
                  : 'text-gray-600 hover:text-[#FF7F50]'
              }`}
            >
              常見問答
            </Link>
            <Link
              href="/ai-chat"
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive('/ai-chat')
                  ? 'text-[#FF7F50]'
                  : 'text-gray-600 hover:text-[#FF7F50]'
              }`}
            >
              AI客服
            </Link>
            <Link
              href="/ai-lang"
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive('/ai-lang')
                  ? 'text-[#FF7F50]'
                  : 'text-gray-600 hover:text-[#FF7F50]'
              }`}
            >
              AI語言學習
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-[#FF7F50] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#FF7F50]"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">開啟選單</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            href="/about"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/about')
                ? 'text-[#FF7F50] bg-gray-50'
                : 'text-gray-600 hover:text-[#FF7F50] hover:bg-gray-50'
            }`}
          >
            關於本站
          </Link>
          <Link
            href="/faq"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/faq')
                ? 'text-[#FF7F50] bg-gray-50'
                : 'text-gray-600 hover:text-[#FF7F50] hover:bg-gray-50'
            }`}
          >
            常見問答
          </Link>
          <Link
            href="/ai-chat"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/ai-chat')
                ? 'text-[#FF7F50] bg-gray-50'
                : 'text-gray-600 hover:text-[#FF7F50] hover:bg-gray-50'
            }`}
          >
            AI客服
          </Link>
          <Link
            href="/ai-lang"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/ai-lang')
                ? 'text-[#FF7F50] bg-gray-50'
                : 'text-gray-600 hover:text-[#FF7F50] hover:bg-gray-50'
            }`}
          >
            AI語言學習
          </Link>
        </div>
      </div>
    </nav>
  );
}
