import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../../components/buttons/buttons';
import InputField from '../../components/inputsFields/InputField';
import backIcon from '../../assets/back.png';
import AddUserModel from '../../components/cards/addUser';
import UserAccessMenu from '../../components/settingsMenus/admin/UserAcessMenu';
import useFolderForm from '../../hooks/folders/userAcees';

function CreateFolder() {
  const navigate = useNavigate();
  const {
    folderName,
    setFolderName,
    loading,
    error,
    handleCreateFolder,
    isAddUserOpen,
    handleToggleAddUser,
    handleSaveUser,
    openUserAccessId,
    triggerPositions,
    usersLoading,
    userList,
    handleDeleteUser,
    handleEditUser,
    handleToggleUserAccess,
    setOpenUserAccessId,
    buttonRefs,
  } = useFolderForm(navigate);

  return (
    <div className="relative flex flex-col min-h-screen bg-[#F8F9FA] px-6 pt-8">
      {/* Header & Folder Name */}
      <div className="w-full max-w-[500px] mb-8">
        <div className="flex items-center gap-2 mb-6">
          <Link to="/home" className="text-[#002D62]">
            <img src={backIcon} alt="Back" className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-[#002D62]">New Folder</h1>
        </div>

        <InputField
          placeholder="Folder Name"
          type="text"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          error={error.folderName}
          maxLength={100}
        />
      </div>

      {/* User Section */}
      <div className="w-full max-w-[500px]">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Added Users</h2>
            <p className="text-sm text-gray-500">
              These users can access this folder.
            </p>
          </div>
          <button
            onClick={handleToggleAddUser}
            className="bg-[#E9F0FA] text-[#002D62] text-sm font-medium px-4 py-1.5 rounded-full hover:bg-[#dbe6f4]"
          >
            + Add New
          </button>
        </div>

        {usersLoading ? (
          <p className="text-gray-500">Loading users...</p>
        ) : userList.length === 0 ? (
          <p className="text-gray-500">No users added yet.</p>
        ) : (
          <div className="space-y-4">
            {userList.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm"
              >
                <p className="text-gray-800 font-medium">{user.email}</p>

                <div className="flex items-center gap-2">
                  <div className="text-sm bg-gray-100 px-3 py-1 rounded text-gray-600">
                    {user.role}
                  </div>

                  <button
                    ref={(el) => (buttonRefs.current[user.id] = el)}
                    onClick={() => handleToggleUserAccess(user.id)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ⋮
                  </button>

                  <UserAccessMenu
                    isOpen={openUserAccessId === user.id}
                    onClose={() => setOpenUserAccessId(null)}
                    triggerPosition={triggerPositions[user.id]}
                    user={user}
                    onDelete={() => handleDeleteUser(user.id)}
                    onEdit={(updatedData) =>
                      handleEditUser(user.id, updatedData)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        <AddUserModel
          isOpen={isAddUserOpen}
          onCancel={handleToggleAddUser}
          onSave={handleSaveUser}
        />
      </div>

      {/* Save Button Fixed to Bottom Right */}
      <div className="fixed bottom-6 right-6">
        <PrimaryButton
          onClick={handleCreateFolder}
          loading={loading}
          className="px-8 py-3 rounded-full bg-[#002D62] hover:bg-[#003c92]"
        >
          Save
        </PrimaryButton>
      </div>
    </div>
  );
}

export default CreateFolder;
