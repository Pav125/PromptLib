import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white rounded-lg shadow-lg p-6 z-10">
        <h2 className="text-xl font-semibold mb-4">Confirm Sign Out</h2>
        <p className="mb-4">Are you sure you want to sign out?</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
