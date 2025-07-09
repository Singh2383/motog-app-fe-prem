'use client'

import React from 'react';
import { VscAccount } from "react-icons/vsc";
import { useAuthStore } from '../../../components/stores/auth-store';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { AccountMenu } from './account-menu';
import { AccountAccordion } from './account-accordion';

const LoginBtn = () => {
    const router = useRouter();
    const path = usePathname();
    const token = useAuthStore(state => state.token);

    if (token) {
        return (
            <>
                <div className='hidden md:block'>
                    <AccountMenu userName={'Hi'} />
                </div>
                <div className='md:hidden'>
                    <AccountAccordion userName={'Hi'} />
                </div>
            </>

        )
    }

    return (
        <Button variant={'ghost'} className=' hover:cursor-pointer flex items-center space-x-2' onClick={() => router.replace(`${path}?auth-state=login`)}>
            <VscAccount className='text-lg' />
            Login / Register
        </Button>
    )
}

export default LoginBtn;
