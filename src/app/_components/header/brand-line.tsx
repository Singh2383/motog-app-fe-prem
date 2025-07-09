"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Dispatch, FC, KeyboardEvent, SetStateAction, useState } from "react";
import LoginBtn from "./login-btn";
import { useRouter } from "next/navigation";
import DesktopSearchBar from "./desktop-search-bar";
import MobileSearchBar from "./mobile-search-bar";

type BrandLineProps = { isMenuOpen: boolean; setIsMenuOpen: Dispatch<SetStateAction<boolean>> }

const BrandLine: FC<BrandLineProps> = ({ isMenuOpen, setIsMenuOpen }) => {
    const router = useRouter();
    const [search, setSearch] = useState("");

    const handleSearch = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== "Enter" || !search) {
            return;
        }
        router.push(`/inventory?search_q=${search}`);
    }

    return (
        <div className="border-b">
            <div className="container mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
                <div className="flex items-center justify-between py-3 md:py-4">

                    <Link href={"/"} className='w-4/12 md:w-2/12 max-w-40'>
                        <Image alt='brand logo' width={500} height={175} src={"/images/brand_logo.svg"} className='overflow-hidden' />
                    </Link>

                    {/* Desktop Search Bar */}
                    <DesktopSearchBar handleSearch={handleSearch} search={search} setSearch={setSearch} />


                    {/* Desktop Login Button */}
                    <div className="hidden md:block">
                        <LoginBtn />
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Search Bar */}
                <MobileSearchBar handleSearch={handleSearch} search={search} setSearch={setSearch} />
            </div>
        </div >
    )
}

export default BrandLine;