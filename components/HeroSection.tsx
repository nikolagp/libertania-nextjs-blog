'use client';

import React from 'react';
import { IoIosArrowDown } from 'react-icons/io';

const HeroSection = () => {
  return (
    <div className="relative bg-white dark:bg-gray-900 overflow-hidden h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white dark:bg-gray-900 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-bold text-gray-900 dark:text-white sm:text-5xl md:text-6xl font-cormorantGaramond">
                <span className="block">Либертаниа</span>
                <span className="block text-amber-700 dark:text-amber-500">
                  Центар за современа политика
                </span>
              </h1>
              <div className="mt-10 sm:mt-10 sm:flex sm:justify-center">
                <p className="mt-3 text-base text-gray-600 dark:text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 font-poppins">
                  <span className="inline-block animate-typing overflow-hidden whitespace-nowrap border-r-4 border-gray-600 dark:border-gray-400">
                    Индивидуална слобода, ограничена власт и слободно општество
                  </span>
                </p>
                <style jsx>{`
                  @keyframes typing {
                    from {
                      width: 0;
                    }
                    to {
                      width: 100%;
                    }
                  }
                  .animate-typing {
                    display: inline-block;
                    animation: typing 3s steps(50, end),
                      blink-caret 0.75s step-end infinite;
                  }
                  @keyframes blink-caret {
                    from,
                    to {
                      border-color: transparent;
                    }
                    50% {
                      border-color: inherit;
                    }
                  }
                `}</style>
              </div>
              <div className="lg:mt-20 sm:mt-6 sm:flex sm:justify-center">
                <div className="rounded-md shadow">
                  <button
                    onClick={() =>
                      window.scrollTo({
                        top: window.innerHeight,
                        behavior: 'smooth',
                      })
                    }
                    className="px-4 py-3 text-sm font-medium text-white bg-amber-700 rounded-lg hover:bg-amber-800 dark:bg-amber-600 dark:hover:bg-amber-700 transition-colors font-poppins"
                  >
                    <IoIosArrowDown className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
