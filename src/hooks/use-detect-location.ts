"use client";

import { useEffect } from "react";
import useLocation from "./use-location";
import { toast } from "sonner";
import { postWithoutAuth } from "@/lib/post-without-auth";
import { ILocation } from "@/app/_components/header/manual-location";

type GeoCode = {
    lat: string;
    lng: string;
}

type Location = {
    mainText: string;
    state: string;
    country: string;
}

type Coords = {
    lat: number;
    lng: number;
}

let hasRequested = false;

export const detectLocation = async (setGeocode: (g: Coords) => void, setLocality: (l: ILocation) => void) => {
    if (!("geolocation" in navigator)) {
        console.warn("Geolocation not supported!");
        toast.warning("Geolocation is not supported by your browser.");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude } = position.coords;
            setGeocode({ lat: latitude, lng: longitude });
            try {
                const { data } = await postWithoutAuth<GeoCode, Location>("get-location",
                    { lat: `${latitude}`, lng: `${longitude}` });
                setLocality({ mainText: data.mainText, secondaryText: data.state, country: data.country });
                toast.success("Location detected successfully!");
            } catch (error) {
                console.error("Failed to fetch location data:", error);
                toast.error("Failed to fetch location data.");
            }
        },
        error => {
            console.warn("Location permission denied or failed:", error);
            toast.warning("Please allow location access for better experience.");
        },
        { timeout: 5000 }
    );
};

const useDetectLocation = () => {
    const { setGeocode, setLocality, locality, _hasHydrated } = useLocation();

    useEffect(() => {
        if (!_hasHydrated || locality) return;

        if (hasRequested) return;
        hasRequested = true;
        detectLocation(setGeocode, setLocality);
    }, [_hasHydrated, locality, setGeocode, setLocality]);
}

export default useDetectLocation;
