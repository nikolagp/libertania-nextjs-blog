'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from './ThemeToggle';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-gray-800 dark:bg-gray-900/95">
      <div className="container max-w-7xl mx-auto px-4 flex h-16 items-center">
        {/* Left section - Logo */}
        <div className="flex-1 flex items-center justify-start">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/LogoBlackCirclewhitelogo.png"
              alt="Libertania Logo"
              width={60}
              height={60}
              className="rounded-md"
            />
          </Link>
        </div>

        {/* Middle section - Navigation */}
        <nav className="flex-1 hidden md:flex items-center justify-center space-x-8 text-1xl">
          <Link
            href="/"
            className=" text-gray-700 transition-colors hover:text-amber-700 dark:text-gray-200 dark:hover:text-amber-500"
          >
            Почетна
          </Link>
          <Link
            href="/about"
            className=" text-gray-700 transition-colors hover:text-amber-700 dark:text-gray-200 dark:hover:text-amber-500"
          >
            За нас
          </Link>
          <Link
            href="/blog"
            className=" text-gray-700 transition-colors hover:text-amber-700 dark:text-gray-200 dark:hover:text-amber-500"
          >
            Блог
          </Link>
          <Link
            href="/contact"
            className=" text-gray-700 transition-colors hover:text-amber-700 dark:text-gray-200 dark:hover:text-amber-500"
          >
            Контакт
          </Link>
        </nav>

        {/* Right section - Language and Theme toggles */}
        <div className="flex-1 flex items-center justify-end space-x-4">
          <select
            className="bg-transparent border-none text-sm font-medium text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-0"
            defaultValue="mk"
          >
            <option value="en">EN</option>
            <option value="mk">MK</option>
          </select>
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
