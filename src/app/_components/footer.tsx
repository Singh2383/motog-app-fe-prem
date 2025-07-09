import React from 'react';
import { FaFacebook } from "react-icons/fa";
import { TiSocialInstagram } from "react-icons/ti";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="container max-w-5/6 mx-auto space-y-8">
                {/* Top Links */}
                <div className="w-full mx-auto flex flex-col sm:flex-row flex-wrap justify-center sm:justify-between items-center gap-4 text-sm text-muted-foreground">
                    <Link href="/privacy-policy">Privacy Policy</Link>
                    <Link href="/terms-of-use">Terms of Use</Link>
                    <Link href={"/refund-policy"}>Refund Policy</Link>
                    <Link href="/about-us">About Us</Link>
                    <Link href="/contact-us">Contact Us</Link>
                    <Link href="/faqs">FAQs</Link>
                </div>

                {/* Bottom Section */}
                <div className="w-full mx-auto flex flex-col sm:flex-row justify-around items-center gap-4 text-xs sm:text-sm text-muted-foreground">
                    <p className="text-center sm:text-left">
                        © {new Date().getFullYear()} Wandcorp Private Limited. All rights reserved.
                    </p>
                    <div className="flex gap-3 justify-center">
                        <Link href="https://www.facebook.com/motogindia/" target='_blank'><FaFacebook className="text-2xl hover:text-white transition" /></Link>
                        <Link href="https://www.instagram.com/motog_india/" target='_blank'><TiSocialInstagram className="text-2xl hover:text-white transition" /></Link>
                        <Link href="https://www.linkedin.com/company/motog" target='_blank'><IoLogoLinkedin className="text-2xl hover:text-white transition" /></Link>
                        <Link href="https://x.com/MotoG_india" target='_blank'>
                            <div className="bg-muted-foreground p-1 rounded-full w-6 h-6 flex justify-center items-center hover:bg-white transition">
                                <FaXTwitter className="text-black text-xl" />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
