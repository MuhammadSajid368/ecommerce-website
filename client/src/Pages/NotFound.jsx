import React from 'react';

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <img src="illustration.svg" alt="404 Illustration" className="w-48 h-48 animation" />
      <h1 className="text-4xl font-bold mt-8 text-primary">Oops! Page Not Found</h1>
      <p className="text-lg text-primary mt-4">The page you are looking for might have been removed or its name changed.</p>
      <a href="/" className="mt-8 px-6 py-3 bg-accent text-white rounded-lg shadow-md transition duration-300 hover:bg-yellow-500">Go Back Home</a>
    </div>
  );
}

export default NotFound;
