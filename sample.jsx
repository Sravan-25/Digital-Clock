import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../api/api.service';
import { RedButton, PrimaryButton } from '../../components/buttons/buttons';
import ModernPopupCard from '../../components/cards/popUpCard';

import profileIcon from '../../assets/user.png';
import notificationIcon from '../../assets/bell.png';
import privacyIcon from '../../assets/privacy.png';
import termsIcon from '../../assets/terms.png';
import aboutIcon from '../../assets/about.png';
import deleteIcon from '../../assets/delete.png';
import logoutIcon from '../../assets/logout.png';
import editIcon from '../../assets/editIcon.png';
import lockIcon from '../../assets/lock.png';

const Account = () => {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [userName, setUserName] = useState('User');
  const [userEmail, setUserEmail] = useState('User');
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const navigate = useNavigate();

  const links = [
    { label: 'Change Password', icon: lockIcon, path: '/change-password' },
    {
      label: 'Push Notifications',
      icon: notificationIcon,
      path: '/notifications',
    },
    { label: 'Privacy Policy', icon: privacyIcon, path: '/privacy-policy' },
    { label: 'Terms Of Use', icon: termsIcon, path: '/terms-of-use' },
    { label: 'About Us', icon: aboutIcon, path: '/about' },
    { label: 'Delete Account', icon: deleteIcon, path: '/delete-account' },
  ];

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

  const handleTogglePush = () => {
    setPushEnabled((prev) => !prev);
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

  return (
    <div className="flex h-full">
      <div className="flex-1 flex items-start justify-center bg-gray-100">
        <div className="w-full h-full px-10 pt-6 pb-10 bg-white rounded-lg shadow-sm">
          {/* Profile Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <img
                src={profileIcon}
                alt="User"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h1 className="text-3xl font-bold text-[#002D62]">
                  Hello, {userName}
                </h1>
                <p className="text-gray-600 text-sm mt-1">{userEmail}</p>
              </div>
            </div>
            <PrimaryButton
              onClick={() => navigate('/update-profile')}
              className="flex items-center gap-2 text-sm"
            >
              <img src={editIcon} alt="Edit" className="w-4 h-4" />
              Edit
            </PrimaryButton>
          </div>

          {/* Settings List */}
          <ul className="flex flex-col gap-4 m-0 p-0 list-none">
            {links.map((link) => {
              const isDelete = link.label === 'Delete Account';

              return (
                <li key={link.path}>
                  {link.label === 'Push Notifications' ? (
                    <div
                      className={`flex items-center justify-between px-4 py-3 rounded-lg border transition-all ${
                        isDelete
                          ? 'text-red-600 border-red-200 bg-red-50 hover:bg-red-100'
                          : 'text-[#002D62] border-gray-200 bg-white hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={link.icon}
                          alt={link.label}
                          className="w-5 h-5 opacity-80"
                        />
                        <span className="text-base">{link.label}</span>
                      </div>
                      <button
                        onClick={handleTogglePush}
                        className={`w-10 h-5 flex items-center rounded-full p-1 transition-all ${
                          pushEnabled ? 'bg-[#002D62]' : 'bg-gray-300'
                        }`}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-all ${
                            pushEnabled ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        ></div>
                      </button>
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      className={`flex items-center justify-between px-4 py-3 rounded-lg border transition-all ${
                        isDelete
                          ? 'text-red-600 border-red-200 bg-red-50 hover:bg-red-100'
                          : 'text-[#002D62] border-gray-200 bg-white hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={link.icon}
                          alt={link.label}
                          className="w-5 h-5 opacity-80"
                        />
                        <span className="text-base">{link.label}</span>
                      </div>
                    </Link>
                  )}
                </li>
              );
            })}

            {/* Logout */}
            <li>
              <RedButton
                onClick={handleLogout}
                className="w-full flex items-center justify-between px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={logoutIcon}
                    alt="Logout"
                    className="w-5 h-5 opacity-80"
                  />
                  <span className="text-base">Log Out</span>
                </div>
              </RedButton>
            </li>
          </ul>
        </div>
      </div>

      {/* Modern Popup for Logout Confirmation */}
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
};

export default Account;
