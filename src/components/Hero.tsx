import heroImage from '../assets/hero-removebg-preview.png';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-yellow-50 to-white py-12 sm:py-20 px-6 sm:px-8 md:py-24 md:px-10 overflow-hidden animate-gradientX">
      <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-blue-800 mb-6 sm:mb-8" >
          Explore the source of Online Education
        </h2>
        <div className="flex flex-col md:flex-row items-center w-full" >
          <div className="md:w-1/2 lg:w-2/5 text-center md:text-left mb-10 md:mb-0">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              Build your <span className="text-blue-600">Dream</span> <span role="img" aria-label="graduation cap">🎓</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8">
              Get Our online Degree from the experts. With 100% Satisfaction Guarantee from our experts.
            </p>
            <button className="bg-blue-600 text-white py-2 px-4 sm:py-3 sm:px-6 rounded-full text-base sm:text-lg font-medium">
              Join Us Today
            </button>
          </div>
          <div className="md:w-1/2 lg:w-3/5 flex justify-center md:justify-end" >
            <img 
              src={heroImage} 
              alt="Student" 
              className="w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover rounded-full"
             
            />
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full sparkle-overlay" ></div>
      </div>
    </section>
  );
}

export default Hero;
