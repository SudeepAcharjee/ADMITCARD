import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { FaSearch, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

interface Course {
  id: string;
  name: string;
}

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [editedCourseName, setEditedCourseName] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newCourseName, setNewCourseName] = useState<string>('');

  useEffect(() => {
    const fetchCourses = async () => {
      const querySnapshot = await getDocs(collection(db, "courses"));
      const coursesData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Course));
      setCourses(coursesData.sort((a, b) => a.name.localeCompare(b.name)));
    };
    fetchCourses();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value);

  const handleEditClick = (course: Course) => {
    setEditingCourseId(course.id);
    setEditedCourseName(course.name);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => setEditedCourseName(e.target.value);

  const handleSaveEdit = async (courseId: string) => {
    await updateDoc(doc(db, 'courses', courseId), { name: editedCourseName });
    setEditingCourseId(null);
    const updatedCourses = courses.map(course => course.id === courseId ? { ...course, name: editedCourseName } : course);
    setCourses(updatedCourses);
  };

  const handleDeleteClick = async (courseId: string) => {
    await deleteDoc(doc(db, 'courses', courseId));
    setCourses(courses.filter(course => course.id !== courseId));
  };

  const handleAddCourseClick = () => setShowAddModal(true);

  const handleAddCourse = async () => {
    if (newCourseName.trim() !== '') {
      const docRef = await addDoc(collection(db, "courses"), { name: newCourseName });
      setCourses([...courses, { id: docRef.id, name: newCourseName }]);
      setNewCourseName('');
      setShowAddModal(false);
    }
  };

  const filteredCourses = courses.filter(course => course.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="flex flex-col items-center bg-blue-100 p-4 rounded-lg">
      <h1 className="text-4xl font-bold mb-8 mt-4 text-purple-800">Our Course List</h1>
      <div className="mb-4 w-full flex justify-between items-center">
        <button
          onClick={handleAddCourseClick}
          className="flex items-center space-x-2 bg-green-500 text-white py-2 px-4 rounded focus:outline-none hover:bg-green-600"
        >
          <FaPlus />
          <span>Add Course</span>
        </button>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search courses..."
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <FaSearch className="text-gray-500" />
        </div>
      </div>
      <table className="min-w-full bg-white border-collapse border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-yellow-50">
          <tr>
            <th className="py-2 border border-gray-200 text-center">S.No</th>
            <th className="py-2 border border-gray-200 text-center">Course Name</th>
            <th className="py-2 border border-gray-200 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCourses.map((course, index) => (
            <tr key={index} className="hover:bg-blue-50">
              <td className="border px-4 py-2 text-center">{index + 1}</td>
              <td className="border px-4 py-2 text-center">
                {editingCourseId === course.id ? (
                  <input
                    type="text"
                    value={editedCourseName}
                    onChange={handleEditChange}
                    className="p-2 border border-gray-300 rounded"
                  />
                ) : (
                  course.name
                )}
              </td>
              <td className="border px-4 py-2 text-center">
                {editingCourseId === course.id ? (
                  <button 
                    onClick={() => handleSaveEdit(course.id)} 
                    className="text-green-500"
                  >
                    Save
                  </button>
                ) : (
                  <div className="flex justify-center space-x-2">
                    <FaEdit 
                      onClick={() => handleEditClick(course)} 
                      className="text-blue-500 cursor-pointer"
                    />
                    <FaTrash 
                      onClick={() => handleDeleteClick(course.id)} 
                      className="text-red-500 cursor-pointer"
                    />
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Course Modal */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-2xl mb-4">Add New Course</h2>
            <input
              type="text"
              value={newCourseName}
              onChange={(e) => setNewCourseName(e.target.value)}
              placeholder="Course Name"
              className="p-2 border border-gray-300 rounded w-full mb-4"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowAddModal(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCourse}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              >
                Add Course
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
