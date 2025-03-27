import React from 'react';

const RatingModal = ({ isOpen, onClose, selectedRating, setSelectedRating, feedback, setFeedback, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden animate-pop-in">
        <div className="bg-green-500 p-4 flex justify-between items-center">
          <h3 className="text-white text-lg font-bold">Rate Your Experience</h3>
          <button onClick={onClose} className="text-white hover:text-yellow-200">✕</button>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                onClick={() => setSelectedRating(star)}
                className={`text-4xl ${star <= selectedRating ? 'text-yellow-400' : 'text-gray-300'} hover:scale-110`}
              >
                ★
              </button>
            ))}
          </div>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Tell us more about your experience..."
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 resize-none"
            rows="4"
          />
          <div className="flex justify-end space-x-3">
            <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:text-gray-800">Cancel</button>
            <button onClick={onSubmit} className="bg-green-500 hover:bg-green-700 px-6 py-2 text-white rounded-lg font-medium">
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
