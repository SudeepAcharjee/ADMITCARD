// src/AdminPage.tsx
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

interface FormData {
  name: string;
  fatherName: string;
  motherName: string;
  address: string;
  dob: string;
  age: string;
  sex: string;
  religion: string;
  caste: string;
  maritalStatus: string;
  mobileNo: string;
  email: string;
  qualification: string;
  course: string;
  timestamp: {
    seconds: number;
    nanoseconds: number;
  };
}

const AdminPage: React.FC = () => {
  const [formEntries, setFormEntries] = useState<{ [key: string]: FormData[] }>({});

  useEffect(() => {
    const fetchFormEntries = async () => {
      const formCollection = collection(db, 'applications');
      const formSnapshot = await getDocs(formCollection);
      const formDataList = formSnapshot.docs.map(doc => doc.data() as FormData);

      // Grouping the data by date
      const groupedData: { [key: string]: FormData[] } = {};
      formDataList.forEach(data => {
        const date = new Date(data.timestamp.seconds * 1000).toLocaleDateString();
        if (!groupedData[date]) {
          groupedData[date] = [];
        }
        groupedData[date].push(data);
      });

      setFormEntries(groupedData);
    };

    fetchFormEntries();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Page - Form Data Entries</h1>
      {Object.entries(formEntries).map(([date, entries]) => (
        <div key={date} className="mb-8">
          <h2 className="text-xl font-bold mb-2">{date}</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Father Name</th>
                  <th className="py-2 px-4 border-b">Mother Name</th>
                  <th className="py-2 px-4 border-b">Address</th>
                  <th className="py-2 px-4 border-b">DOB</th>
                  <th className="py-2 px-4 border-b">Age</th>
                  <th className="py-2 px-4 border-b">Sex</th>
                  <th className="py-2 px-4 border-b">Religion</th>
                  <th className="py-2 px-4 border-b">Caste</th>
                  <th className="py-2 px-4 border-b">Marital Status</th>
                  <th className="py-2 px-4 border-b">Mobile No</th>
                  <th className="py-2 px-4 border-b">Email</th>
                  <th className="py-2 px-4 border-b">Qualification</th>
                  <th className="py-2 px-4 border-b">Course</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">{entry.name}</td>
                    <td className="py-2 px-4 border-b">{entry.fatherName}</td>
                    <td className="py-2 px-4 border-b">{entry.motherName}</td>
                    <td className="py-2 px-4 border-b">{entry.address}</td>
                    <td className="py-2 px-4 border-b">{entry.dob}</td>
                    <td className="py-2 px-4 border-b">{entry.age}</td>
                    <td className="py-2 px-4 border-b">{entry.sex}</td>
                    <td className="py-2 px-4 border-b">{entry.religion}</td>
                    <td className="py-2 px-4 border-b">{entry.caste}</td>
                    <td className="py-2 px-4 border-b">{entry.maritalStatus}</td>
                    <td className="py-2 px-4 border-b">{entry.mobileNo}</td>
                    <td className="py-2 px-4 border-b">{entry.email}</td>
                    <td className="py-2 px-4 border-b">{entry.qualification}</td>
                    <td className="py-2 px-4 border-b">{entry.course}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminPage;
