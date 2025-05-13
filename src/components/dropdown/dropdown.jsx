import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { userPermissionOptions } from '../../data/DropDownData';
import downArrowIcon from '../../assets/downArrow.png';
import upArrowIcon from '../../assets/upArrow.png';

const Dropdown = ({ trigger, onSelect, position = 'below' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const containerRef = useRef(null);

  const handleOptionClick = (option) => {
    setSelectedValue(option.value);
    onSelect(option);
    setIsOpen(false);
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const calculatePosition = () => {
    if (!containerRef.current) return { top: '50%', left: '50%' };

    const rect = containerRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const dropdownWidth = rect.width;

    const top = rect.bottom + window.scrollY + 2;
    let left = rect.left + window.scrollX;

    if (left + dropdownWidth > viewportWidth - 20) {
      left = viewportWidth - dropdownWidth - 20;
    }

    return { top: `${top}px`, left: `${left}px` };
  };

  const dropdownPosition = calculatePosition();

  const selectedOption = userPermissionOptions.find(
    (option) => option.value === selectedValue
  );

  const defaultTrigger = (
    <div className="flex items-center w-full bg-gray-100 rounded-2xl px-4 py-3 relative cursor-pointer border border-gray-200">
      <div className="flex-1 text-gray-500">
        {selectedOption?.label || 'Select permission'}
      </div>
      <img
        src={isOpen ? upArrowIcon : downArrowIcon}
        alt="Arrow"
        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
      />
    </div>
  );

  const renderedOptions =
    userPermissionOptions.length > 0 ? (
      userPermissionOptions.map((option) => (
        <li
          key={option.value}
          className={`border-b last:border-b-0 border-gray-100 ${
            selectedValue === option.value ? 'bg-gray-100 rounded-lg' : ''
          }`}
        >
          <button
            onClick={() => handleOptionClick(option)}
            className="w-full text-left px-4 py-4 transition-colors duration-200 hover:bg-gray-100"
          >
            <div className="font-medium text-gray-900">{option.label}</div>
            {option.description && (
              <div className="text-sm text-gray-500">{option.description}</div>
            )}
          </button>
        </li>
      ))
    ) : (
      <li className="px-4 py-4 text-gray-500">No options available</li>
    );

  return (
    <div ref={containerRef} className="relative w-full">
      <div onClick={toggleDropdown}>
        {trigger
          ? typeof trigger === 'function'
            ? trigger({ isOpen })
            : trigger
          : defaultTrigger}
      </div>

      {isOpen &&
        createPortal(
          <div className="fixed inset-0 z-[60]">
            <div
              className="absolute inset-0 bg-transparent z-[50]"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
            />
            <div
              className="fixed bg-white rounded-2xl shadow-xl border border-gray-200 z-[60] transition-opacity duration-200 max-h-80 overflow-y-auto opacity-100"
              style={{
                top: dropdownPosition.top,
                left: dropdownPosition.left,
                width:
                  containerRef.current?.getBoundingClientRect().width ||
                  '200px',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <ul className="flex flex-col m-0 p-0 list-none">
                {renderedOptions}
              </ul>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default Dropdown;
