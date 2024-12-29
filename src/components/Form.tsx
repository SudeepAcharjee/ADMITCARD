import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

interface Course {
  id: string;
  name: string;
}

const Form: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    motherName: '',
    address: '',
    dob: '',
    age: '',
    sex: 'Male',
    religion: 'Hinduism',
    caste: 'General',
    maritalStatus: 'Married',
    mobileNo: '',
    email: '',
    qualification: '10th'
  });

  useEffect(() => {
    const fetchCourses = async () => {
      const coursesCollection = collection(db, 'courses');
      const courseSnapshot = await getDocs(coursesCollection);
      const courseList = courseSnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name
      }));
      setCourses(courseList);
    };

    fetchCourses();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'applications'), {
        ...formData,
        course: selectedCourse,
        timestamp: serverTimestamp()
      });
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Application Form</h1>
        <div className="grid grid-cols-1 gap-4">
          {[
            { label: 'Your Name', name: 'name', type: 'text' },
            { label: 'Your Father Name', name: 'fatherName', type: 'text' },
            { label: 'Your Mother Name', name: 'motherName', type: 'text' },
            { label: 'Present Address', name: 'address', type: 'text' },
            { label: 'Date Of Birth', name: 'dob', type: 'date' },
            { label: 'Your Age', name: 'age', type: 'number' },
            { label: 'Religion', name: 'religion', type: 'text' },
            { label: 'Caste', name: 'caste', type: 'text' },
            { label: 'Marital Status', name: 'maritalStatus', type: 'text' },
            { label: 'Mobile No', name: 'mobileNo', type: 'text' },
            { label: 'Your Email', name: 'email', type: 'email' },
            { label: 'Educational Qualification', name: 'qualification', type: 'text' },
          ].map(({ label, name, type }) => (
            <div key={name} className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
                {label}
              </label>
              <input
                type={type}
                name={name}
                id={name}
                value={formData[name as keyof typeof formData]}
                onChange={handleChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          ))}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sex">
              Sex
            </label>
            <select
              name="sex"
              id="sex"
              value={formData.sex}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="course">
              Select Course
            </label>
            <select
              id="course"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              {courses.map(course => (
                <option key={course.id} value={course.name}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit Online Application Form
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
