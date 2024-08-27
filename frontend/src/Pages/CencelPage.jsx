import React from 'react';

const CancelPage = () => {
  return (
    <div className="bg-red-50 flex items-center justify-center min-h-screen overflow-hidden">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-lg mx-auto">
        <div className="flex items-center justify-center mb-6">
          <svg
            className="w-16 h-16 text-red-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Canceled</h1>
        <p className="text-gray-600 mb-6">
          Your payment has been canceled. If this was a mistake, please try again.
        </p>
        <a
          href="/"
          className="inline-block bg-red-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-red-600 transition duration-300"
        >
          Go to Homepage
        </a>
    
      </div>
    </div>
  );
};

export default CancelPage;
