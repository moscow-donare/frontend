"use client";

import React, { useState } from 'react';
import { Heart, Menu, X, LogIn, Plus, Search } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Heart className="h-8 w-8 text-teal-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">Donaré</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar campañas"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <Link href="/how-it-works" className="text-gray-600 hover:text-teal-600 px-3 py-2 rounded-md font-medium transition-colors">
              Cómo funciona
            </Link>
            <Link href="/campaigns/create" className="bg-teal-600 text-white hover:bg-teal-700 px-4 py-2 rounded-md font-medium flex items-center transition-colors">
              <Plus className="h-4 w-4 mr-1" /> Crear Campaña
            </Link>
            <Link href={"/login"} className="bg-purple-600 text-white hover:bg-purple-700 px-4 py-2 rounded-md font-medium flex items-center transition-colors">
              <LogIn className="h-4 w-4 mr-1" /> Iniciar Sesión
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <div className="relative mx-2 my-2">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar campañas"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <Link 
              href="/how-it-works"
              className="text-gray-600 hover:text-teal-600 block px-3 py-2 rounded-md font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Cómo funciona
            </Link>
            <Link 
              href="/create"
              className="bg-teal-600 text-white hover:bg-teal-700 block px-3 py-2 rounded-md font-medium flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <Plus className="h-4 w-4 mr-1" /> Crear Campaña
            </Link>
            <button className="w-full bg-purple-600 text-white hover:bg-purple-700 block px-3 py-2 rounded-md font-medium flex items-center">
              <LogIn className="h-4 w-4 mr-1" /> Iniciar Sesión
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;