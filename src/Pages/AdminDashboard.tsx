import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../firebase';

const MedicalCertificateForm: React.FC = () => {
  const [formData, setFormData] = useState({
    certificateNo: '',
    name: '',
    motherName: '',
    fatherName: '',
    address: '',
    qualification: '',
    university: '',
    college: '',
    yearOfPassing: '',
    registrationDate: '',
    registrationPlace: '',
    publishingDate: '',
    imageUrl: '',
    dob: '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [additionalFile, setAdditionalFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [additionalFileUrl, setAdditionalFileUrl] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'imageUrl' && files) {
      const file = files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else if (name === 'additionalFile' && files) {
      const file = files[0];
      setAdditionalFile(file);
      setAdditionalFileUrl(file.name); // Set the name for display
    } else if (name === 'registrationDate' || name === 'publishingDate') {
      const formattedDate = new Date(value).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
      setFormData({
        ...formData,
        [name]: formattedDate,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleFileDelete = async () => {
    if (additionalFileUrl) {
      try {
        const fileRef = ref(storage, `additionalFiles/${additionalFile?.name}`);
        await deleteObject(fileRef);
        setAdditionalFile(null);
        setAdditionalFileUrl(null);
        alert('File deleted successfully!');
      } catch (error) {
        console.error('Error deleting file:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setUploading(true);
      let imageUrl = formData.imageUrl;
      let additionalFileDownloadUrl = null;

      if (imageFile) {
        const imageRef = ref(storage, `medicalCertificates/${imageFile.name}`);
        const uploadTask = await uploadBytesResumable(imageRef, imageFile);
        imageUrl = await getDownloadURL(uploadTask.ref);
      }

      if (additionalFile) {
        const fileRef = ref(storage, `additionalFiles/${additionalFile.name}`);
        const uploadTask = await uploadBytesResumable(fileRef, additionalFile);
        additionalFileDownloadUrl = await getDownloadURL(uploadTask.ref);
      }

      await addDoc(collection(db, 'medicalCertificates'), { ...formData, imageUrl, additionalFileDownloadUrl });

      alert('Certificate and file submitted successfully!');
      setFormData({
        certificateNo: '',
        name: '',
        motherName: '',
        fatherName: '',
        address: '',
        qualification: '',
        university: '',
        college: '',
        yearOfPassing: '',
        registrationDate: '',
        registrationPlace: '',
        publishingDate: '',
        imageUrl: '',
        dob: '',
      });
      setImagePreview(null);
      setAdditionalFile(null);
      setAdditionalFileUrl(null);
    } catch (error) {
      console.error('Error submitting certificate and file:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

<div className="fixed top-4 right-4 flex space-x-4">
  <a
    href="/check"
    target="_blank"
    rel="noopener noreferrer"
    className="px-4 py-2 bg-orange-600 text-white font-semibold rounded hover:bg-orange-700 transition duration-300"
  >
    Check Data
  </a>
  <a
    href="https://lcbcollege.co.in/"
    target="_blank"
    rel="noopener noreferrer"
    className="px-4 py-2 bg-orange-600 text-white font-semibold rounded hover:bg-orange-700 transition duration-300"
  >
    Logout
  </a>
</div>

      <form onSubmit={handleSubmit} className="w-8/12 max-w-2xl p-6 bg-white shadow-lg rounded-lg">
        <div className="flex items-start mb-6">
          <label htmlFor="imageUrl" className="block mr-6">
            {imagePreview ? (
              <img src={imagePreview} alt="Avatar" className="w-32 h-32 rounded-md object-cover border-4 border-white shadow-lg" />
            ) : (
              <div className="w-32 h-32 rounded-md bg-gray-200 flex items-center justify-center border-4 border-white shadow-lg">
                <span className="text-gray-500">Upload</span>
              </div>
            )}
            <input
              type="file"
              id="imageUrl"
              name="imageUrl"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
          </label>
          <h2 className="text-center text-2xl font-bold mb-4">Admit Card Form</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {/* Existing fields here */}
          <div className="mb-4">
            {/* <label htmlFor="certificateNo" className="block text-lg font-medium text-gray-700">Certificate No</label> */}
            {/* <input
              type="text"
              id="certificateNo"
              name="certificateNo"
              value={formData.certificateNo}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-2 border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 lg:text-lg p-3 transition ease-in-out duration-300 hover:border-indigo-400"
            /> */}
          </div>
         
          {/* Add other form fields similarly */}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {[
            { label: 'Registration No', name: 'registrationNo' },
            { label: 'Name', name: 'name' },
            { label: 'Mother\'s Name', name: 'motherName' },
            { label: 'Father\'s Name', name: 'fatherName' },
            { label: 'Address', name: 'address' },
            { label: 'Qualification', name: 'qualification' },
            { label: 'Name of University', name: 'university' },
            { label: 'Name of College', name: 'college' },
            { label: 'Year of Passing', name: 'yearOfPassing' },
            { label: 'Date & Place of Registration', name: 'registrationdate' },
            { label: 'Date of Birth (dd/mm/yyyy)', name: 'dob' },
            // { label: 'Publishing Date', name: 'publishingDate' }, // Added Publishing Date field
          ].map((field, index) => (
            <div key={index} className="mb-4">
              <label htmlFor={field.name} className="block text-lg font-medium text-gray-700">
                {field.label}
              </label>
              {field.name === 'registrationDate' || field.name === 'publishingDate' ? (
                <input
                  type="text"
                  id={field.name}
                  name={field.name}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border-2 border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 lg:text-lg p-3 transition ease-in-out duration-300 hover:border-indigo-400"
                />
              ) : (
                <input
                  type="text"
                  id={field.name}
                  name={field.name}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border-2 border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 lg:text-lg p-3 transition ease-in-out duration-300 hover:border-indigo-400"
                />
              )}
            </div>
          ))}
        </div>
        <div className="mb-6">
          <label htmlFor="additionalFile" className="block text-lg font-medium text-gray-700">
            Upload Additional File
          </label>
          <input
            type="file"
            id="additionalFile"
            name="additionalFile"
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border-2 border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 lg:text-lg p-3 transition ease-in-out duration-300 hover:border-indigo-400"
          />
          {additionalFileUrl && (
            <div className="flex items-center mt-4">
              <p className="text-gray-700">{additionalFileUrl}</p>
              <button
                type="button"
                onClick={handleFileDelete}
                className="ml-4 text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        <button
          type="submit"
          className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition ${uploading && 'opacity-50 cursor-not-allowed'}`}
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default MedicalCertificateForm;
