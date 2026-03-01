import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedDishes from './components/FeaturedDishes';
import About from './components/About';
import Testimonials from './components/Testimonials';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

/**
 * Main application component that orchestrates all the sections of the food website UI.
 * Manages the state for the mobile navigation menu.
 */
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle the mobile navigation menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-dark bg-light">
      {/* Navbar component with menu toggle functionality */}
      <Navbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      
      {/* Main content area */}
      <main className="flex-grow">
        {/* Hero Section: The main banner with a call to action */}
        <Hero />
        
        {/* Featured Dishes Section: Highlights popular menu items */}
        <FeaturedDishes />
        
        {/* About Us Section: Information about the restaurant */}
        <About />
        
        {/* Testimonials Section: Customer reviews */}
        <Testimonials />
        
        {/* Call To Action Section: Encourages user engagement */}
        <CallToAction />
      </main>
      
      {/* Footer component with copyright and links */}
      <Footer />
    </div>
  );
}

export default App;
