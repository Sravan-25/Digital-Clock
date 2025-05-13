import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { authService } from '../../api/api.service';
import InputField from '../../components/inputsFields/InputField';
import back from '../../assets/back.png';
import editIcon from '../../assets/editIcon.png';
import profileIcon from '../../assets/user.png';

function UpdateProfile() {
  const [name, setName] = useState('Jackson');
  const [phone, setPhone] = useState('');
  const [deviceName, setDeviceName] = useState('');
  const [publicIp, setPublicIp] = useState('');
  const [passkey, setPasskey] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { state } = useLocation();
  const email = state?.email || 'useremail@email.com';
  const [userName, setUserName] = useState('User');
  const [userEmail, setUserEmail] = useState('User');

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('Edit Profile');
  };

  const handleEdit = () => {
    setIsEditing(true);
    setError('');
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
      <div className="w-full px-10 pt-6 pb-10 bg-white rounded-lg shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <Link
            to="/account"
            className="flex items-center text-[#002D62] hover:underline"
          >
            <img src={back} alt="Back to Account" className="w-5 h-5 mr-2" />
          </Link>
          <h1 className="text-2xl font-bold text-[#002D62]">Edit Profile</h1>
        </div>

        {/* Profile Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={profileIcon}
                alt="User"
                className="w-12 h-12 rounded-full object-cover"
              />
              <button
                onClick={handleEdit}
                disabled={isEditing}
                className={`absolute -bottom-1 -right-1 p-1 rounded-full transition ${
                  isEditing
                    ? 'bg-[#002D62] text-white opacity-50 cursor-not-allowed'
                    : 'bg-[#002D62] text-white hover:bg-[#001f47]'
                }`}
              >
                <img src={editIcon} alt="Edit" className="w-4 h-4" />
              </button>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#002D62]">{userName}</h1>
              <p className="text-gray-600 text-sm mt-1">{userEmail}</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-8">
            {error}
          </div>
        )}

        <form onSubmit={handleUpdateProfile}>
          <div className="mb-4">
            <InputField
              type="text"
              placeholder="Name"
              value={userName}
              onChange={(e) => setName(e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div className="mb-4">
            <InputField
              type="tel"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div className="mb-4">
            <InputField
              type="text"
              placeholder="Device Name"
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div className="mb-4">
            <InputField
              type="text"
              placeholder="Public IP"
              value={publicIp}
              onChange={(e) => setPublicIp(e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div className="mb-8">
            <InputField
              type="text"
              placeholder="Pass Key"
              value={passkey}
              onChange={(e) => setPasskey(e.target.value)}
              disabled={!isEditing}
            />
          </div>

          <div className="flex justify-end gap-6 mr-4">
            <button
              type="submit"
              disabled={!isEditing || loading}
              className={`px-8 py-3 rounded-full text-base transition ${
                !isEditing || loading
                  ? 'bg-[#002D62] text-white opacity-50 cursor-not-allowed'
                  : 'bg-[#002D62] text-white hover:bg-[#001f47]'
              }`}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;
