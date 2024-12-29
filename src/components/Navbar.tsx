
const Navbar = () => {
  return (
    <header className="bg-orange-500 text-white">
      <div className="container mx-auto px-4 flex justify-between items-center py-2">
        {/* Logo and Title */}
        <div className="flex items-center">
          <img
            src="/logo.png" // Replace with your logo path
            alt="U.P. Medical Council"
            className="h-12 w-12 mr-4"
          />
          <h1 className="text-2xl font-bold">
            UTTAR PRADESH MEDICAL COUNCIL
          </h1>
        </div>

        {/* Contact Info */}
        <div className="hidden md:flex flex-col text-right text-sm">
          <p>5, Sarvpalli Mall Avenue Road, Lucknow - 226001 (U.P.) India</p>
          <p>
            <span className="font-semibold">Call:</span> 9151024461
          </p>
          <p>
            <span className="font-semibold">Email-Id:</span>{" "}
            upmedicalcouncil@upmci.org
          </p>
        </div>
      </div>

      {/* Navbar Links */}
      <nav className="bg-orange-600">
        <div className="container mx-auto px-4">
          <ul className="flex justify-between items-center text-sm">
            <li className="py-2 px-4 hover:bg-orange-700">
              <a href="#home">Home</a>
            </li>
            <li className="py-2 px-4 hover:bg-orange-700">
              <a href="#introduction">Introduction</a>
            </li>
            <li className="py-2 px-4 hover:bg-orange-700">
              <a href="#services">Services</a>
            </li>
            <li className="py-2 px-4 hover:bg-orange-700">
              <a href="#registration">Registration</a>
            </li>
            <li className="py-2 px-4 hover:bg-orange-700">
              <a href="#download">Download</a>
            </li>
            <li className="py-2 px-4 hover:bg-orange-700">
              <a href="#cme">CME</a>
            </li>
            <li className="py-2 px-4 hover:bg-orange-700">
              <a href="#dashboard">DASHBOARD (MBBS-UP)</a>
            </li>
            <li className="py-2 px-4 hover:bg-orange-700">
              <a href="#faq">FAQ</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
