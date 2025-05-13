import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login/Login';
import SignUp from './pages/signup/SignUp';
import Home from './pages/Home/Home';
import OTPVerification from './pages/verify/OTPVerification';
import ForgotPassword from './screens/auth/Forgot_Password';
import Verify from './screens/auth/Verify_OTP';
import NewPassword from './screens/auth/New_Password';
import Account from './screens/account/Account';
import Layout from './layout';
import UpdateProfile from './screens/account/EditAccount';
import UpdatePassword from './screens/account/UpdatePassword';
import AboutUs from './screens/account/AboutUs';
import PrivacyPolicy from './screens/account/PrivacyPolicy';
import TermsOfUse from './screens/account/TermsOfUse';
import DeleteAccount from './screens/account/DeleteAccount';
import Users from './pages/users/Users';
import CreateFolder from './screens/folder/CreateFolder';
import UserAccess from './screens/folder/userAccess'

const PrivateRoute = ({ element }) => {
  const token =
    localStorage.getItem('token') || sessionStorage.getItem('token');
  return token ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/verify-otp" element={<OTPVerification />} />
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/new-password" element={<NewPassword />} />
      <Route element={<PrivateRoute element={<Layout />} />}>
        <Route path="/home" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/change-password" element={<UpdatePassword />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/delete-account" element={<DeleteAccount />} />
        <Route path="/users" element={<Users />} />
        <Route path="/create-folder" element={<CreateFolder />} />  
        <Route path="/user-access" element={<UserAccess />} />
      </Route>
    </Routes>
  );
};

export default App;
