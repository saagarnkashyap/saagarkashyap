import {Menu, X} from 'lucide-react';
import React, { useState } from 'react';
import logo from '../assets/logo.jpg';
import { navItems } from "../constants/index.jsx";

const Navbar = () => {
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false); 
    
    const toggleNavbar = () => {
        setMobileDrawerOpen(!mobileDrawerOpen);
    }

    const handleNavClick = (e, targetId) => {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
            // Close mobile menu if open
            if (mobileDrawerOpen) {
                setMobileDrawerOpen(false);
            }
            
            // Smooth scroll to the element
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
        <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
            <div className="container px-4 mx-auto relative text-sm">
                <div className="flex justify-between items-center">
                    <div className="flex items-center flex-shrink-0">
                        <img className="h-12 w-12 mr-2 rounded-full border-4 border-gray-300 shadow-lg" src={logo} alt="Logo" />
                    </div>
                    <div className="ml-auto">
                        <ul className="hidden lg:flex space-x-12">
                            {navItems.map((item, index) => (
                                <li key={index}>
                                    <a 
                                        href={`#${item.id}`} 
                                        className="text-[#8248bc] hover:text-[#f5a623] transition duration-300"
                                        onClick={(e) => handleNavClick(e, item.id)}
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="lg:hidden md-flex flex-col justify-end">
                        <button onClick={toggleNavbar}>
                            {mobileDrawerOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
                {mobileDrawerOpen && (
                    <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
                        <ul>
                            {navItems.map((item, index) => (
                                <li key={index} className="py-4">
                                    <a 
                                        href={`#${item.id}`} 
                                        className="text-white hover:text-[#f5a623] transition duration-300"
                                        onClick={(e) => handleNavClick(e, item.id)}
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;