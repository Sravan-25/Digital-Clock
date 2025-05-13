import React from 'react';
import { Outlet } from 'react-router-dom';
import TopNav from './components/nav/TopNav';
import NavBar from './components/nav/SideNavBar';

const Layout = () => {
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      <div className="relative z-10">
        <TopNav className="fixed top-0 left-0 w-full bg-[#002D62] text-white shadow-md h-16" />
        <div className="flex flex-1 h-[calc(100vh-64px)]">
          <NavBar className="fixed top-16 left-0 w-64 h-[calc(100vh-64px)] bg-[#1a2a44] text-white shadow-md" />
          <main className="flex-1 ml-64 overflow-y-auto bg-white">
            <div className="min-h-full">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
