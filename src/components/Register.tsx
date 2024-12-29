import React from 'react';
import img from '../assets/2-removebg-preview.png';

const RegisterEnrollSection: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center md:justify-between bg-gradient-to-r from-yellow-100 to-white p-6 md:p-12">
      <div className="flex items-center justify-center mb-6 md:mb-0">
        <img
          src={img}
          alt="Student"
          className="w-[100%] h-[50%] pb-28"
        />
      </div>
      <div className="text-center md:text-center md:pr-12">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-700 mb-4">
          Register & Enroll Now,<br className="hidden md:block" /> and Get 15% Discount
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Take advantage of our limited-time offer and start your journey with us. 
          Don’t miss out on this opportunity.
        </p>
        <a href="/form" className="bg-purple-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-purple-700 transition duration-300">
          Register Here
        </a>
      </div>
    </div>
  );
};

export default RegisterEnrollSection;
