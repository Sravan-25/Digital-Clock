import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MainButton } from '../../components/buttons/buttons';
import useFetchFolders from '../../hooks/folders/useFetchFolders';
import FolderSvgs from '../../data/folders/FolderSvgs';
import threeDotsIcon from '../../assets/three-dots.png';
import FolderMenu from '../../components/settingsMenus/admin/FolderMenu';

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const { folders, loading, error, refreshFolders } = useFetchFolders();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [menuPosition, setMenuPosition] = useState(null);
  const containerRef = useRef(null);
  const [visibleRatios, setVisibleRatios] = useState({});

  const handleNavigate = (path) => {
    navigate(path, { state: { fromHome: true } });
  };

  const handleFolderMenu = (folder, e) => {
    e.stopPropagation();
    if (!folder?._id) {
      console.error('Folder missing _id:', folder);
      return;
    }
    setSelectedFolder(folder);
    const rect = e.currentTarget.getBoundingClientRect();
    setMenuPosition({
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
    });
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setSelectedFolder(null);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const updated = {};
        entries.forEach((entry) => {
          updated[entry.target.dataset.id] = entry.intersectionRatio;
        });
        setVisibleRatios((prev) => ({ ...prev, ...updated }));
      },
      {
        root: containerRef.current,
        threshold: Array.from({ length: 11 }, (_, i) => i / 10),
      }
    );

    const cards = containerRef.current?.querySelectorAll('.folder-card');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [folders]);

  useEffect(() => {
    if (location.state?.fromCreateFolder || location.state?.fromHome) {
      console.log('Refreshing folders due to navigation');
      refreshFolders();
    }
  }, [location, refreshFolders]);

  if (loading) return <div className="text-gray-600">Loading folders...</div>;

  return (
    <div className="flex h-full bg-white overflow-y-auto" ref={containerRef}>
      <div className="flex-1 px-6 pt-6 max-w-7xl mx-auto">
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-6 flex justify-between items-center">
            <span>Error: {error}</span>
            <button
              onClick={() => refreshFolders()}
              className="text-red-700 hover:text-red-900"
            >
              Retry
            </button>
          </div>
        )}

        <div className="flex justify-end mb-6">
          <MainButton onClick={() => handleNavigate('/create-folder')}>
            + New Folder
          </MainButton>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">
            Total Folders: {folders.length}
          </h2>
          <nav className="text-sm text-gray-600">
            <span className="font-medium">Home</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 m-2">
          {folders.map((folder) => {
            const ratio = visibleRatios[folder._id] ?? 1;
            const opacity = Math.max(0.2, ratio);
            const fileCount =
              (folder.documents?.length || 0) + (folder.images?.length || 0);

            return (
              <div
                key={folder._id}
                className="flex flex-col folder-card shadow-md mt-2 rounded-lg p-4 bg-gray-100 cursor-pointer hover:shadow-lg transition-shadow duration-300"
                data-id={folder._id}
                style={{ opacity, transition: 'opacity 0.3s ease' }}
                onClick={() => navigate(`/folder/${folder._id}`)}
              >
                <div className="flex justify-center p-6">
                  <FolderSvgs
                    folderName={folder.folderName}
                    width={200}
                    height={150}
                  />
                </div>
                <div className="flex justify-between items-end w-full mt-4">
                  <div className="flex flex-col">
                    <h3 className="font-medium text-gray-900 text-sm truncate max-w-[120px]">
                      {folder.folderName}
                    </h3>
                    <p className="text-xs text-gray-600 mt-1">
                      {fileCount} files
                    </p>
                  </div>
                  <button
                    className="p-1 hover:bg-gray-200 rounded"
                    onClick={(e) => handleFolderMenu(folder, e)}
                  >
                    <img src={threeDotsIcon} alt="Menu" className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {isMenuOpen && (
          <FolderMenu
            isOpen={isMenuOpen}
            onClose={closeMenu}
            triggerPosition={menuPosition}
            fileData={selectedFolder}
            onSuccess={refreshFolders}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
