import React from 'react';

/**
 * Hero component for the main introductory section of the website.
 * Features a headline, a brief description, and call-to-action buttons.
 */
const Hero = () => {
  return (
    <section
      id="home"
      className="relative bg-gradient-to-r from-primary to-secondary text-white py-24 md:py-36 lg:py-48 flex items-center justify-center overflow-hidden"
    >
      {/* Background overlay for visual effect */}
      <div className="absolute inset-0 bg-dark opacity-30"></div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 text-center max-w-4xl">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-serif leading-tight mb-6 animate-fade-in-down">
          Savor the Flavor, Experience the Delight
        </h1>
        <p className="text-xl md:text-2xl mb-10 opacity-90 leading-relaxed animate-fade-in-up delay-200">
          Indulge in an exquisite culinary journey with our diverse menu, crafted with passion and the freshest ingredients.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6 animate-fade-in-up delay-400">
          <a
            href="#menu"
            className="bg-white text-primary hover:bg-gray-100 font-semibold py-4 px-10 rounded-full shadow-lg text-xl transform hover:scale-105 transition-all duration-300"
          >
            Explore Menu
          </a>
          <a
            href="#contact"
            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary font-semibold py-4 px-10 rounded-full shadow-lg text-xl transform hover:scale-105 transition-all duration-300"
          >
            Book a Table
          </a>
        </div>
      </div>

      {/* Decorative shapes */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full translate-x-1/2 translate-y-1/2"></div>
    </section>
  );
};

export default Hero;
