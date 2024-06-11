'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

import { Header as HeaderType } from '../../../../payload/payload-types'
import { useAuth } from '../../../_providers/Auth'
import { CMSLink } from '../../Link'
import { useRouter } from 'next/navigation'

export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = header?.navItems || []
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user === null) {
      router.push('/login')
    }
  }, [user, router])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const closeMenu = () => {
    setIsMenuOpen(false);
  }

  return (
    <div className={`relative z-10 flex items-center justify-between p-2 bg-transparent`}>
      {/* Hamburger Menu Button */}
      {user && (
        <button
          onClick={toggleMenu}
          className="block md:hidden px-2 py-2  bg-white text-gray-900 focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      )}
      {user && (
        <>
          {/* Desktop Navigation */}
          <div className="hidden md:flex">
            {navItems.map(({ link }, i) => (
              <CMSLink key={i} {...link} className="text-lg text-white px-2 hover:text-purple-500" />
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className={`fixed top-0 left-0 w-full h-full bg-white transition-transform transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
            <div className="flex flex-col items-start p-4 space-y-2 w-full h-full border-t">
              {/* Close Button for Mobile Menu */}
              <button
                onClick={toggleMenu}
                className="block md:hidden px-2 py-1 text-gray-900 focus:outline-none self-end"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              {/* Navigation Links */}
              {navItems.map(({ link }, i) => (
                <div onClick={closeMenu} key={i} className="text-lg text-gray-700 px-4 py-2 w-full border-b hover:bg-gray-100">
                  <CMSLink 
                    {...link}  
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
