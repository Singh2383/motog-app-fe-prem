'use client';

import React, { startTransition, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import useLocation from '@/hooks/use-location';
import { toast } from 'sonner';
import { postWithoutAuth } from '@/lib/post-without-auth';
import { ILocation } from '@/app/_components/header/manual-location';

interface ISuggestion {
    suggestions: ILocation[];
}

type GetSuggestionParam = {
    addrStr: string;
    sessionToken: string;
    latLng: string; //"28.5079920,77.2025578"
}

export const CityInput = ({ value, onChange }: { value: string, onChange: (value: string) => void }) => {
    const [suggestions, setSuggestions] = useState<ILocation[]>([]);
    const { sessionToken, geocode } = useLocation();

    useEffect(() => {
        if (!value.trim()) {
            setSuggestions([]);
            return;
        }

        const delay = setTimeout(() => {
            startTransition(async () => {
                try {
                    const { data } = await postWithoutAuth<GetSuggestionParam, ISuggestion>("loc-autocomplete",
                        { addrStr: value, latLng: `${geocode?.lat},${geocode?.lng}`, sessionToken });
                    setSuggestions(data.suggestions ?? []);
                } catch (err) {
                    console.error("something wrong in fetching suggestions", err);
                    toast.error("Oops! Something wrong looking up!");
                }
            });
        }, 300); //debounce

        return () => clearTimeout(delay);
    }, [value, geocode, sessionToken]);

    return (
        <div className='group relative'>
            <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder='Type your city, e.g. Jaipur, New Delhi' className='' />
            {value && suggestions?.length > 0 && (
                <div className='absolute py-2 shadow-2xl shadow-black rounded-xl w-full bg-white overflow-hidden z-10'>
                    {
                        suggestions.map(({ mainText, secondaryText }, i) => {
                            return (
                                <p key={`${i}_${mainText.split(" ").join("")}`}
                                    className='hover:bg-neutral-200 hover:cursor-pointer py-1 px-3 space-x-2'
                                    onClick={() => { onChange(mainText); setSuggestions([]); }}
                                >
                                    <span>{mainText}</span>
                                    {secondaryText && <span>({secondaryText.split(",")[0]})</span>}
                                </p>
                            );
                        })
                    }
                </div>
            )}
        </div>
    );
};