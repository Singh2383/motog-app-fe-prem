'use client';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { usePathname, useRouter } from 'next/navigation';
import { List, KeyRound, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/components/stores/auth-store';

export function AccountAccordion({ userName }: { userName: string }) {
    const router = useRouter();
    const path = usePathname();
    const setToken = useAuthStore(state => state.setToken);

    return (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="account">
                <AccordionTrigger className="flex items-center gap-2 text-left">
                    <div className='pl-4 flex space-x-4'>
                        <User className="h-4 w-4" />
                        <span>{userName}</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-2">
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-sm"
                        onClick={() => router.push('/my-listings')}
                    >
                        <List className="h-4 w-4 mr-2" />
                        My Listings
                    </Button>
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-sm"
                        onClick={() => router.replace(`${path}?auth-state=change-password`)}
                    >
                        <KeyRound className="h-4 w-4 mr-2" />
                        Change Password
                    </Button>
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-sm"
                        onClick={() => setToken()}
                    >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                    </Button>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
