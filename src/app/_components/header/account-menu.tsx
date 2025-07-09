// components/UserDropdown.tsx
'use client';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut, User, List, KeyRound, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/components/stores/auth-store';

export function AccountMenu({ userName }: { userName: string }) {
    const router = useRouter();
    const path = usePathname();
    const [open, setOpen] = useState(false);
    const setToken = useAuthStore(state => state.setToken);

    return (
        <DropdownMenu open={open} onOpenChange={setOpen} closeonclick=TRUE>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">{userName}</span>
                    <ChevronDown className={cn("", open && "hidden")} />
                    <ChevronUp className={cn("", !open && "hidden")} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/my-listings')}>
                    <List className="h-4 w-4 mr-2" />
                    My Listings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.replace(`${path}?auth-state=change-password`)}>
                    <KeyRound className="h-4 w-4 mr-2" />
                    Change Password
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setToken()}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
