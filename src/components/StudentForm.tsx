import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Make sure to import your Firebase configuration
import { collection, addDoc, getDocs, query, orderBy, limit } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const storage = getStorage();

const StudentForm: React.FC = () => {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [formNumber, setFormNumber] = useState<string>("01");
  const [session, setSession] = useState<string>("");
  const [course, setCourse] = useState<string>("");
  const [medium, setMedium] = useState<string>("");
  const [caste, setCaste] = useState<string>("");
  const [stream, setStream] = useState<string>("");
  const [martial, setmartial] = useState<string>("");
  const [enrollmentNumber, setEnrollmentNumber] = useState<string>("DBS-2024001");
  const [courses, setCourses] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [phonenumber, setphoneNumber] = useState<string>("");
  const [emailid, setEmail] = useState<string>("");

  // New state variables
  const [studentName, setStudentName] = useState<string>("");
  const [fatherName, setFatherName] = useState<string>("");
  const [motherName, setMotherName] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [nationality, setNationality] = useState<string>("");
  const [permanentAddress, setPermanentAddress] = useState<string>("");
  const [presentAddress, setPresentAddress] = useState<string>("");
  const [religion, setReligion] = useState<string>("");
  const [aadhaarNumber, setAadhaarNumber] = useState<string>("");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);


  //subjects 
  const subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "English", "History", "Geography", "Economics", "Computer Science, Chemistry, Biology", "Political Science", "Sociology", "Psychology", "Physical Education", "Home Science", "Fine Arts", "Music"];

  const handleSubjectChange = (subject: string) => {
    setSelectedSubjects(prevSelectedSubjects =>
      prevSelectedSubjects.includes(subject)
        ? prevSelectedSubjects.filter(s => s !== subject)
        : [...prevSelectedSubjects, subject]
    );
  };
  
  
  

  // Fetch courses from Firebase on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      const courseCollection = collection(db, "courses");
      const courseSnapshot = await getDocs(courseCollection);
      const courseList = courseSnapshot.docs.map((doc) => doc.data().name);
      setCourses(courseList);
    };

    fetchCourses();
  }, []);

  // Auto-generate form number and enrollment number
  const fetchLastEnrollment = async () => {
    const studentsCollection = collection(db, "students");
    const q = query(studentsCollection, orderBy("enrollmentNumber", "desc"), limit(1));
    const studentSnapshot = await getDocs(q);

    if (!studentSnapshot.empty) {
      const lastEnrollment = studentSnapshot.docs[0].data().enrollmentNumber;
      const newEnrollmentNumber = `DBS-${(parseInt(lastEnrollment.split("-")[1]) + 1).toString().padStart(7, '0')}`;
      setEnrollmentNumber(newEnrollmentNumber);
      setFormNumber((parseInt(lastEnrollment.split("-")[1]) + 1).toString().padStart(2, '0'));
    }
  };

  useEffect(() => {
    fetchLastEnrollment();
  }, []);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("Uploading...");

    try {
      let avatarUrl = "";

      if (avatar) {
        const storageRef = ref(storage, `avatars/${avatar.name}`);
        const uploadTask = await uploadBytes(storageRef, avatar);
        avatarUrl = await getDownloadURL(uploadTask.ref);
      }
      // Simulate a delay to showcase loading (optional)
      await new Promise(resolve => setTimeout(resolve, 2000));

      const docRef = await addDoc(collection(db, "students"), {
        formNumber,
        session,
        course,
        medium,
        stream,
        enrollmentNumber,
        studentName,
        fatherName,
        motherName,
        dateOfBirth,
        gender,
        nationality,
        permanentAddress,
        presentAddress,
        religion,
        aadhaarNumber,
        martial,
        caste,
        phonenumber,
        emailid,
        subjects: selectedSubjects,
        avatarUrl: avatarUrl,
      });

      console.log("Document written with ID: ", docRef.id);
      setMessage("Uploaded successfully!");

      // Reset the form fields
      setAvatar(null);
      setSession("");
      setmartial("");
      setCourse("");
      setMedium("");
      setStream("");
      setStudentName("");
      setFatherName("");
      setMotherName("");
      setDateOfBirth("");
      setGender("");
      setNationality("");
      setPermanentAddress("");
      setPresentAddress("");
      setReligion("");
      setAadhaarNumber("");
      setCaste("");
      setphoneNumber("");
      setEmail("");
      setSelectedSubjects([]); 
     

      // Refresh form number and enrollment number
      await fetchLastEnrollment();

      // Simulate a short delay before clearing the success message and resetting the loading state
      setTimeout(() => {
        setMessage("");
        setLoading(false);
      }, 2000);

    } catch (e) {
      console.error("Error adding document: ", e);
      setMessage("Failed to upload. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[70%] mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Student Application Form</h2>
      <form onSubmit={handleSubmit} className="space-y-6 w-full">
        <div className="flex items-center space-x-4">
          <div>
            {avatar ? (
              <img
                src={URL.createObjectURL(avatar)}
                alt="Avatar"
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">
              Upload Avatar
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Form Number: <span className="font-semibold">{formNumber}</span>
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Enrollment Number: <span className="font-semibold">{enrollmentNumber}</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Student Name
          </label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter Student Name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Father's Name
          </label>
          <input
            type="text"
            value={fatherName}
            onChange={(e) => setFatherName(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter Father's Name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mother's Name
          </label>
          <input
            type="text"
            value={motherName}
            onChange={(e) => setMotherName(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter Mother's Name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date of Birth
          </label>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nationality
          </label>
          <select
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="" disabled>
              Select Nationality
            </option>
            <option value="Indian">Indian</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Permanent Address
          </label>
          <textarea
            value={permanentAddress}
            onChange={(e) => setPermanentAddress(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter Permanent Address"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Present Address
          </label>
          <textarea
            value={presentAddress}
            onChange={(e) => setPresentAddress(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter Present Address"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Religion
          </label>
          <select
            value={religion}
            onChange={(e) => setReligion(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="" disabled>
              Select Religion
            </option>
            <option value="Islam">Islam</option>
            <option value="Hinduism">Hinduism</option>
            <option value="Sikhism">Sikhism</option>
            <option value="Christianity">Christianity</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Martial Status
          </label>
          <select
            value={martial}
            onChange={(e) => setmartial(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="" disabled>
              Select Martial Status
            </option>
            <option value="Married">Married</option>
            <option value="Single">Single</option>
            <option value="Divorce">Divorce</option>

          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Caste
          </label>
          <select
            value={caste}
            onChange={(e) => setCaste(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="" disabled>
              Select Caste
            </option>
            <option value="General">General</option>
            <option value="SC">SC</option>
            <option value="ST">ST</option>
            <option value="OBC">OBC</option>
            <option value="Minorites">Minorities</option>
            <option value="Others">Others</option>

          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Aadhaar Number
          </label>
          <input
            type="text"
            value={aadhaarNumber}
            onChange={(e) => setAadhaarNumber(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter Aadhaar Number"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="text"
            value={phonenumber}
            onChange={(e) => setphoneNumber(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter Phone Number"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email ID
          </label>
          <input
            type="email"
            value={emailid}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter Email ID"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Session (Optional)
          </label>
          <select
            value={session}
            onChange={(e) => setSession(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">Select Session</option>
            <option value="Jan">January</option>
            <option value="Jun">June</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Course
          </label>
          <select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="" disabled>
              Select Course
            </option>
            {courses.map((course, index) => (
              <option key={index} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Medium
          </label>
          <select
            value={medium}
            onChange={(e) => setMedium(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="" disabled>
              Select Medium
            </option>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Stream
          </label>
          <select
            value={stream}
            onChange={(e) => setStream(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="" disabled>
              Select Stream
            </option>
            <option value="Arts">Arts</option>
            <option value="Commerce">Commerce</option>
            <option value="Science">Science</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
           Subjects
           </label>
           <div className="mt-2 flex flex-wrap gap-4">
           {subjects.map((subject) => (
          <div key={subject} className="flex items-center">
          <input
          type="checkbox"
          value={subject}
          checked={selectedSubjects.includes(subject)}
          onChange={() => handleSubjectChange(subject)}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
           />
         <label htmlFor={subject} className="ml-2 block text-sm text-gray-700">
          {subject}
         </label>
        </div>
         ))}
          </div>
      </div>

    <button
          type="submit"
          className={`w-full py-2 px-4 rounded ${
            loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          } text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Submit"}
        </button>
      </form>
      {message && (
        <p className="mt-4 text-center text-sm font-medium text-gray-700">
          {message}
        </p>
      )}
    </div>
  );
};

export default StudentForm;
