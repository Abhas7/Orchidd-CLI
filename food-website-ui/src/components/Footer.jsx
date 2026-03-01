import React from 'react';

/**
 * Footer component displaying copyright information, quick links, and social media icons.
 */
const Footer = () => {
  return (
    <footer className="bg-dark text-white py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {/* About Section */}
        <div>
          <h3 className="text-2xl font-bold font-serif mb-6 text-primary">Foodie Delight</h3>
          <p className="text-gray-300 leading-relaxed">
            Crafting delightful culinary experiences since 2023. Fresh ingredients, exquisite tastes, and a passion for food.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
          <ul className="space-y-3">
            <li><a href="#home" className="text-gray-300 hover:text-primary transition-colors duration-300">Home</a></li>
            <li><a href="#menu" className="text-gray-300 hover:text-primary transition-colors duration-300">Menu</a></li>
            <li><a href="#about" className="text-gray-300 hover:text-primary transition-colors duration-300">About Us</a></li>
            <li><a href="#contact" className="text-gray-300 hover:text-primary transition-colors duration-300">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Contact Us</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <span className="text-primary">📞</span>
              <a href="tel:+1234567890" className="text-gray-300 hover:text-primary transition-colors duration-300">+1 (234) 567-890</a>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-primary">✉️</span>
              <a href="mailto:info@foodiedelight.com" className="text-gray-300 hover:text-primary transition-colors duration-300">info@foodiedelight.com</a>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary">📍</span>
              <address className="not-italic text-gray-300">123 Flavor Street, Culinary City, Foodland</address>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-300 hover:text-primary transition-colors duration-300 text-3xl" aria-label="Facebook">FB</a>
            <a href="#" className="text-gray-300 hover:text-primary transition-colors duration-300 text-3xl" aria-label="Twitter">TW</a>
            <a href="#" className="text-gray-300 hover:text-primary transition-colors duration-300 text-3xl" aria-label="Instagram">IG</a>
            <a href="#" className="text-gray-300 hover:text-primary transition-colors duration-300 text-3xl" aria-label="LinkedIn">LI</a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-12 pt-8 text-center">
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Foodie Delight. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
