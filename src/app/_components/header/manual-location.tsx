'use client';

import React, { startTransition, useEffect, useState } from 'react';
import useManualLocation from '@/hooks/use-manual-location';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import useLocation from '@/hooks/use-location';
import { toast } from 'sonner';
import { postWithoutAuth } from '@/lib/post-without-auth';
import { detectLocation } from '@/hooks/use-detect-location';
import { LocateIcon, MapPin, Loader2 } from 'lucide-react';

export interface ILocation {
    mainText: string;
    secondaryText: string;
    placeId?: string;
    country?: string;
};

interface ISuggestion {
    suggestions: ILocation[];
}

type GetSuggestionParam = {
    addrStr: string;
    sessionToken: string;
    latLng: string; //"28.5079920,77.2025578"
}

const ManualLocation = () => {
    const show = useManualLocation(state => state.show);
    const setShow = useManualLocation(state => state.setShow);
    const [input, setInput] = useState("");
    const [suggestions, setSuggestions] = useState<ILocation[]>([]);
    const [isDetecting, setIsDetecting] = useState(false)
    const { setLocality, geocode, sessionToken, setGeocode } = useLocation();

    useEffect(() => {
        if (!input.trim()) {
            setSuggestions([]);
            return;
        }

        const delay = setTimeout(() => {
            startTransition(async () => {
                try {
                    const { data } = await postWithoutAuth<GetSuggestionParam, ISuggestion>("loc-autocomplete",
                        { addrStr: input, latLng: `${geocode?.lat},${geocode?.lng}`, sessionToken });
                    console.log("autocomplete suggestions", data);
                    setSuggestions(data.suggestions ?? []);
                } catch (err) {
                    console.error("something wrong in fetching suggestions", err);
                    toast.error("Oops! Something wrong looking up!");
                }
            });
        }, 300); //debounce

        return () => clearTimeout(delay);
    }, [input, geocode, sessionToken]);

    // const handleDetectLocation = () => {
    //     detectLocation(setGeocode, setLocality);
    //     setShow(false);
    // };

    const handleDetectLocation = async () => {
        setIsDetecting(true);
        try {
            await detectLocation(setGeocode, setLocality);
            setShow(false);
        } catch (error) {
            console.error('Error detecting location:', error);
        } finally {
            setIsDetecting(false);
            setInput("")
        }
    };

    return (
        <Dialog open={show} onOpenChange={setShow}>
            <DialogContent className='max-w-md mx-4 p-0 gap-0 bg-white rounded-2xl shadow-2xl border-0' aria-describedby={'manual local entry dialog'}>
                <DialogHeader className='p-8 pb-6'>
                    <DialogTitle className='text-2xl font-bold text-gray-900 text-center leading-tight'>
                        We need your city to customize your experience
                    </DialogTitle>
                </DialogHeader>

                <div className='px-8 pb-8'>
                    {/* Search Input Section */}
                    <div className='relative mb-6'>
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder='Type your city, e.g. Imphal, New Delhi'
                            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-gray-900 placeholder-gray-500'
                            autoComplete="off"
                        />

                        {/* Suggestions Dropdown */}
                        {input && suggestions?.length > 0 && (
                            <div className='absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-10 max-h-60 overflow-y-auto'>
                                {suggestions.map(({ mainText, secondaryText, country }, i) => (
                                    <button
                                        key={`${i}_${mainText.split(" ").join("")}`}
                                        className='w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100 last:border-b-0 focus:bg-gray-50 focus:outline-none'
                                        onClick={() => {
                                            setLocality({ mainText, secondaryText, country });
                                            setShow(false);
                                            setInput("")
                                        }}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <MapPin size={16} className="text-gray-400 flex-shrink-0" />
                                            <div>
                                                <span className="font-medium text-gray-900">{mainText}</span>
                                                {secondaryText && (
                                                    <span className="text-gray-500 ml-2">
                                                        ({secondaryText.split(",")[0]})
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Detect Location Button */}
                    <div className="text-center">
                        <button
                            onClick={handleDetectLocation}
                            disabled={isDetecting}
                            className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 outline-none min-w-[160px]"
                        >
                            {isDetecting ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" />
                                    <span>Detecting...</span>
                                </>
                            ) : (
                                <>
                                    <LocateIcon size={20} />
                                    <span>Detect my location</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                <DialogDescription className='hidden'>
                    This is a hidden description for manual location input dialog.
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}

export default ManualLocation;
