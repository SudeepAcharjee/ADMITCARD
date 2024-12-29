import React, { useState, useEffect, useRef } from 'react';
import { storage, db } from '../firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { PDFDocument } from 'pdf-lib';
// import { useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import { avatar1 } from '@material-tailwind/react';
// import Avatar from '../assets/pngtree-user-profile-avatar-vector-admin-png-image_5289691.png';

interface PdfItem {
  id: string;
  rollNumber: string;
  downloadURL: string;
  deleting: boolean;
}

const AdminDashboard: React.FC = () => {
  const [rollNumber, setRollNumber] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [pdfs, setPdfs] = useState<PdfItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
//   const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchPdfs = async () => {
      const querySnapshot = await getDocs(collection(db, "pdfs"));
      const pdfList: PdfItem[] = [];
      querySnapshot.forEach((doc) => {
        pdfList.push({ id: doc.id, rollNumber: doc.data().rollNumber, downloadURL: doc.data().downloadURL, deleting: false });
      });
      setPdfs(pdfList);
    };

    fetchPdfs();
  }, []);

  const compressPdf = async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    
    // Add compression logic here (e.g., removing metadata, etc.)
    const pdfBytes = await pdfDoc.save({ useObjectStreams: false }); // Save the PDF with minimal changes

    return new Blob([pdfBytes], { type: 'application/pdf' });
  };

  const handleUpload = async () => {
    if (file && rollNumber) {
      setUploading(true);
      setUploadSuccess(false);
      const compressedFile = await compressPdf(file);
      const storageRef = ref(storage, `pdfs/${rollNumber}.pdf`);
      await uploadBytes(storageRef, compressedFile);
      const downloadURL = await getDownloadURL(storageRef);
      await addDoc(collection(db, "pdfs"), { rollNumber, downloadURL });
      setRollNumber('');
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setUploadSuccess(true);
      setUploading(false);

      // Refresh the PDF list after upload
      const querySnapshot = await getDocs(collection(db, "pdfs"));
      const pdfList: PdfItem[] = [];
      querySnapshot.forEach((doc) => {
        pdfList.push({ id: doc.id, rollNumber: doc.data().rollNumber, downloadURL: doc.data().downloadURL, deleting: false });
      });
      setPdfs(pdfList);
    }
  };

  const handleDelete = async (id: string, rollNumber: string) => {
    setPdfs(prevPdfs => prevPdfs.map(pdf => pdf.id === id ? { ...pdf, deleting: true } : pdf));
    await deleteDoc(doc(db, "pdfs", id));
    const storageRef = ref(storage, `pdfs/${rollNumber}.pdf`);
    await deleteObject(storageRef);
    setPdfs(prevPdfs => prevPdfs.filter(pdf => pdf.id !== id));
  };

//   const handleLogout = () => {
//     // Remove all cookies
//     Cookies.remove('sessionCookieName'); // Replace 'sessionCookieName' with your actual cookie name
//     Cookies.remove('anotherCookie'); // Repeat this for all cookies you want to remove

//     // Redirect to login page
//     navigate('/login'); // Replace with your actual logout route
//   };

  return (
   
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Top bar with avatar and logout button */}
      <div className="">
        {/* <img
          src={Avatar} // Replace with the actual avatar URL or user's avatar
          alt="Avatar"
          className="w-10 h-10 rounded-full mr-4"
        /> */}
        {/* <button 
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded-lg"
        >
          Logout
        </button> */}
      </div>
      <br></br><br></br><br></br>
    

      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full mb-8 ">
        <h1 className="text-2xl font-bold mb-4 text-center">Admin Upload</h1>
        <input
          type="text"
          placeholder="Registration Number"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          className="border border-gray-300 rounded-lg w-full p-2 mb-4"
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          className="border border-gray-300 rounded-lg w-full p-2 mb-4"
        />
        <button 
          onClick={handleUpload} 
          className="bg-blue-500 text-white w-full py-2 rounded-lg"
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
        {uploadSuccess && <div className="text-green-500 mt-2">Upload successful</div>}
      </div>

      <div className="bg-white shadow-md rounded-lg p-8 max-w-2xl w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">PDF List</h1>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Roll Number</th>
              <th className="px-4 py-2">PDF</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pdfs.map((pdf) => (
              <tr key={pdf.id}>
                <td className="border px-4 py-2">{pdf.rollNumber}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => window.open(pdf.downloadURL, '_blank')}
                    className="bg-green-500 text-white py-1 px-2 rounded"
                  >
                    View
                  </button>
                </td>
                <td className="border px-4 py-2">
                  {pdf.deleting ? (
                    <span className="text-red-500">Deleting...</span>
                  ) : (
                    <button
                      onClick={() => handleDelete(pdf.id, pdf.rollNumber)}
                      className="bg-red-500 text-white py-1 px-2 rounded"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
