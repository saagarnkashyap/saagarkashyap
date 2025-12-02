import React, { useState } from 'react';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import { FiPhone } from 'react-icons/fi';

const Footer = () => {
  const [popup, setPopup] = useState({ visible: false, message: '', position: { top: 0, left: 0 } });

  const copyToClipboard = (text, event) => {
    navigator.clipboard.writeText(text);
    const rect = event.target.getBoundingClientRect();
    setPopup({
      visible: true,
      message: 'Copied!',
      position: { top: rect.top - 30, left: rect.left + rect.width / 2 },
    });
    setTimeout(() => setPopup({ visible: false, message: '', position: { top: 0, left: 0 } }), 2000); // Hide after 2 seconds
  };

  return (
    <footer className="text-white mt-4 py-6 relative">
      <div className="flex justify-center space-x-6 text-2xl">
        {/* Phone */}
        <button
          onClick={(e) => copyToClipboard('+919945372427', e)}
          aria-label="Copy Phone"
          className="hover:text-gray-400 transition-colors"
        >
          <FiPhone />
        </button>

        {/* Email */}
        <button
          onClick={(e) => copyToClipboard('saagarcourses@gmail.com', e)}
          aria-label="Copy Email"
          className="hover:text-gray-400 transition-colors"
        >
          <FaEnvelope />
        </button>

        {/* GitHub */}
        <a
          href="https://github.com/saagarnkashyap"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="hover:text-gray-400 transition-colors"
        >
          <FaGithub />
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/saagarkashyap/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="hover:text-gray-400 transition-colors"
        >
          <FaLinkedin />
        </a>
      </div>

      {/* Popup */}
      {popup.visible && (
        <div
          style={{
            position: 'fixed',
            top: popup.position.top,
            left: popup.position.left,
            transform: 'translate(-50%, -100%)',
            backgroundColor: 'black',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '5px',
            fontSize: '12px',
            whiteSpace: 'nowrap',
            zIndex: 1000,
          }}
        >
          {popup.message}
        </div>
      )}
    </footer>
  );
};

export default Footer;
