import React from 'react';

/**
 * Dummy data for customer testimonials.
 * In a real application, this would come from an API.
 */
const testimonials = [
  {
    id: 1,
    name: 'Sarah M.',
    quote: 'Absolutely delightful! Every dish was a masterpiece. The ambiance and service were impeccable. A must-try for any food lover!',
    rating: 5,
  },
  {
    id: 2,
    name: 'John P.',
    quote: 'The best ramen I\'ve ever had outside of Japan. Rich flavors, perfectly cooked ingredients. I\'m definitely coming back!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emily R.',
    quote: 'I was so impressed with the vegetarian options. Fresh, creative, and incredibly tasty. Highly recommend the burrito bowl!',
    rating: 4,
  },
  {
    id: 4,
    name: 'Michael B.',
    quote: 'Great place for a family dinner. The pizza was a hit with the kids, and I thoroughly enjoyed the grilled salmon. Friendly staff!',
    rating: 4,
  },
];

/**
 * Testimonials component displays customer reviews in a grid layout.
 * Each testimonial includes a quote, customer name, and a star rating.
 */
const Testimonials = () => {
  /**
   * Helper function to render star ratings.
   * @param {number} rating - The star rating out of 5.
   * @returns {Array<JSX.Element>} An array of star icons.
   */
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`text-xl ${i <= rating ? 'text-yellow-400' : 'text-grayish'}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <section className="py-16 md:py-24 bg-gray-100">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold font-serif text-dark mb-12 leading-tight">
          What Our Customers Say
        </h2>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-16">
          Hear from those who have experienced the Foodie Delight difference. Their smiles are our greatest reward.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-8 rounded-lg shadow-xl flex flex-col items-center text-center transform hover:scale-105 transition-all duration-300"
            >
              <div className="flex mb-4">{renderStars(testimonial.rating)}</div>
              <p className="text-gray-700 italic mb-6 text-lg line-clamp-4">"{testimonial.quote}"</p>
              <p className="text-dark font-semibold text-xl">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
