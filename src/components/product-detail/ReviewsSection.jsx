import React from 'react';
import male from '../../assets/male.png';

const ReviewsSection = () => {
  return (
    <div className="mt-10 p-5 bg-gray-50 rounded-lg">
      <h6 className="font-bold text-xl mb-6 text-gray-700 border-b-2 border-yellow-400 inline-block pb-1">
        Reviews
      </h6>
      <div className="space-y-4 mb-6">
        {/* Review 1 */}
        <div className="flex items-start bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
          <img
            src={male}
            alt="User Profile"
            className="w-12 h-12 rounded-full mr-4 border-2 border-gray-300"
          />
          <div>
            <h5 className="text-lg font-bold text-yellow-400 mb-1">Hasan Mansour</h5>
            <p className="text-gray-700">
              Amazing game! The story and open-world experience are unmatched. Highly recommended.
            </p>
            <div className="flex text-yellow-500 mt-2">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star-half-alt"></i>
            </div>
          </div>
        </div>
        {/* Review 2 */}
        <div className="flex items-start bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
          <img
            src={male}
            alt="User Profile"
            className="w-12 h-12 rounded-full mr-4 border-2 border-gray-300"
          />
          <div>
            <h5 className="text-lg font-bold text-yellow-400 mb-1">Visitor</h5>
            <p className="text-gray-700">
              The best open-world game I’ve ever played. The graphics are stunning, and the missions are very engaging.
            </p>
          </div>
        </div>
      </div>
      <h6 className="font-bold text-xl mb-4 text-gray-700">Do you have a Question?</h6>
      <form>
        <div className="mb-3">
          <textarea
            rows="3"
            placeholder="Write your comment here..."
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          ></textarea>
        </div>
        <button type="submit" className="bg-yellow-400 text-black py-2 px-4 rounded hover:bg-yellow-500">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReviewsSection;
