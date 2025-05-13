import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import access from '../../assets/access.png';
import account from '../../assets/account.png';
import home from '../../assets/home.png';
import users from '../../assets/users.png';
import logoutIcon from '../../assets/logout.png';

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [hoveredLink, setHoveredLink] = useState(null);

  const links = [
    { path: '/home', label: 'Home', icon: home },
    { path: '/shared-access', label: 'Shared Access', icon: access },
    { path: '/users', label: 'Users', icon: users },
    { path: '/account', label: 'Account', icon: account },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="fixed top-21 left-0 w-64 h-[calc(100vh-5rem)] bg-[#1a2a44] p-6 z-10 shadow-sm">
      <div className="flex flex-col h-full">
        <ul className="flex flex-col gap-10 m-0 p-0 list-none flex-1">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            const isHovered = hoveredLink === link.path && !isActive;

            return (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`flex items-center text-lg py-3 px-4 rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'bg-white text-[#002D62] font-medium shadow-sm'
                      : isHovered
                      ? 'bg-[#2a3b57] text-white'
                      : 'bg-transparent text-white'
                  }`}
                  onMouseEnter={() => !isActive && setHoveredLink(link.path)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <img
                    src={link.icon}
                    alt={link.label}
                    className={`w-6 h-6 mr-3 transition-all duration-300 ${
                      isHovered || isActive ? 'opacity-100' : 'opacity-80'
                    }`}
                  />
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className={`flex items-center text-lg py-3 px-4 rounded-lg transition-all duration-300 w-full text-left ${
              hoveredLink === 'logout'
                ? 'bg-red-50 text-red-600'
                : 'bg-transparent text-white'
            }`}
            onMouseEnter={() => setHoveredLink('logout')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <img
              src={logoutIcon}
              alt="Logout"
              className={`w-6 h-6 mr-3 transition-all duration-300 ${
                hoveredLink === 'logout' ? 'opacity-100' : 'opacity-80'
              }`}
            />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
