import React from 'react';

const StepsSection: React.FC = () => {
  return (
    <section className="bg-blue-50 text-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center mb-8">
          <div className="text-center md:text-left" data-aos="fade-up">
            <h2 className="text-5xl text-blue-600 text-center font-bold mb-2">Follow These Steps and Start Learning</h2>
            <p className="text-gray-700 text-center">Get the most out of your online courses with these simple yet effective strategies.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" data-aos="fade-up">
          <div className="flex flex-col items-center text-center p-4 bg-purple-50 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-purple-100">
            <h3 className="text-4xl font-bold text-blue-900 mb-2">01</h3>
            <h4 className="text-lg font-bold mb-2 text-slate-700">Explore Courses</h4>
            <p className="text-gray-600">Review your department’s course catalog and prioritize those that align with your career goals.</p>
          </div>
          <div className="flex flex-col items-center text-center p-4 bg-yellow-50 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-yellow-100">
            <h3 className="text-4xl font-bold text-blue-900 mb-2">02</h3>
            <h4 className="text-lg font-bold mb-2 text-slate-700">Plan Study Time</h4>
            <p className="text-gray-600">Schedule specific times for each course module and stick to your plan to stay on track.</p>
          </div>
          <div className="flex flex-col items-center text-center p-4 bg-blue-50 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-blue-100">
            <h3 className="text-4xl font-bold text-blue-900 mb-2">03</h3>
            <h4 className="text-lg font-bold mb-2 text-slate-700">Engage with Content</h4>
            <p className="text-gray-600">Actively participate in discussions and live sessions to deepen your understanding.</p>
          </div>
          <div className="flex flex-col items-center text-center p-4 bg-purple-50 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-purple-100">
            <h3 className="text-4xl font-bold text-blue-900 mb-2">04</h3>
            <h4 className="text-lg font-bold mb-2 text-slate-700">Use Self-Assessments</h4>
            <p className="text-gray-600">Regularly take quizzes and practice exams to monitor your progress and readiness.</p>
          </div>
          <div className="flex flex-col items-center text-center p-4 bg-yellow-50 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-yellow-100">
            <h3 className="text-4xl font-bold text-blue-900 mb-2">05</h3>
            <h4 className="text-lg font-bold mb-2 text-slate-700">Ask for Help</h4>
            <p className="text-gray-600">Reach out to instructors for personalized guidance whenever you need clarification.</p>
          </div>
          <div className="flex flex-col items-center text-center p-4 bg-blue-50 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-blue-100">
            <h3 className="text-4xl font-bold text-blue-900 mb-2">06</h3>
            <h4 className="text-lg font-bold mb-2 text-slate-700">Review Regularly</h4>
            <p className="text-gray-600">Set aside time for consistent review to reinforce your learning and stay prepared.</p>
          </div>
          <div className="flex flex-col items-center text-center p-4 bg-purple-50 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-purple-100">
            <h3 className="text-4xl font-bold text-blue-900 mb-2">07</h3>
            <h4 className="text-lg font-bold mb-2 text-slate-700">Utilize Resources</h4>
            <p className="text-gray-600">Leverage all available resources such as eBooks, videos, and tutorials to enhance your learning experience.</p>
          </div>
          <div className="flex flex-col items-center text-center p-4 bg-yellow-50 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-yellow-100">
            <h3 className="text-4xl font-bold text-blue-900 mb-2">08</h3>
            <h4 className="text-lg font-bold mb-2 text-slate-700">Stay Motivated</h4>
            <p className="text-gray-600">Set personal goals and reward yourself for achieving them to keep your motivation high.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
