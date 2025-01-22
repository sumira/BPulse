import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="display-flex">
          <div className="border-t border-gray-700 pt-4 text-center">
            <p className="text-gray-300 text-sm">
              © {new Date().getFullYear()} BPulse. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-4 justify-center md:justify-start">
            <a
              href="https://www.linkedin.com/in/sumira-pathirana/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <FaLinkedin className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer" />
            </a>
            <a
              href="https://github.com/sumira/BPulse"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <FaGithub className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
