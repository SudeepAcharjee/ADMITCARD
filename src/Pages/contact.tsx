import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

interface CertificateData {
  id: string;
  registrationNo: string;
  name: string;
  motherName: string;
  fatherName: string;
  address: string;
  qualification: string;
  university: string;
  college: string;
  yearOfPassing: string;
  registrationDate: string;
  registrationPlace: string;
  publishingDate: string;
  imageUrl: string;
  additionalFileDownloadUrl: string | null;
  dob: string;
}

const MedicalCertificatesTable: React.FC = () => {
  const [certificates, setCertificates] = useState<CertificateData[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<CertificateData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'medicalCertificates'));
      const data: CertificateData[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as CertificateData[];
      setCertificates(data);
    };

    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm('Are you sure you want to delete this record?');
    if (confirmDelete) {
      await deleteDoc(doc(db, 'medicalCertificates', id));
      setCertificates(certificates.filter(certificate => certificate.id !== id));
    }
  };

  const handleEdit = (certificate: CertificateData) => {
    setEditId(certificate.id);
    setEditData(certificate);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editData && editId) {
      const docRef = doc(db, 'medicalCertificates', editId);
      await updateDoc(docRef, editData as { [x: string]: any });
      setCertificates(certificates.map(cert => (cert.id === editId ? editData : cert)));
      setEditId(null);
      setEditData(null);
    }
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditData(null);
  };

  return (
<div>

        <h1 className="text-3xl font-bold mb-6 text-center">Admit Card Data list</h1>
        <div className="fixed top-4 right-4 flex space-x-4">
  <a
    href="/admin"
    target="_blank"
    rel="noopener noreferrer"
    className="px-4 py-2 bg-orange-600 text-white font-semibold rounded hover:bg-orange-700 transition duration-300"
  >
    Admin
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


        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Image</th>
              <th className="border p-2">Registration No</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Mother's Name</th>
              <th className="border p-2">Father's Name</th>
              <th className="border p-2">Address</th>
              <th className="border p-2">Qualification</th>
              <th className="border p-2">University</th>
              <th className="border p-2">Year of Passing</th>
              {/* <th className="border p-2">Registration Date</th>
              <th className="border p-2">Publishing Date</th> */}
              <th className="border p-2">Additional File</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {certificates.map(certificate => (
              <tr key={certificate.id} className="bg-white border-b">
                <td className="border p-2">
                  <img
                    src={certificate.imageUrl}
                    alt={certificate.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </td>
                <td className="border p-2">{certificate.registrationNo}</td>
                <td className="border p-2">{certificate.name}</td>
                <td className="border p-2">{certificate.motherName}</td>
                <td className="border p-2">{certificate.fatherName}</td>
                <td className="border p-2">{certificate.address}</td>
                <td className="border p-2">{certificate.qualification}</td>
                <td className="border p-2">{certificate.university}</td>
                <td className="border p-2">{certificate.yearOfPassing}</td>
                {/* <td className="border p-2">{certificate.registrationDate}</td>
                <td className="border p-2">{certificate.publishingDate}</td> */}
                <td className="border p-2">
                  {certificate.additionalFileDownloadUrl ? (
                    <a
                      href={certificate.additionalFileDownloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      View File
                    </a>
                  ) : (
                    'No File'
                  )}
                </td>
                <td className="border p-2 flex space-x-2">
                  <button
                    onClick={() => handleEdit(certificate)}
                    className="text-yellow-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(certificate.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {editData && (
              <tr className="bg-gray-100">
                <td colSpan={13} className="border p-4">
                  <form onSubmit={handleUpdate}>
                    <div className="grid grid-cols-1 gap-4">
                      <input
                        type="text"
                        name="certificateNo"
                        value={editData.registrationNo}
                        onChange={handleChange}
                        placeholder="Certificate No"
                        className="p-2 border rounded"
                      />
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className="p-2 border rounded"
                      />
                      <input
                        type="text"
                        name="motherName"
                        value={editData.motherName}
                        onChange={handleChange}
                        placeholder="Mother's Name"
                        className="p-2 border rounded"
                      />
                      <input
                        type="text"
                        name="fatherName"
                        value={editData.fatherName}
                        onChange={handleChange}
                        placeholder="Father's Name"
                        className="p-2 border rounded"
                      />
                      <input
                        type="text"
                        name="address"
                        value={editData.address}
                        onChange={handleChange}
                        placeholder="Address"
                        className="p-2 border rounded"
                      />
                        <input
                        type="text"
                        name="qualification"
                        value={editData.qualification}
                        onChange={handleChange}
                        placeholder="qualification"
                        className="p-2 border rounded"
                      />
                        <input
                        type="text"
                        name="address"
                        value={editData.university}
                        onChange={handleChange}
                        placeholder="Address"
                        className="p-2 border rounded"
                      />
                        <input
                        type="text"
                        name="address"
                        value={editData.yearOfPassing}
                        onChange={handleChange}
                        placeholder="Address"
                        className="p-2 border rounded"
                      />
                      {/* Add more fields as needed */}
                      <div className="flex space-x-4">
                        <button
                          type="submit"
                          className="mt-2 bg-blue-500 text-white p-2 rounded"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="mt-2 bg-gray-500 text-white p-2 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </form>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
  
  );
};

export default MedicalCertificatesTable;
