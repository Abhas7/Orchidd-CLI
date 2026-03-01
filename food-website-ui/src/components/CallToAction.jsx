import React, { useState } from 'react';

/**
 * CallToAction component for newsletter subscription or a primary action.
 * Includes basic client-side validation for the email input.
 */
const CallToAction = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  /**
   * Handles the subscription form submission.
   * Performs basic email validation.
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    if (!email) {
      setMessage('Email cannot be empty.');
      setIsError(true);
      return;
    }

    // Simple email regex for client-side validation
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      setMessage('Please enter a valid email address.');
      setIsError(true);
      return;
    }

    // Simulate API call for subscription
    console.log('Subscribing with email:', email);
    setMessage('Thank you for subscribing!');
    setIsError(false);
    setEmail(''); // Clear input after successful submission
  };

  return (
    <section className="py-16 md:py-24 bg-primary text-white">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6 leading-tight">
          Don't Miss Out on Our Latest Delights!
        </h2>
        <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto">
          Subscribe to our newsletter and get exclusive offers, new menu updates, and special event invitations delivered straight to your inbox.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full md:w-3/4 p-4 rounded-lg border-2 border-white focus:outline-none focus:ring-2 focus:ring-secondary text-dark text-lg transition-all duration-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email for newsletter subscription"
          />
          <button
            type="submit"
            className="w-full md:w-1/4 bg-secondary hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 text-lg"
          >
            Subscribe
          </button>
        </form>

        {message && (
          <p className={`mt-4 text-lg font-medium ${isError ? 'text-yellow-200' : 'text-white'}`}>
            {message}
          </p>
        )}
      </div>
    </section>
  );
};

export default CallToAction;
