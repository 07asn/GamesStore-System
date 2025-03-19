import React, { useState } from "react";

// Define the review groups (each group shows two reviews)
const testimonialGroups = [
  [
    {
      id: 1,
      name: "Hasan Mansour",
      avatar: "img/male.png",
      badge: "RDR2",
      rating: 5,
      review:
        `"The game library here is unmatched! Found rare titles I couldn't get elsewhere.
Seamless purchasing and instant downloads make it my go-to store for gaming!"`,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      avatar: "img/female.png",
      badge: "Developer Tools",
      rating: 5,
      review:
        `"Your programming tools are top-notch! I especially love the developer programs you offer—they've been a huge help in boosting my productivity."`,
    },
  ],
  [
    {
      id: 3,
      name: "Emily Davis",
      avatar: "img/female.png",
      badge: "Casual Games",
      rating: 5,
      review:
        `"I never thought I’d find such a wide variety of casual games that fit my style perfectly.
The staff recommendations were spot-on. Amazing experience!"`,
    },
    {
      id: 4,
      name: "James Taylor",
      avatar: "img/male.png",
      badge: "Racing Games",
      rating: 5,
      review:
        `"An incredible store for racing games! The staff recommendations were spot-on,
and I found the latest titles at the best prices. Awesome experience!"`,
    },
  ],
];

const Reviews = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = testimonialGroups.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <section className="testimonials relative overflow-hidden">
      <div className="bg-light">
        <div className="container py-5 mx-auto px-4">
          <h2 className="text-center mb-5 quick-search-heading display-5 fw-bold">
            What Our Gamers Say 🎮
          </h2>
          <div className="flex justify-center">
            <div className="w-full max-w-6xl relative">
              {/* Indicators */}
              <div className="flex justify-center space-x-2 mb-4">
                {testimonialGroups.map((_, idx) => (
                  <button
                    key={idx}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      idx === currentSlide
                        ? "bg-[#FFDF00] scale-125"
                        : "bg-[rgba(255,223,0,0.4)]"
                    }`}
                    onClick={() => setCurrentSlide(idx)}
                  ></button>
                ))}
              </div>

              {/* Carousel Content */}
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {testimonialGroups.map((group, idx) => (
                    <div key={idx} className="min-w-full">
                      <div className="flex flex-wrap justify-center gap-4">
                        {group.map((review) => (
                          <ReviewCard key={review.id} review={review} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-[rgba(255,223,0,0.9)] rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#FFDF00] hover:scale-110"
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                  />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-[rgba(255,223,0,0.9)] rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#FFDF00] hover:scale-110"
              >
                <span className="sr-only">Next</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ReviewCard = ({ review }) => {
  const { name, avatar, badge, rating, review: reviewText } = review;
  return (
    <div className="w-full lg:w-1/2 md:w-10/12 px-2">
      <div className="testimonial-card p-4 p-lg-5 relative">
        <div className="quote-decoration"></div>
        <i className="bi bi-quote quote-icon"></i>
        <div className="flex items-center mb-4">
          <img src={avatar} alt={name} className="avatar flex-shrink-0" />
          <div className="ml-4">
            <h5 className="mb-1 fw-bold">{name}</h5>
            <div className="flex items-center">
              <span className="badge bg-dark mr-2">{badge}</span>
              <div className="rating">
                {Array(rating)
                  .fill(0)
                  .map((_, i) => (
                    <i key={i} className="bi bi-star-fill text-warning"></i>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <p className="mb-0 fs-5">{reviewText}</p>
      </div>
    </div>
  );
};

export default Reviews;
