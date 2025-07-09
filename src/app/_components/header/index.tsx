"use client";

import React, { useState } from 'react';
import Navbar from './navbar';
import BrandLine from './brand-line';
import ManualLocation from './manual-location';
import Login from '../login';
import Register from '../register';
import ForgotPassword from '../forgot-password';
import VerifyEmailBannerLine from './verify-email';
import ChangePassword from '../change-password';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 border-b shadow-sm z-50">
            <div className='bg-white'>
                <BrandLine isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                <Navbar isMenuOpen={isMenuOpen} setMenuOpen={setIsMenuOpen} />
            </div>
            <VerifyEmailBannerLine />
            <ManualLocation />
            <Login />
            <Register />
            <ForgotPassword />
            <ChangePassword />
        </header>
    );
};

export default Header;