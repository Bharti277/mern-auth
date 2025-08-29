import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Home = () => {
  const { userData } = useContext(AppContext);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              Welcome{" "}
              <span className="text-blue-600">
                {userData ? userData.name : "Developer"}
              </span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
              A secure and reliable authentication system built with MERN stack.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link
                to="/"
                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="text-blue-600 text-2xl mb-4">🔒</div>
              <h3 className="text-lg font-medium text-gray-900">Secure</h3>
              <p className="mt-2 text-gray-500">
                Built with industry-standard security practices to keep your
                data safe.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="text-blue-600 text-2xl mb-4">⚡</div>
              <h3 className="text-lg font-medium text-gray-900">Fast</h3>
              <p className="mt-2 text-gray-500">
                Optimized performance for quick loading and smooth user
                experience.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="text-blue-600 text-2xl mb-4">📱</div>
              <h3 className="text-lg font-medium text-gray-900">Responsive</h3>
              <p className="mt-2 text-gray-500">
                Works seamlessly across all devices and screen sizes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © 2025 AuthApp. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
