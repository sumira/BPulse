import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left justify-items-center">
          <div>
            <h3 className="text-xl font-bold mb ">BPulse</h3>
            <p className="text-gray-300">
              Optimized Battery Testing, Redefined
            </p>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="text-xl font-bold mb">Quick Links</h3>
            <ul className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/allerts"
                  className="text-gray-300 hover:text-white"
                >
                  Alerts
                </Link>
              </li>
              <li>
                <Link href="/guide" className="text-gray-300 hover:text-white">
                  User Guide
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb">Contact Us</h3>
            <p className="text-gray-300">Z Labs</p>
            <p className="text-gray-300">sumiragp@gmail.com</p>
            <p className="text-gray-300">+94 70 5 931 999</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
