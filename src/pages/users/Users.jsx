import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddUserModel from '../../components/cards/addUser';
import UserAccessMenu from '../../components/settingsMenus/admin/UserAcessMenu';
import useFetchUsers from '../../hooks/users/useFetchUsers';
import useCreateUser from '../../hooks/users/useCreateUsers';
import profileIcon from '../../assets/user.png';

function Users() {
  const navigate = useNavigate();
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [openUserAccessId, setOpenUserAccessId] = useState(null);
  const [activeTab, setActiveTab] = useState('my-users');
  const [triggerPositions, setTriggerPositions] = useState({});
  const { users, loading } = useFetchUsers();
  const { createUser } = useCreateUser();
  const buttonRefs = useRef({});

  const userAccessData = [
    { id: 1, name: 'Jerome Bell', email: 'usermail@mail.com', role: 'Admin' },
    {
      id: 2,
      name: 'Jacob Jones',
      email: 'usermail@mail.com',
      role: 'Read & Write',
    },
    {
      id: 3,
      name: 'Marvin McKinney',
      email: 'usermail@mail.com',
      role: 'Read Only',
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (openUserAccessId && buttonRefs.current[openUserAccessId]) {
        const button = buttonRefs.current[openUserAccessId];
        const rect = button.getBoundingClientRect();
        setTriggerPositions((prev) => ({
          ...prev,
          [openUserAccessId]: {
            x: rect.left,
            y: rect.top,
            width: rect.width,
            height: rect.height,
          },
        }));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [openUserAccessId]);

  const handleCardClick = (userId) => navigate('/home');
  const handleToggleAddUser = () => setIsAddUserOpen((prev) => !prev);
  const handleSaveUser = (formData) => {
    createUser(formData);
    setIsAddUserOpen(false);
  };

  const handleToggleUserAccess = (userId) => {
    const button = buttonRefs.current[userId];
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const position = {
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
    };

    setOpenUserAccessId((prev) => (prev === userId ? null : userId));
    setTriggerPositions((prev) => ({ ...prev, [userId]: position }));
  };

  const renderUserItem = (user, index, array) => (
    <div
      key={user.id}
      className={`flex items-center p-4 bg-white ${
        index !== array.length - 1 ? 'border-b border-gray-200' : ''
      }`}
    >
      <img
        src={profileIcon}
        alt="Profile"
        className="w-10 h-10 rounded-full mr-4"
      />
      <div className="flex-1">
        <div className="font-medium text-gray-900">{user.name}</div>
        <div className="text-gray-500 text-sm">{user.email}</div>
      </div>
      <div className="mr-4 bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
        {user.role}
      </div>
      <button
        ref={(el) => (buttonRefs.current[user.id] = el)}
        onClick={() => handleToggleUserAccess(user.id)}
        className="text-gray-500 hover:text-gray-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 12h.01M12 12h.01M19 12h.01"
          />
        </svg>
      </button>
      {openUserAccessId === user.id && (
        <UserAccessMenu
          isOpen={true}
          onClose={() => setOpenUserAccessId(null)}
          triggerPosition={
            triggerPositions[user.id] || { x: 0, y: 0, width: 32, height: 32 }
          }
          user={user}
          onDelete={() => {}}
          onEdit={() => {}}
        />
      )}
    </div>
  );

  const renderAccessCard = (user) => (
    <div
      key={user.id}
      onClick={() => handleCardClick(user.id)}
      className="w-64 h-50 bg-white rounded-xl shadow-lg border border-gray-400 cursor-pointer hover:shadow-md transition-all flex flex-col items-center justify-between p-4"
    >
      <div className="flex flex-col items-center">
        <img
          src={profileIcon}
          alt="Profile"
          className="w-17 h-17 rounded-full mb-3"
        />
        <h3 className="text-base font-semibold text-gray-900 text-center">
          {user.name}
        </h3>
        <p className="text-sm text-gray-500 text-center mt-1">{user.email}</p>
      </div>

      <div className="border-t w-full mt-3 pt-3 flex justify-between items-center">
        <span className="text-sm text-gray-600 font-medium">{user.role}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {activeTab === 'user-access' ? 'User Access' : 'Users'}
        </h1>
        {activeTab !== 'user-access' && (
          <button
            onClick={handleToggleAddUser}
            className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700"
          >
            + Add User
          </button>
        )}
      </div>

      <AddUserModel
        isOpen={isAddUserOpen}
        onSave={handleSaveUser}
        onCancel={() => setIsAddUserOpen(false)}
        title="Add User"
        confirmLabel="Save"
      />

      <div className="flex border-b border-gray-200 mb-6">
        {['my-users', 'user-access'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium ${
              activeTab === tab
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab === 'my-users' ? 'My Users' : 'User Access'}
          </button>
        ))}
      </div>

      {activeTab === 'my-users' ? (
        <>
          <div className="mb-4 text-gray-600">Total Users: {users.length}</div>
          <div className="space-y-0 border border-gray-200 rounded-lg overflow-hidden">
            {users.map(renderUserItem)}
          </div>
        </>
      ) : (
        <>
          <div className="mb-4 text-gray-600">
            Total User Access: {userAccessData.length}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {userAccessData.map(renderAccessCard)}
          </div>

        </>
      )}
    </div>
  );
}

export default Users;
