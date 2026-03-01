import React from 'react';

/**
 * About component displays information about the food website or restaurant.
 * It includes a title, description, and a visual element.
 */
const About = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Image/Visual Section */}
          <div className="md:w-1/2 relative">
            <div className="w-full h-72 md:h-96 bg-grayish rounded-lg shadow-xl overflow-hidden flex items-center justify-center p-4">
              {/* Placeholder for an image - replace with actual image later */}
              <p className="text-dark text-xl font-semibold text-center">Delicious Food Journey</p>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-20"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary rounded-full opacity-70 blur-xl hidden md:block"></div>
          </div>

          {/* Text Content Section */}
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-dark mb-6 font-serif leading-tight">
              Taste the Tradition, Experience the Innovation
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              At Foodie Delight, we believe in the art of culinary creation. Our journey began with a passion for bringing authentic flavors and fresh ingredients to your table. We blend traditional recipes with modern techniques to craft dishes that are both comforting and exciting.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              From our carefully selected ingredients to our expertly trained chefs, every aspect of your dining experience is curated with love and dedication. Join us and embark on a memorable gastronomic adventure that tantalizes your taste buds and nourishes your soul.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
