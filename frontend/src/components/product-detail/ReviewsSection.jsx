import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReviewsSection = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    user_id: null,
    rating: 0,
    review: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/reviews/${productId}`, {
          withCredentials: true,  // Make sure the token is sent with the request
        });
        setReviews(response.data);  // Set reviews from response
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const updatedReview = {
      ...newReview,
      product_id: productId,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/reviews/add', updatedReview, {
        withCredentials: true, 
      });

      if (response.status === 201) {
        setReviews([...reviews, response.data.review]);

        setNewReview({
          user_id: null,
          rating: 0,
          review: '',
        });
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const renderStars = (rating) => {
    if (rating === null) return null;
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<i key={i} className="fas fa-star text-yellow-400"></i>); // Full star
      } else if (i < rating + 0.5) {
        stars.push(<i key={i} className="fas fa-star-half-alt text-yellow-400"></i>); // Half star
      } else {
        stars.push(<i key={i} className="far fa-star text-gray-300"></i>); // Empty star
      }
    }
    return stars;
  };
  
  const renderSelectableStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          type="button"
          onClick={() => handleRatingClick(i)}
          className="focus:outline-none"
        >
          <i 
            className={`${i <= newReview.rating ? 'fas fa-star text-yellow-400' : 'far fa-star text-gray-300'} text-xl`}
            aria-label={`${i} star${i > 1 ? 's' : ''}`}
          ></i>
        </button>
      );
    }
    return stars;
  };

  if (loading) {
    return <div className="mt-10 p-5 bg-gray-50 rounded-lg">Loading reviews...</div>;
  }

  return (
    <div className="mt-10 p-5 bg-gray-50 rounded-lg">
      <h2 className="font-bold text-xl mb-6 text-gray-700 border-b-2 border-yellow-400 inline-block pb-1">
        Reviews
      </h2>

      <div className="flex flex-col md:flex-row md:space-x-6">
        {/* Reviews List (Left Side) */}
        <div className="md:w-2/3 space-y-4 mb-6">
          {reviews.length > 0 ? (
            <div className="max-h-96 overflow-y-auto pr-2">
              {reviews.map((review) => (
                <div key={review.review_id} className="flex items-start bg-white border border-gray-200 p-4 rounded-lg shadow-sm mb-4">
                  <div className="w-full">
                    <h5 className="text-lg font-bold text-yellow-400 mb-1">{review.user ? review.user.name : 'Visitor'}</h5>
                    <p className="text-gray-700">{review.review}</p>
                    {review.rating !== null && (
                      <div className="flex text-yellow-500 mt-2">
                        {renderStars(review.rating)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg text-center border border-gray-200">
              <p className="text-gray-600">No reviews yet.</p>
            </div>
          )}
        </div>

        {/* Add Review Form (Right Side) */}
        <div className="md:w-1/3 bg-white p-5 rounded-lg border border-gray-200 shadow-sm h-fit">
          <h3 className="font-bold text-lg mb-4 text-gray-700">Have a Question?</h3>
          <form onSubmit={handleReviewSubmit}>
            <div className="mb-4">

              <textarea
                rows="4"
                name="review"
                value={newReview.review}
                onChange={handleReviewChange}
                placeholder="Write your Question here..."
                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-400 text-black py-2 px-4 rounded hover:bg-yellow-500 transition-colors"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;