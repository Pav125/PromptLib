import React from 'react';
import { Link } from 'react-router-dom';
import notFound from '../assets/notFound.png'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-900">
      <div className="text-center mb-8">
        <img src={notFound} />
        {/* <h1 className="text-9xl font-extrabold text-gray-800">404</h1> */}
        <p className="text-2xl font-semibold text-gray-600">Page Not Found</p>
        <p className="text-lg text-gray-500 mt-2">Oops! You're searching out of this world.</p>
      </div>
      <Link
        to="/"
        className="px-6 py-3 bg-orange-500 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-300"
      >
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
