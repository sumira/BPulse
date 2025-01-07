"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full h-20 bg-gradient-to-r from-slate-900 to-slate-800 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 text-transparent bg-clip-text hover:scale-105 transition-transform"
          >
            BPulse
          </Link>

          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Dashboard
            </Link>
            {/* <Link
              href="/historical-data"
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Historical Data
            </Link> */}
            <Link
              href="/allerts"
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Alerts
            </Link>
            <Link
              href="/guide"
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              User Guide
            </Link>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200">
              Login
            </Button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-slate-800 p-4 space-y-4">
            <Link
              href="/"
              className="block text-gray-300 hover:text-white transition-colors duration-200"
            >
              Dashboard
            </Link>
            {/* <Link
              href="/historical-data"
              className="block text-gray-300 hover:text-white transition-colors duration-200"
            >
              Historical Data
            </Link> */}
            <Link
              href="/allerts"
              className="block text-gray-300 hover:text-white transition-colors duration-200"
            >
              Alerts
            </Link>
            <Link
              href="/guide"
              className="block text-gray-300 hover:text-white transition-colors duration-200"
            >
              User Guide
            </Link>
            <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200">
              Login
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
