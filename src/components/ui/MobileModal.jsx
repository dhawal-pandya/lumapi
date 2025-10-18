import React from 'react';

const MobileModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm mx-auto">
        <h2 className="text-2xl font-bold text-white mb-4">Best Experienced on Desktop</h2>
        <p className="text-gray-300 mb-6">
          This application is designed for a desktop viewing experience. For full functionality and the best layout, please switch to a larger screen.
        </p>
        <button
          onClick={onClose}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
        >
          Understood
        </button>
      </div>
    </div>
  );
};

export default MobileModal;
