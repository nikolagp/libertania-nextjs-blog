'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-gray-800 dark:bg-gray-900/95">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/logo.png"
              alt="Libertania Logo"
              width={40}
              height={40}
              className="rounded-md"
            />
            <span className="hidden font-cormorantGaramond text-xl font-bold sm:inline-block text-gray-900 dark:text-white">
              Libertania
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/about"
            className="font-poppins text-sm font-medium text-gray-700 transition-colors hover:text-amber-700 dark:text-gray-200 dark:hover:text-amber-500"
          >
            About Us
          </Link>
          <Link
            href="/"
            className="font-poppins text-sm font-medium text-gray-700 transition-colors hover:text-amber-700 dark:text-gray-200 dark:hover:text-amber-500"
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className="font-poppins text-sm font-medium text-gray-700 transition-colors hover:text-amber-700 dark:text-gray-200 dark:hover:text-amber-500"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <div className="relative hidden md:flex items-center">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <input
              type="search"
              placeholder="Search..."
              className="rounded-md border border-gray-300 bg-white px-3 py-2 pl-8 text-sm font-poppins ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-700 dark:border-gray-700 dark:bg-gray-900 dark:ring-offset-gray-900 dark:placeholder:text-gray-400 dark:focus:ring-amber-500"
            />
          </div>
          <button className="md:hidden rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
            <Search className="h-5 w-5 text-gray-700 dark:text-gray-200" />
          </button>
          <ThemeToggle />
          <button className="md:hidden rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 text-gray-700 dark:text-gray-200"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
