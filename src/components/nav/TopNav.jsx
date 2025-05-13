import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../../api/api.service';
import NotificationPopup from '../TopNav/NotificationPopUp';
import UserPopup from '../TopNav/Profile';

import logoIcon from '../../assets/icon.png';
import bellIcon from '../../assets/notifications.png';
import userAvatar from '../../assets/user.png';
import searchIcon from '../../assets/search.png';

const TopNav = () => {
  const [userName, setUserName] = useState('User');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await authService.getProfile();
        if (response.success && response.data) {
          setUserName(response.data.name || 'Guest');
        } else {
          setUserName('Guest');
        }
      } catch (error) {
        console.error('Error fetching user:', error.message);
        setUserName('Guest');
      }
    };

    fetchUser();
  }, []);

  const toggleNotificationPopup = () => {
    setIsNotificationOpen((prev) => !prev);
    setIsUserPopupOpen(false); 
  };

  const toggleUserPopup = () => {
    setIsUserPopupOpen((prev) => !prev);
    setIsNotificationOpen(false);
  };

  return (
    <div className="bg-[#1a2a44] text-white flex items-center px-6 py-4 shadow-lg h-30 relative z-10">
      <div className="flex items-center gap-3 ml-8">
        <Link to="/home" className="flex items-center">
          <img
            src={logoIcon}
            alt="DOC IT Logo"
            className="w-[140px] h-[50px] hover:opacity-90 hover:scale-105 transition-all duration-300"
          />
        </Link>
      </div>

      <div className="flex-1 flex justify-center">
        <div className="w-1/2 relative">
          <img
            src={searchIcon}
            alt="Search"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-70"
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-2 pl-12 pr-4 rounded-full border-none bg-[#2a3b57] text-white text-lg outline-none focus:ring-2 focus:ring-[#002D62] shadow-sm transition-all duration-300"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 bg-[#2a3b57] px-4 py-2 rounded-full mr-8 relative">
        <img
          src={bellIcon}
          alt="Notifications"
          className="w-8 h-8 cursor-pointer hover:scale-110 hover:opacity-90 transition-all duration-300"
          onClick={toggleNotificationPopup}
        />
        <img
          src={userAvatar}
          alt="User Avatar"
          className="w-9 h-9 rounded-full cursor-pointer hover:scale-110 hover:opacity-90 transition-all duration-300"
          onClick={toggleUserPopup}
        />
        <span className="text-lg font-semibold">{userName}</span>

        <NotificationPopup
          isOpen={isNotificationOpen}
          onClose={() => setIsNotificationOpen(false)}
        />

        <UserPopup
          isOpen={isUserPopupOpen}
          onClose={() => setIsUserPopupOpen(false)}
        />
      </div>
    </div>
  );
};

export default TopNav;
