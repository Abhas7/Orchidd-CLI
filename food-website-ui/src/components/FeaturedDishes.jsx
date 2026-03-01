import React from 'react';

/**
 * Dummy data for featured dishes.
 * In a real application, this would come from an API.
 */
const dishes = [
  {
    id: 1,
    name: 'Spicy Chicken Ramen',
    description: 'Rich broth, tender chicken, soft-boiled egg, and fresh scallions.',
    price: '18.99',
    imageBgColor: 'bg-red-200', // Placeholder background color
  },
  {
    id: 2,
    name: 'Classic Margherita Pizza',
    description: 'San Marzano tomatoes, fresh mozzarella, basil, and olive oil.',
    price: '15.50',
    imageBgColor: 'bg-green-200',
  },
  {
    id: 3,
    name: 'Grilled Salmon with Asparagus',
    description: 'Perfectly grilled salmon fillet served with fresh, crisp asparagus.',
    price: '24.75',
    imageBgColor: 'bg-blue-200',
  },
  {
    id: 4,
    name: 'Vegetarian Burrito Bowl',
    description: 'Quinoa, black beans, corn salsa, avocado, and chipotle dressing.',
    price: '14.25',
    imageBgColor: 'bg-yellow-200',
  },
  {
    id: 5,
    name: 'Decadent Chocolate Lava Cake',
    description: 'Warm chocolate cake with a molten center, served with vanilla ice cream.',
    price: '9.99',
    imageBgColor: 'bg-purple-200',
  },
  {
    id: 6,
    name: 'Fresh Garden Salad',
    description: 'Mixed greens, cherry tomatoes, cucumber, bell peppers, and vinaigrette.',
    price: '11.00',
    imageBgColor: 'bg-pink-200',
  },
];

/**
 * FeaturedDishes component displays a selection of popular menu items.
 * Each dish is presented as a card with an image placeholder, name, description, and price.
 */
const FeaturedDishes = () => {
  return (
    <section id="menu" className="py-16 md:py-24 bg-light">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold font-serif text-dark mb-12 leading-tight">
          Our Featured Delicacies
        </h2>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-16">
          Explore a world of flavors with our chef-recommended dishes. Each creation is crafted with the finest ingredients to bring you an unforgettable culinary experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {dishes.map((dish) => (
            <div
              key={dish.id}
              className="bg-white rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 flex flex-col"
            >
              {/* Image Placeholder */}
              <div className={`w-full h-48 ${dish.imageBgColor} flex items-center justify-center`}>
                <span className="text-dark text-2xl font-semibold opacity-70">{dish.name}</span>
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-dark mb-3">{dish.name}</h3>
                  <p className="text-gray-600 mb-4 text-base">{dish.description}</p>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-primary text-3xl font-bold">${dish.price}</span>
                  <button className="bg-secondary hover:bg-green-700 text-white font-medium py-2 px-5 rounded-full transition-colors duration-300 transform hover:scale-105">
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <button className="bg-primary hover:bg-red-700 text-white font-semibold py-4 px-10 rounded-full shadow-lg text-lg transform hover:scale-105 transition-all duration-300">
            View Full Menu
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDishes;
