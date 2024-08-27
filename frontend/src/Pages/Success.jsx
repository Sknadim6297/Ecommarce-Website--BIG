import React from 'react';

const Success= () => {
  return (
    <div className="bg-green-50 flex items-center justify-center min-h-screen p-4">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg text-center max-w-lg w-full">
        <div className="flex items-center justify-center mb-6">
          <svg
            className="w-12 h-12 md:w-16 md:h-16 text-green-500"
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
              d="M9 12l2 2L15 9m5 3a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
        <p className="text-gray-600 mb-6 text-sm md:text-base">
          Thank you for your purchase. Your payment has been successfully processed.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <a
            href="/"
            className="inline-block bg-green-500 text-white font-semibold px-4 py-2 rounded-full hover:bg-green-600 transition duration-300 text-sm md:text-base"
          >
            Go to Homepage
          </a>
          <a
            href="/orders"
            className="inline-block bg-blue-500 text-white font-semibold px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300 text-sm md:text-base"
          >
            See Order
          </a>
        </div>
      </div>
    </div>
  );
};

export default Success;
