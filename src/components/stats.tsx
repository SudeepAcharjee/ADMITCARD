import React from 'react';


const StatisticsSection: React.FC = () => {
  return (
    <section className="bg-white py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">A Platform Trusted by Students Worldwide</h2>
        <p className="text-gray-600">Don't Just Take Our Word for It. Delve into the Numbers and Witness the Excellence for Yourself!</p>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="flex flex-col items-center p-6 bg-red-100 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">24,000+</h3>
            <p className="text-gray-700">Mock Tests</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-blue-100 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">14,000+</h3>
            <p className="text-gray-700">Video Lectures</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-purple-100 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">80,000+</h3>
            <p className="text-gray-700">Practice Papers</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-green-100 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">500+</h3>
            <p className="text-gray-700">Courses Offered</p>
          </div>



        </div>
        <div className="text-center mt-8">
      <a href='./form'>
                          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-purple-700">Get Started</button>
                      </a>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
