import React from 'react';

const Switch = ({ isToggled, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out ${
        isToggled ? 'bg-primary' : 'bg-gray-600'
      }`}
    >
      <span
        className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out ${
          isToggled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
};

export default Switch;
