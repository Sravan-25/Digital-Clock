import React from 'react';

const CustomScrollContainer = ({
  children,
  height = '500px',
  className = '',
}) => {
  return (
    <div className={`custom-scroll-container ${className}`} style={{ height }}>
      {children}
      <style jsx>{`
        .custom-scroll-container {
          overflow-y: auto;
        }
        .custom-scroll-container::-webkit-scrollbar {
          width: 10px;
        }
        .custom-scroll-container::-webkit-scrollbar-track {
          background: #e5e7eb;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          margin: 4px 0;
        }
        .custom-scroll-container::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #002d62, #004080);
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          border: 1px solid #001f47;
        }
        .custom-scroll-container::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #001f47, #003366);
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
        }
        /* For Firefox */
        .custom-scroll-container {
          scrollbar-width: thin;
          scrollbar-color: #002d62 #e5e7eb;
        }
      `}</style>
    </div>
  );
};

export default CustomScrollContainer;
