import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { authService } from '../../api/api.service';
import profileImage from '../../assets/user.png';
import profileIcon from '../../assets/profile.png';
import logoutIcon from '../../assets/logout.png';
import ModernPopupCard from '../cards/popUpCard';

const UserPopup = ({ isOpen, onClose }) => {
  const [userName, setUserName] = useState('User');
  const [userEmail, setUserEmail] = useState('example@gmail.com');
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const cancelLogout = () => {
    setIsLogoutModalOpen(false);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await authService.getProfile();
        if (response.success && response.data) {
          setUserName(response.data.name || 'Guest');
          setUserEmail(response.data.email || 'sample@gmail.com');
        } else {
          setUserName('Guest');
          setUserEmail('sample@gmail.com');
        }
      } catch (error) {
        console.error('Error fetching user:', error.message);
        setUserName('Guest');
        setUserEmail('sample@gmail.com');
      }
    };

    fetchUser();
  }, []);

  if (!isOpen) return null;

  const popupContent = (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black bg-opacity-70 z-40"
        onClick={onClose}
        data-testid="user-overlay"
      ></div>

      <div className="absolute top-16 right-8 w-96 bg-white rounded-xl shadow-2xl z-50 transform transition-all duration-300 scale-100 hover:scale-102">
        <div className="p-5">
          <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200">
            <img
              src={profileImage}
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <h4 className="text-base font-medium text-gray-900">
                {userName}
              </h4>
              <p className="text-sm text-gray-600 mt-1">{userEmail}</p>
            </div>
          </div>

          <Link
            to="/account"
            className="flex items-center gap-4 p-4 mt-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
            onClick={onClose}
          >
            <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center">
              <img
                src={profileIcon}
                alt="Profile Icon"
                className="w-5 h-5 opacity-60"
              />
            </div>
            <span className="text-sm font-medium text-gray-900">Profile</span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-4 p-4 mt-2 w-full bg-white rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
          >
            <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center">
              <img
                src={logoutIcon}
                alt="Logout Icon"
                className="w-5 h-5 opacity-60"
              />
            </div>
            <span className="text-sm font-medium  text-red-600">Log Out</span>
          </button>
        </div>
      </div>

      <ModernPopupCard
        isOpen={isLogoutModalOpen}
        title="Log Out"
        message="You are attempting to log out. Are you sure?"
        confirmLabel="Log Out"
        cancelLabel="Cancel"
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
    </div>
  );

  return createPortal(popupContent, document.body);
};

export default UserPopup;
