import React, { useState } from 'react';

/**
 * Navbar component provides navigation links and handles mobile responsiveness.
 * @param {object} props - Component props.
 * @param {boolean} props.isMenuOpen - State to control mobile menu visibility.
 * @param {function} props.toggleMenu - Function to toggle mobile menu visibility.
 */
const Navbar = ({ isMenuOpen, toggleMenu }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Effect to add a scroll listener for changing navbar style
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close menu when a navigation item is clicked (for mobile)
  const handleNavLinkClick = () => {
    if (isMenuOpen) {
      toggleMenu();
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg py-3' : 'bg-transparent py-5'}`}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Logo */}
        <a
          href="#home"
          className={`text-3xl font-bold font-serif ${isScrolled ? 'text-primary' : 'text-white'} transition-colors duration-300`}
          onClick={handleNavLinkClick}
        >
          Foodie<span className={isScrolled ? 'text-dark' : 'text-light'}>Delight</span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8">
          <a href="#home" className={`text-lg font-medium ${isScrolled ? 'text-dark hover:text-primary' : 'text-white hover:text-gray-200'} transition-colors duration-300`}>
            Home
          </a>
          <a href="#menu" className={`text-lg font-medium ${isScrolled ? 'text-dark hover:text-primary' : 'text-white hover:text-gray-200'} transition-colors duration-300`}>
            Menu
          </a>
          <a href="#about" className={`text-lg font-medium ${isScrolled ? 'text-dark hover:text-primary' : 'text-white hover:text-gray-200'} transition-colors duration-300`}>
            About Us
          </a>
          <a href="#contact" className={`text-lg font-medium ${isScrolled ? 'text-dark hover:text-primary' : 'text-white hover:text-gray-200'} transition-colors duration-300`}>
            Contact
          </a>
        </div>

        {/* Mobile Menu Button (Hamburger) */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className={`text-3xl ${isScrolled ? 'text-dark' : 'text-white'} focus:outline-none`}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-full bg-dark bg-opacity-95 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out flex flex-col items-center justify-center`}
      >
        <button
          onClick={toggleMenu}
          className="absolute top-8 right-8 text-white text-4xl focus:outline-none"
          aria-label="Close navigation menu"
        >
          ✕
        </button>
        <ul className="flex flex-col space-y-8 text-center">
          <li>
            <a
              href="#home"
              className="text-white text-3xl font-medium hover:text-primary transition-colors duration-300"
              onClick={handleNavLinkClick}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#menu"
              className="text-white text-3xl font-medium hover:text-primary transition-colors duration-300"
              onClick={handleNavLinkClick}
            >
              Menu
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="text-white text-3xl font-medium hover:text-primary transition-colors duration-300"
              onClick={handleNavLinkClick}
            >
              About Us
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="text-white text-3xl font-medium hover:text-primary transition-colors duration-300"
              onClick={handleNavLinkClick}
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
