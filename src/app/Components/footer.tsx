import React from "react";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { MdMail, MdPhone } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        {/* Copyright */}
        <div className="display-flex">
          <div className="border-t border-gray-700 pt-4 text-center">
            <p className="text-gray-300 text-sm">
              © {new Date().getFullYear()} BPulse. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-4 justify-center md:justify-start">
            <FaFacebook className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer" />
            <FaTwitter className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer" />
            <FaLinkedin className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer" />
            <FaInstagram className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
