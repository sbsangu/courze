import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import About from './components/about/About';
import ForgetPassword from './components/auth/ForgetPassword';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Resetpassword from './components/auth/Resetpassword';
import Contact from './components/layout/Contact';
import Courses from './components/courses/Courses';
import Home from './components/layout/Home';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import Request from './components/layout/Request';
import Subscribe from './components/payments/Subscribe';
import PaymentSuccess from './components/payments/PaymentSuccess';
import PaymentFail from './components/payments/PaymentFail';
import NotFound from './components/layout/NotFound/NotFound';
import CoursePage from './components/coursePage/CoursePage';
import Profile from './components/Profile/Profile';
import ChangePassword from './components/Profile/ChangePassword';
import UpdateProfile from './components/Profile/UpdateProfile';
import Dashboard from './components/admin/dashboard/Dashboard';
import Users from './components/admin/Users/Users';
import CreateCourse from './components/admin/CreateCourse/CreateCourse';
import AdminCourses from './components/admin/admincourses/AdminCourses';
import { useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUser } from './redux/actions/user.js';

function App() {
  const { isAuthenticated, user, error, message } = useSelector(
    state => state.user
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadUser());
    }
  }, [dispatch]);

  console.log(isAuthenticated);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);

  return (
    <BrowserRouter>
      <Header isAuthenticated={isAuthenticated} user={user} />
      <Routes>
        <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CoursePage />} />
        {isAuthenticated ? (
          <Route
            path="/login"
            element=<Home isAuthenticated={isAuthenticated} />
          />
        ) : (
          <Route
            path="/login"
            element={<Login isAuthenticated={isAuthenticated} />}
          />
        )}
        {/* 
        <Route
          path="/login"
          element={ isAuthenticated ?  <Home  isAuthenticated={isAuthenticated} /> :<Login isAuthenticated={isAuthenticated} />}
        /> */}
        {isAuthenticated ? (
          <Route
            path="/register"
            element=<Home isAuthenticated={isAuthenticated} />
          />
        ) : (
          <Route path="/register" element={<Register />} />
        )}
        <Route path="/request" element={<Request />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/resetpassword/:token" element={<Resetpassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/paymentsuccess" element={<PaymentSuccess />} />
        <Route path="/paymentfail" element={<PaymentFail />} />
        <Route path="/*" element={<NotFound />} />
        {/* {isAuthenticated && <Route path="/profile" element={<Profile />} />} */}

        <Route path="/updateprofile" element={<UpdateProfile />} />
        <Route path="/changepassword" element={<ChangePassword />} />

        <Route path="/contact" element={<Contact />} />
        {/* admin routes */}

        <Route path="/admin/dashboard" element={<Dashboard />} />

        <Route path="/admin/users" element={<Users />} />

        <Route path="/admin/createcourse" element={<CreateCourse />} />

        <Route path="/admin/courses" element={<AdminCourses />} />
      </Routes>
      <Footer />
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
