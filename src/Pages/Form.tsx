import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Make sure to import your Firebase configuration
import { collection, addDoc, getDocs, query, orderBy, limit } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const storage = getStorage();

const StudentForm: React.FC = () => {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [formNumber, setFormNumber] = useState("01");
  const [session, setSession] = useState("");
  const [course, setCourse] = useState("");
  const [medium, setMedium] = useState("");
  const [caste, setCaste] = useState("");
  const [stream, setStream] = useState("");
  const [martial, setmartial] = useState("");
  const [enrollmentNumber, setEnrollmentNumber] = useState("DBS-2024001");
  const [courses, setCourses] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [phonenumber, setphoneNumber] = useState("");
  const [emailid, setEmail] = useState("");
  const [studentName, setStudentName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");
  const [permanentAddress, setPermanentAddress] = useState("");
  const [presentAddress, setPresentAddress] = useState("");
  const [religion, setReligion] = useState("");
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  const subjects = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "English",
    "History",
    "Geography",
    "Economics",
    "Computer Science",
    "Political Science",
    "Sociology",
    "Psychology",
    "Physical Education",
    "Home Science",
    "Fine Arts",
    "Music",
  ];

  const handleSubjectChange = (subject: string) => {
    setSelectedSubjects((prevSelectedSubjects) =>
      prevSelectedSubjects.includes(subject)
        ? prevSelectedSubjects.filter((s) => s !== subject)
        : [...prevSelectedSubjects, subject]
    );
  };

  useEffect(() => {
    const fetchCourses = async () => {
      const courseCollection = collection(db, "courses");
      const courseSnapshot = await getDocs(courseCollection);
      const courseList = courseSnapshot.docs.map((doc) => doc.data().name);
      setCourses(courseList);
    };
    fetchCourses();
  }, []);

  const fetchLastEnrollment = async () => {
    const studentsCollection = collection(db, "students");
    const q = query(studentsCollection, orderBy("enrollmentNumber", "desc"), limit(1));
    const studentSnapshot = await getDocs(q);
    if (!studentSnapshot.empty) {
      const lastEnrollment = studentSnapshot.docs[0].data().enrollmentNumber;
      const newEnrollmentNumber = `DBS-${(parseInt(lastEnrollment.split("-")[1]) + 1).toString().padStart(7, "0")}`;
      setEnrollmentNumber(newEnrollmentNumber);
      setFormNumber((parseInt(lastEnrollment.split("-")[1]) + 1).toString().padStart(2, "0"));
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
    <div>
      <h1>Student Application Form</h1>
      {avatar ? (
        <img src={URL.createObjectURL(avatar)} alt="Uploaded Avatar" />
      ) : (
        <p>No Image</p>
      )}
      <input type="file" onChange={handleAvatarChange} />
      <br />
      <label>Form Number: {formNumber}</label>
      <br />
      <label>Enrollment Number: {enrollmentNumber}</label>
      <br />
      <label>
        Student Name
        <input
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Enter Student Name"
        />
      </label>
      <br />
      <label>
        Father's Name
        <input
          type="text"
          value={fatherName}
          onChange={(e) => setFatherName(e.target.value)}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Enter Father's Name"
        />
      </label>
      <br />
      <label>
        Mother's Name
        <input
          type="text"
          value={motherName}
          onChange={(e) => setMotherName(e.target.value)}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Enter Mother's Name"
        />
      </label>
      <br />
      <label>
        Date of Birth
        <input
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </label>
      <br />
      <label>
        Gender
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </label>
      <br />
      <label>
        Nationality
        <select
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="">Select Nationality</option>
          <option value="Indian">Indian</option>
          <option value="Others">Others</option>
        </select>
      </label>
      <br />
      <label>
        Permanent Address
        <input
          type="text"
          value={permanentAddress}
          onChange={(e) => setPermanentAddress(e.target.value)}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Enter Permanent Address"
        />
      </label>
      <br />
      <label>
        Present Address
        <input
          type="text"
          value={presentAddress}
          onChange={(e) => setPresentAddress(e.target.value)}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Enter Present Address"
        />
      </label>
      <br />
      <label>
        Religion
        <select
          value={religion}
          onChange={(e) => setReligion(e.target.value)}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="">Select Religion</option>
          <option value="Islam">Islam</option>
          <option value="Hinduism">Hinduism</option>
          <option value="Sikhism">Sikhism</option>
          <option value="Christianity">Christianity</option>
          <option value="Others">Others</option>
        </select>
      </label>
      <br />
      <label>
        Martial Status
        <select
          value={martial}
          onChange={(e) => setmartial(e.target.value)}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="">Select Martial Status</option>
          <option value="Married">Married</option>
          <option value="Single">Single</option>
          <option value="Divorce">Divorce</option>
        </select>
      </label>
      <br />
      <label>
        Caste
        <select
          value={caste}
          onChange={(e) => setCaste(e.target.value)}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="">Select Caste</option>
          <option value="General">General</option>
          <option value="SC">SC</option>
          <option value="ST">ST</option>
          <option value="OBC">OBC</option>
          <option value="Minorities">Minorities</option>
          <option value="Others">Others</option>
        </select>
      </label>
      <br />
      <label>
        Aadhaar Number
        <input
          type="text"
          value={aadhaarNumber}
          onChange={(e) => setAadhaarNumber(e.target.value)}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Enter Aadhaar Number"
        />
      </label>
      <br />
      <label>
        Phone Number
        <input
          type="text"
          value={phonenumber}
          onChange={(e) => setphoneNumber(e.target.value)}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Enter Phone Number"
        />
      </label>
      <br />
      <label>
        Email ID
        <input
          type="email"
          value={emailid}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Enter Email ID"
        />
      </label>
      <br />
      <label>
        Session (Optional)
        <select
          value={session}
          onChange={(e) => setSession(e.target.value)}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="">Select Session</option>
          <option value="January">January</option>
          <option value="June">June</option>
        </select>
      </label>
      <br />
      <label>
        Course
        <select
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="">Select Course</option>
          {courses.map((course, index) => (
            <option key={index} value={course}>
              {course}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Medium
        <select
          value={medium}
          onChange={(e) => setMedium(e.target.value)}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="">Select Medium</option>
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
        </select>
      </label>
      <br />
      <label>
        Stream
        <select
          value={stream}
          onChange={(e) => setStream(e.target.value)}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="">Select Stream</option>
          <option value="Arts">Arts</option>
          <option value="Commerce">Commerce</option>
          <option value="Science">Science</option>
        </select>
      </label>
      <br />
      <label>
        Subjects
        {subjects.map((subject) => (
          <div key={subject}>
            <input
              type="checkbox"
              checked={selectedSubjects.includes(subject)}
              onChange={() => handleSubjectChange(subject)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span>{subject}</span>
          </div>
        ))}
      </label>
      <br />
      <button type="submit" onClick={handleSubmit} disabled={loading}>
        {loading ? "Uploading..." : "Submit"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default StudentForm;
