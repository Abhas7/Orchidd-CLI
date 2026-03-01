document.addEventListener('DOMContentLoaded', () => {
    // === Hero Slider ===
    const slides = document.querySelectorAll('.hero-slider .slide');
    const prevBtn = document.querySelector('.hero .slider-nav.prev');
    const nextBtn = document.querySelector('.hero .slider-nav.next');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Auto slide change
    let slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds

    // Manual navigation
    nextBtn.addEventListener('click', () => {
        clearInterval(slideInterval); // Stop auto-slide on manual interaction
        nextSlide();
        slideInterval = setInterval(nextSlide, 5000); // Restart auto-slide
    });

    prevBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        prevSlide();
        slideInterval = setInterval(nextSlide, 5000);
    });

    // Initialize first slide
    if (slides.length > 0) {
        showSlide(currentSlide);
    }

    // === Mobile Menu Toggle ===
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });

        // Close menu when a link is clicked (for single-page navigation)
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                }
            });
        });
    }

    // Add 'active' class to nav for mobile on small screens
    function handleMobileNav() {
        if (window.innerWidth <= 992) {
            nav.classList.add('mobile-nav');
        } else {
            nav.classList.remove('mobile-nav', 'active'); // Remove active if resized to desktop
        }
    }
    handleMobileNav(); // Initial check
    window.addEventListener('resize', handleMobileNav);

    // === Scroll to Top Button ===
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) { // Show button after scrolling 300px
                scrollToTopBtn.style.display = 'block';
            } else {
                scrollToTopBtn.style.display = 'none';
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // === Placeholder for Add to Cart functionality ===
    const addToCartButtons = document.querySelectorAll('.product-card .btn-secondary');
    const cartCountSpan = document.querySelector('.cart-count');
    let cartItemCount = 0;

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default button action
            cartItemCount++;
            if (cartCountSpan) {
                cartCountSpan.textContent = cartItemCount;
            }
            alert('Item added to cart! Total items: ' + cartItemCount); // User feedback
        });
    });

    // === Newsletter Form Submission (Client-side validation example) ===
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value.trim();

            if (!email) {
                alert('Please enter your email address.');
                return;
            }

            // Basic email regex validation
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Simulate form submission
            console.log('Newsletter subscription submitted for:', email);
            alert(`Thank you for subscribing, ${email}!`);
            emailInput.value = ''; // Clear input
        });
    }
});
