'use client';

import React, { useEffect } from 'react';
import { GoTriangleDown } from "react-icons/go";
import useDetectLocation from '@/hooks/use-detect-location';
import useManualLocation from '@/hooks/use-manual-location';
import useLocation from '@/hooks/use-location';
import { MapPin } from 'lucide-react';

const LocationPin = () => {
    const setShow = useManualLocation(state => state.setShow);
    useDetectLocation();
    const locality = useLocation(state => state.locality);
    const generateSessionToken = useLocation(state => state.generateSessionToken);

    useEffect(() => {
        generateSessionToken();
    }, [generateSessionToken]);

    return (
        <div className='flex space-x-1 items-center text-neutral-500 hover:cursor-pointer' onClick={() => setShow(true)}>
            <MapPin className='text-lg font-extrabold' />
            <span className=''>{locality?.mainText ?? 'Select Location'}</span>
            <GoTriangleDown />
        </div>
    )
}

export default LocationPin;
