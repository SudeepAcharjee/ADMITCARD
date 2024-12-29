
import { BrowserRouter, Routes, Route,  } from 'react-router-dom';
// import Footer from './components/Footer';
// import Navbar from './components/Navbar';

// // import Home from './Pages/Home';
// import Contact from './Pages/contact';
// import Courses from './Pages/Courses';
// import Notice from './Pages/Notice';
// import RegistrationForm from './Pages/Form';
// import FormsData from './components/FormData';
// import Addcourse from './components/Addcourses';
// import Login from './Pages/Login';
// import AdminDashboard from './Pages/AdminDashboard';

import { AuthProvider } from './contexts/AuthContext';
// import ProtectedRoute from './components/ProtectedRoute';
import Search1 from './Pages/Search';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './Pages/AdminDashboard';
import Contact from './Pages/contact';
import Login from './Pages/Login';
// import CertificateView from './Pages/CertificateView';




function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        {/* <Navbar /> */}
        <Routes>
          {/* <Route path="/" element={<Home />} />

          <Route path="/contact" element={<Contact />} />
          <Route path="/course" element={<Courses/>} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/form" element={<RegistrationForm />} />
          <Route path="/formdata" element={<FormsData />} />
          <Route path="/addcourse" element={<Addcourse />} /> */}
              {/* <Route path="/contact" element={<Contact />} /> */}
          <Route path="/search" element={<Search1 />} />
          <Route path="/" element={<Search1 />} />
          
          <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<ProtectedRoute element={<AdminDashboard />} />} />
            <Route path="/check" element={<ProtectedRoute element={<Contact />} />} />
          </Routes>
      
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
