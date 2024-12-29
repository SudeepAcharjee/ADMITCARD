import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<any>({});

  // Fetch student data
  useEffect(() => {
    const fetchStudents = async () => {
      const studentsCollection = collection(db, "students");
      const studentSnapshot = await getDocs(studentsCollection);
      const studentList = studentSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStudents(studentList);
    };

    fetchStudents();
  }, []);

  const handleDetailsClick = (student: any) => {
    setSelectedStudent(student);
  };

  const handleEditClick = (student: any) => {
    setEditForm(student);
    setIsEditing(true);
  };

  const handleDeleteClick = (id: string) => {
    console.log("Delete student with ID:", id);
    // Implement delete functionality
  };

  const handleBackClick = () => {
    setSelectedStudent(null);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm((prevState: any) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const studentDoc = doc(db, "students", editForm.id);
    await updateDoc(studentDoc, editForm);
    setIsEditing(false);
    setSelectedStudent(editForm);
    // Optionally refresh student list
    const studentsCollection = collection(db, "students");
    const studentSnapshot = await getDocs(studentsCollection);
    const studentList = studentSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setStudents(studentList);
  };

  return (
    <div className="relative max-w-[90%] mx-auto p-6 bg-white rounded-lg shadow-md">
      {selectedStudent && !isEditing ? (
        <>
          <img
            src={selectedStudent.avatarUrl || "fallback-image-url"} // Replace with your image URL
            alt="Student Image"
            className="absolute top-4 right-4 w-16 h-16 object-cover rounded-full border border-gray-300"
          />
          <h3 className="text-lg font-semibold mb-4">Student Details</h3>
          <button
            onClick={handleBackClick}
            className="mb-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Back
          </button>
          <div className="p-4 bg-gray-100 rounded-lg shadow-md align-middle">
  <table className="w-full border-separate border-spacing-4">
    <tbody>
      <tr>
        <td className="font-bold">Student Name:</td>
        <td>{selectedStudent.studentName}</td>
      </tr>
      <tr>
        <td className="font-bold">Enrollment Number:</td>
        <td>{selectedStudent.enrollmentNumber}</td>
      </tr>
      <tr>
        <td className="font-bold">Course:</td>
        <td>{selectedStudent.course}</td>
      </tr>
      <tr>
        <td className="font-bold">Form Number:</td>
        <td>{selectedStudent.formNumber}</td>
      </tr>
      <tr>
        <td className="font-bold">Session:</td>
        <td>{selectedStudent.session}</td>
      </tr>
      <tr>
        <td className="font-bold">Medium:</td>
        <td>{selectedStudent.medium}</td>
      </tr>
      <tr>
        <td className="font-bold">Stream:</td>
        <td>{selectedStudent.stream}</td>
      </tr>
      <tr>
        <td className="font-bold">Martial Status:</td>
        <td>{selectedStudent.martial}</td>
      </tr>
      <tr>
        <td className="font-bold">Caste:</td>
        <td>{selectedStudent.caste}</td>
      </tr>
      <tr>
        <td className="font-bold">Phone Number:</td>
        <td>{selectedStudent.phonenumber}</td>
      </tr>
      <tr>
        <td className="font-bold">Email ID:</td>
        <td>{selectedStudent.emailid}</td>
      </tr>
      <tr>
        <td className="font-bold">Address:</td>
        <td>{selectedStudent.permanentAddress}</td>
      </tr>
      <tr>
        <td className="font-bold">Date of Birth:</td>
        <td>{selectedStudent.dateOfBirth}</td>
      </tr>
      <tr>
        <td className="font-bold">Gender:</td>
        <td>{selectedStudent.gender}</td>
      </tr>
      <tr>
        <td className="font-bold">Nationality:</td>
        <td>{selectedStudent.nationality}</td>
      </tr>
      <tr>
        <td className="font-bold">Religion:</td>
        <td>{selectedStudent.religion}</td>
      </tr>
      <tr>
        <td className="font-bold">Aadhaar Number:</td>
        <td>{selectedStudent.aadhaarNumber}</td>
      </tr>
      <tr>
        <td className="font-bold">Father's Name:</td>
        <td>{selectedStudent.fatherName}</td>
      </tr>
      <tr>
        <td className="font-bold">Mother's Name:</td>
        <td>{selectedStudent.motherName}</td>
      </tr>
      <tr>
        <td className="font-bold">Subjects:</td>
        <td>{selectedStudent.subjects.join(", ")}</td>
      </tr>
    </tbody>
  </table>

  <div className="mt-4 flex justify-between">
    <button
      onClick={() => handleEditClick(selectedStudent)}
      className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600"
    >
      Edit
    </button>
    <button
      onClick={() => window.print()}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
    >
      Print
    </button>
  </div>
</div>

        </>
      ) : isEditing ? (
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Edit Student Details</h3>
          <form onSubmit={handleSubmit}>
          <label className="block mb-2">
    <span className="text-gray-700">Student Name</span>
    <input
      type="text"
      name="studentName"
      value={editForm.studentName || ""}
      onChange={handleChange}
      className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm"
      required
    />
  </label>

  <label className="block mb-2">
    <span className="text-gray-700">Course</span>
    <input
      type="text"
      name="course"
      value={editForm.course || ""}
      onChange={handleChange}
      className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm"
      required
    />
  </label>

  <label className="block mb-2">
    <span className="text-gray-700">Form Number</span>
    <input
      type="text"
      name="formNumber"
      value={editForm.formNumber || ""}
      onChange={handleChange}
      className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm"
      required
    />
  </label>

  <label className="block mb-2">
    <span className="text-gray-700">Session</span>
    <input
      type="text"
      name="session"
      value={editForm.session || ""}
      onChange={handleChange}
      className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm"
      required
    />
  </label>

  <label className="block mb-2">
    <span className="text-gray-700">Medium</span>
    <input
      type="text"
      name="medium"
      value={editForm.medium || ""}
      onChange={handleChange}
      className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm"
      required
    />
  </label>

  <label className="block mb-2">
    <span className="text-gray-700">Stream</span>
    <input
      type="text"
      name="stream"
      value={editForm.stream || ""}
      onChange={handleChange}
      className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm"
      required
    />
  </label>

  <label className="block mb-2">
    <span className="text-gray-700">Martial Status</span>
    <input
      type="text"
      name="martial"
      value={editForm.martial || ""}
      onChange={handleChange}
      className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm"
      required
    />
  </label>

  <label className="block mb-2">
    <span className="text-gray-700">Caste</span>
    <input
      type="text"
      name="caste"
      value={editForm.caste || ""}
      onChange={handleChange}
      className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm"
      required
    />
  </label>

  <label className="block mb-2">
    <span className="text-gray-700">Phone Number</span>
    <input
      type="text"
      name="phonenumber"
      value={editForm.phonenumber || ""}
      onChange={handleChange}
      className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm"
      required
    />
  </label>

  <label className="block mb-2">
    <span className="text-gray-700">Email ID</span>
    <input
      type="email"
      name="emailid"
      value={editForm.emailid || ""}
      onChange={handleChange}
      className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm"
      required
    />
  </label>



  <label className="block mb-2">
    <span className="text-gray-700">Date of Birth</span>
    <input
      type="date"
      name="dateOfBirth"
      value={editForm.dateOfBirth || ""}
      onChange={handleChange}
      className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm"
      required
    />
  </label>

  <label className="block mb-2">
    <span className="text-gray-700">Gender</span>
    <input
      type="text"
      name="gender"
      value={editForm.gender || ""}
      onChange={handleChange}
      className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm"
      required
    />
  </label>

  <label className="block mb-2">
    <span className="text-gray-700">Nationality</span>
    <input
      type="text"
      name="nationality"
      value={editForm.nationality || ""}
      onChange={handleChange}
      className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm"
      required
    />
  </label>

  <label className="block mb-2">
    <span className="text-gray-700">Religion</span>
    <input
      type="text"
      name="religion"
      value={editForm.religion || ""}
      onChange={handleChange}
      className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm"
      required
    />
  </label>

  <label className="block mb-2">
    <span className="text-gray-700">Aadhaar Number</span>
    <input
      type="text"
      name="aadhaarNumber"
      value={editForm.aadhaarNumber || ""}
      onChange={handleChange}
      className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm"
      required
    />
  </label>

  <label className="block mb-2">
    <span className="text-gray-700">Father's Name</span>
    <input
      type="text"
      name="fatherName"
      value={editForm.fatherName || ""}
      onChange={handleChange}
      className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm"
      required
    />
  </label>

  <label className="block mb-2">
    <span className="text-gray-700">Mother's Name</span>
    <input
      type="text"
      name="motherName"
      value={editForm.motherName || ""}
      onChange={handleChange}
      className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm"
      required
    />
  </label>

  <label className="block mb-2">
    <span className="text-gray-700">Subjects</span>
    <input
      type="text"
      name="subjects"
      value={editForm.subjects?.join(", ") || ""}
      onChange={e => handleChange({ ...e, target: { ...e.target, value: e.target.value.split(", ").join(", ") } })}
      className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm"
      required
    />
  </label>
            {/* Add more fields as needed */}
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
            >
              Save Changes
            </button>
          </form>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-semibold mb-6 text-center">Student List</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrollment Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student, index) => (
                <tr key={student.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.studentName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.enrollmentNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.course}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleDetailsClick(student)}
                      className="text-blue-600 hover:text-blue-800 mr-4"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => handleEditClick(student)}
                      className="text-green-600 hover:text-green-800 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(student.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default StudentList
