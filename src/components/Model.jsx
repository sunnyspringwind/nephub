import React, { useEffect } from 'react';

const Modal = ({ children, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0" 
        onClick={onClose}
        aria-label="Close modal"
      ></div>
      <div className="relative w-full max-w-3xl">
        {children}
      </div>
    </div>
  );
};

export default Modal;