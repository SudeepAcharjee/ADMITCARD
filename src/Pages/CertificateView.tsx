
import { useLocation, useNavigate } from 'react-router-dom';

const CertificateView = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { certificateData } = location.state || {};

  if (!certificateData) {
    // Redirect to the search page if no data is passed
    navigate('/');
    return null;
  }

  return (
    <div className="w-full mx-auto p-4 bg-white shadow-md rounded">
      <div id="certificateSection" className="mt-6 p-4 bg-gray-100 rounded shadow-md w-full h-full">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-2">MEDICAL REGISTRATION CERTIFICATE</h3>
          <h4 className="text-xl font-semibold">OFFICE OF THE MEDICAL COUNCIL, UTTAR PRADESH</h4>
          <p className="mb-4">5, SARVAPALLI, MALL AVENUE ROAD, LUCKNOW</p>
          <img src={certificateData.imageUrl} alt="Certificate Seal" className="w-20 h-20 mx-auto mb-4" crossOrigin="anonymous" />
        </div>

        <div className="text-right mb-4">Dated: {certificateData.registrationDate}</div>

        <div className="space-y-4">
          <div className="mb-2">
            <span className="font-semibold">Certificate No: </span>{certificateData.certificateNo}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Name: </span>{certificateData.name}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Mother's Name: </span>{certificateData.motherName}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Father's Name: </span>{certificateData.fatherName}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Address: </span>{certificateData.address}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Qualification: </span>{certificateData.qualification}
          </div>
          <div className="mb-2">
            <span className="font-semibold">University: </span>{certificateData.university}
          </div>
          <div className="mb-2">
            <span className="font-semibold">College: </span>{certificateData.college}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Year of Passing: </span>{certificateData.yearOfPassing}
          </div>
        </div>
        
        {/* Example of an additional file link */}
        <div className="mt-4">
          <a href="/path/to/additional/file.pdf" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">
            View Additional File
          </a>
        </div>
      </div>
    </div>
  );
};

export default CertificateView;
