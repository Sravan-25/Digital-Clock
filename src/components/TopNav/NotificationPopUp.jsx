import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import notificationsData from '../../data/NotifyData';
import bellIcon from '../../assets/bell.png';

const NotificationPopup = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState(notificationsData);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // const response = await yourNotificationApi.getNotifications();
        // setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error.message);
      }
    };
    fetchNotifications();
  }, []);

  const clearNotifications = async () => {
    try {
      setNotifications([]);
    } catch (error) {
      console.error('Error clearing notifications:', error.message);
    }
  };

  if (!isOpen) return null;

  const popupContent = (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black bg-opacity-70 z-40"
        onClick={onClose}
        data-testid="notification-overlay"
      ></div>

      <div className="absolute top-16 right-8 w-96 bg-white rounded-xl shadow-2xl z-50 transform transition-all duration-300 scale-100 hover:scale-102">
        <div className="flex items-center justify-between p-5 border-b border-gray-200 rounded-t-xl">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center">
              <img
                src={bellIcon}
                alt="Notifications"
                className="w-4 h-4 opacity-80"
                onError={() =>
                  console.error('Failed to load bell icon in header')
                }
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Notifications
            </h3>
          </div>
          <button
            onClick={clearNotifications}
            className="text-sm text-[#002D62] hover:bg-[#002D62] hover:text-white px-3 py-1 rounded-md transition-all duration-200"
          >
            Clear All
          </button>
        </div>
        <div className="max-h-96 overflow-y-auto custom-scrollbar rounded-b-xl">
          {notifications.length === 0 ? (
            <p className="p-5 text-gray-500 text-center text-sm rounded-b-xl">
              No notifications
            </p>
          ) : (
            notifications.map((notification, index) => (
              <div
                key={notification.id}
                className={`flex items-start gap-4 p-5 border-b border-gray-200 ${
                  index === 0 && notification.isNew
                    ? 'bg-[#E9F0FA]'
                    : 'bg-white'
                } hover:bg-gray-100 transition-colors duration-200 ${
                  index === notifications.length - 1 ? 'rounded-b-xl' : ''
                }`}
              >
                <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center">
                  <img
                    src={bellIcon}
                    alt="Notification Icon"
                    className="w-5 h-5 opacity-60"
                    onError={() =>
                      console.error(
                        `Failed to load bell icon for notification ${notification.id}`
                      )
                    }
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">
                    {notification.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {notification.timestamp}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #002d62;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #001f47;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #002d62 #f1f1f1;
        }
      `}</style>
    </div>
  );

  return createPortal(popupContent, document.body);
};

export default NotificationPopup;
