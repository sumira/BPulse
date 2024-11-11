import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-white text-2xl font-bold">Bpulse</div>

        {/* Menu Items */}
        <div className="hidden md:flex space-x-4 font-mono gap-1">
            <Link to="/" className="text-white hover:text-gray-300">Home</Link>
            <Link to="/historical-data" className="text-white hover:text-gray-300">Historical Data</Link>
            <Link to="/notifications" className="text-white hover:text-gray-300">Notifications</Link>
            <Link to="/settings" className="text-white hover:text-gray-300">Settings</Link>
            <Link to="/technical-support" className="text-white hover:text-gray-300">Technical-Support</Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu Items */}
      {isOpen && (
        <div className="md:hidden mt-2 space-y-2 text-center font-mono ">
            <Link to="/" className="text-white hover:text-gray-300 mx-2">Home</Link>
            <Link to="/historical-data" className="text-white hover:text-gray- mx-2">Historical Data</Link>
            <Link to="/notifications" className="text-white hover:text-gray- mx-2">Notifications</Link>
            <Link to="/settings" className="text-white hover:text-gray- mx-2">Settings</Link>
            <Link to="/technical-support" className="text-white hover:text-gray- mx-2">Technical Support</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
