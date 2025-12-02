
import {Menu, X} from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';

const Navbar = () => {
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false); 

    const toggleNavbar = () => {
        setMobileDrawerOpen(!mobileDrawerOpen);
    };

    const navItems = [
        { label: "Home", href: "/" },
        { label: "Projects", href: "/projects" },
        { label: "Certifications", href: "/certifications" },
        { label: "Skills", href: "/skills" },
        { label: "Blog", href: "/blog" },
    ];

    return (
        <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
            <div className="container px-4 mx-auto relative text-sm">
                <div className="flex flex-col items-center justify-center">
                    <div className="flex items-center flex-shrink-0 mb-2">
                        <img className="h-12 w-12 rounded-full border-4 border-gray-300 shadow-lg" src={logo} alt="Logo" />
                    </div>
                    <div className="w-full flex justify-center">
                        <ul className="flex justify-center space-x-12">
                            {navItems.map((item, index) => (
                                <li key={index}>
                                    <Link 
                                        to={item.href}
                                        className="text-[#8248bc] hover:text-[#f5a623] transition duration-300 text-lg"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;