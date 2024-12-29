import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import logo from '../assets/logo.png'
// import Img from '../assets/search.png'
// import Navbar from '../components/Navbar';

interface CertificateData {
  certificateNo: string; name: string; motherName: string;fatherName: string;address: string; qualification: string;university: string;college: string;yearOfPassing: string;registrationDate: string;imageUrl: string; logoUrl: string;dob: string;registrationdate: string;registrationNo: string;additionalFileDownloadUrl?: string; // Optional field for the download URL
}

const Search: React.FC = () => {
  const [registrationNo, setRegistrationNo] = useState('');
  const [certificateData, setCertificateData] = useState<CertificateData | null>(null);

  useEffect(() => {
    if (certificateData && certificateData.imageUrl) {
      const img = new Image();
      img.src = certificateData.imageUrl;
      img.onload = () => {
        console.log('Image loaded successfully');
      };
      img.onerror = () => {
        console.error('Error loading image');
      };
    }
  }, [certificateData]);

  const handleSearch = async () => {
    const q = query(collection(db, 'medicalCertificates'), where('registrationNo', '==', registrationNo));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      setCertificateData(querySnapshot.docs[0].data() as CertificateData);
    } else {
      alert('Certificate not found');
      setCertificateData(null);
    }
  };

  const printCertificate = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    if (printWindow) {
      // Writing HTML to the print window
      printWindow.document.write('<!DOCTYPE html>');
      printWindow.document.write('<html><head><title></title>');
      printWindow.document.write('<style>');
      printWindow.document.write('body { font-family: Arial, sans-serif; margin: 0; padding: 0; }');
      printWindow.document.write('@media print {');
      printWindow.document.write('body { width: 100%; height: 100%; margin: 0; padding: 0; }');
      printWindow.document.write('@page {');
      printWindow.document.write('size: A4 landscape;'); // Landscape orientation
      printWindow.document.write('margin: 10mm;'); // Reduced margins
      printWindow.document.write('}');
      printWindow.document.write('.container { width: 100%; margin: 0 auto; height:100%; padding: 0; position: relative; }');
      printWindow.document.write('.certificate { padding: 15px; border: none; border-radius: 10px; position: relative; }');
      printWindow.document.write('.header { position: absolute; top: 50mm; right: 5mm; }');
      printWindow.document.write('.header img { width: 100px; }');
      printWindow.document.write('.content { margin-top: 20px; font-size: 18px; text-align: left; page-break-inside: avoid; }'); // Prevent page breaks
      printWindow.document.write('.content table { width: 100%; border-collapse: collapse; }');
      printWindow.document.write('.content th, .content td { padding: 8px; text-align: left; }'); // Reduced padding
      printWindow.document.write('.content th { background-color: #f4f4f4; }');
      printWindow.document.write('.heading { text-align: center; font-size: 20px; font-weight: bold; margin-top:0px; }');
      printWindow.document.write('.paragraph { text-align: center; font-size: 16px; margin-top: 10px; }');
      printWindow.document.write('.note { text-align: center; font-size: 14px; margin-top: 30px; font-style: italic; color: #555; page-break-inside: avoid; }'); // Prevent page breaks in the note
      printWindow.document.write('.watermark { position: absolute; top: 50%; left: 50%; width: 100%; height: 100%; opacity: 0.2; transform: translate(-50%, -50%); }');
      printWindow.document.write('}');
      printWindow.document.write('</style>');
      printWindow.document.write('<link rel="stylesheet" href="./style.css"> ')
      printWindow.document.write('</head><body>');
      printWindow.document.write('<div class="container">');
      printWindow.document.write('<div class="certificate">');
      printWindow.document.write('<div class="header">');
      printWindow.document.write('<img src="' + (certificateData?.imageUrl || '../assets/logo.png') + '" alt="certificate logo" />');
      printWindow.document.write('</div>');
      printWindow.document.write('<div class="heading">');
      printWindow.document.write('<img src="https://firebasestorage.googleapis.com/v0/b/upmci-e6f5b.appspot.com/o/medicalCertificates%2Flogo.png?alt=media&token=96ef5484-7b83-4b7d-87de-a30644a95aef" alt="Certificate Header Image" />');
      printWindow.document.write('<div>MEDICAL REGISTRATION CERTIFICATE</div>');
      printWindow.document.write('<div class="paragraph">5, SARVAPALLI, MALL AVENUE ROAD, LUCKNOW</div>');
      printWindow.document.write('</div>'); 
      printWindow.document.write('<div class="content">');
      printWindow.document.write('<table>');
      printWindow.document.write('<tr><th></th><th></th></tr>');
      printWindow.document.write('<tr><td>Registration No</td><td>' + certificateData?.registrationNo + '</td></tr>');
      printWindow.document.write('<tr><td>Student\'s Name</td><td>' + certificateData?.name + '</td></tr>');
      printWindow.document.write('<tr><td>Mother\'s Name</td><td>' + certificateData?.motherName + '</td></tr>');
      printWindow.document.write('<tr><td>Father\'s Name</td><td>' + certificateData?.fatherName + '</td></tr>');
      printWindow.document.write('<tr><td>Address</td><td>' + certificateData?.address + '</td></tr>');
      printWindow.document.write('<tr><td>Qualification</td><td>' + certificateData?.qualification + '</td></tr>');
      printWindow.document.write('<tr><td>Name of University</td><td>' + certificateData?.university + '</td></tr>');
      printWindow.document.write('<tr><td>Name of College</td><td>' + certificateData?.college + '</td></tr>');
      printWindow.document.write('<tr><td>Year of Passing</td><td>' + certificateData?.yearOfPassing + '</td></tr>');
      printWindow.document.write('<tr><td>Date of Birth</td><td>' + certificateData?.dob + '</td></tr>');
      printWindow.document.write('<tr><td>Registration Date & Place</td><td>' + certificateData?.registrationdate + '</td></tr>');
      printWindow.document.write('</table>');
      printWindow.document.write('</div>');
      printWindow.document.write('<div class="note">Note: Above data can only be used for informational purposes.</div>');
      printWindow.document.write('<img src="../assets/logo.png" class="watermark" alt="" />');
      printWindow.document.write('</div>');
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.onafterprint = () => {
        printWindow.close(); // Close the print window
        window.location.href = 'https://lcbcollege.co.in/'; // Redirect to the home page
      };
  
      // Add a beforeunload event to handle user closing the tab manually
      printWindow.onbeforeunload = () => {
        window.location.href = 'https://lcbcollege.co.in/'; // Redirect to the home page
      };
    }
  };
  

 

  return (
    <>
    <div className="w-full mx-auto p-4 bg-white shadow-md rounded">
      {/* <h2 className="text-2xl font-bold mb-4 text-center">Search Registration</h2> */}
      <div className="flex justify-center items-center">
  <img
    src={logo}
    alt="Certificate Holder"
    className=""
  />
</div>
      <button
  onClick={() => (window.location.href = 'https://lcbcollege.co.in/')}
  className="mt-4 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition duration-200"
>
  Back to Home
</button>

      {/* <div className="mb-4">
      <label htmlFor="registrationNo" className="block text-sm font-medium text-gray-700 text-center">
        Registration No
      </label>
      <input
        type="text"
        id="registrationNo"
        name="registrationNo"
        value={registrationNo}
        onChange={(e) => setRegistrationNo(e.target.value)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-center"
      />
    </div> */}
      <div className="mb-6">
        <label
          htmlFor="registrationNo"
          className="block text-lg font-semibold text-gray-800 text-center"
        >
          Search Registration
        </label>
        <div className="mt-2 relative rounded-md shadow-sm">
          <input
            type="text"
            id="registrationNo"
            name="registrationNo"
            value={registrationNo}
            onChange={(e) => setRegistrationNo(e.target.value)}
            className="block w-full pl-4 pr-10 py-3 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-base bg-white hover:bg-gray-100 transition ease-in-out duration-200"
            placeholder="Enter your registration number" />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      </div>


      <button
        onClick={handleSearch}
        className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-700"
      >
        Search
      </button>

      {certificateData && (
        <>

          <div id="certificateSection" className="mt-10 p-4 bg-gray-100 rounded shadow-md w-full h-full relative text-left">
            <div className="text-center">
              <h3 className="text-4xl font-bold mb-4 text-red-600">
                <img className='pl-[24%]' src={logo} alt="Logo" />
              </h3>
              <h4 className="text-2xl font-semibold mb-4">MEDICAL REGISTRATION CERTIFICATE</h4>
              <p className="mb-4 text-lg">5, SARVAPALLI, MALL AVENUE ROAD, LUCKNOW</p>
            </div>

            <div className="space-y-6 text-lg">
            <div className="relative">
  <img
    src={certificateData?.imageUrl || logo}
    alt="Certificate Holder"
    className="absolute top-0 right-0 w-32 h-32 "
    style={{ right: '5%' }}
  />
</div>
              <table className="w-full text-left">
                <tbody>
                  <tr>
                    <td className="font-semibold pr-4 pl-20">Registration No:</td>
                    <td>{certificateData.registrationNo}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold pr-4 pl-20">Student's Name:</td>
                    <td>{certificateData.name}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold pr-4 pl-20">Mother's Name:</td>
                    <td>{certificateData.motherName}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold pr-4 pl-20">Father's Name:</td>
                    <td>{certificateData.fatherName}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold pr-4 pl-20">Address:</td>
                    <td>{certificateData.address}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold pr-4 pl-20">Qualification:</td>
                    <td>{certificateData.qualification}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold pr-4 pl-20">Name of University:</td>
                    <td>{certificateData.university}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold pr-4 pl-20">Name of College:</td>
                    <td>{certificateData.college}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold pr-4 pl-20">Year of Passing:</td>
                    <td>{certificateData.yearOfPassing}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold pr-4 pl-20">Date of Birth:</td>
                    <td>{certificateData.dob}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold pr-4 pl-20">Registration Date & Place:</td>
                    <td>{certificateData.registrationdate}</td>
                  </tr>
                </tbody>
              </table>

              <p className='text-center pt-5 text-slate-600 font-extralight'>
                <span className='text-slate-700 font-bold'>Note: </span>Above data can only be used for informational purposes.
              </p>
            </div>
          </div>

          <div className="mt-6 flex gap-4 justify-center">
            <button
              onClick={printCertificate}
              className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600"
            >
              Print Certificate
            </button>
            {/* <button
              onClick={downloadFile}
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
            >
              Download Certificate
            </button> */}
          </div>
        </>
      )}
    </div></>
  );
};

export default Search;
