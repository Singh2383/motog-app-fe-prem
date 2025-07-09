import { create } from "zustand";
import { ILocation } from "@/app/_components/header/manual-location";
import { v4 as uuidv4 } from "uuid";
import { persist } from "zustand/middleware";

type Coords = {
    lat: number;
    lng: number;
}

interface ILocationState {
    geocode?: Coords;
    locality?: ILocation;
    setLocality: (loc: ILocation) => void;
    setGeocode: (g?: Coords) => void;
    sessionToken: string;
    generateSessionToken: () => void;
    _hasHydrated: boolean;
    setHasHydrated: (state: boolean) => void;
}

const useLocation = create<ILocationState>()(persist(set => ({
    sessionToken: "",
    geocode: undefined,
    locality: undefined,
    setLocality: (loc) => set(prev => ({ ...prev, locality: loc })),
    setGeocode: (g) => set(prev => ({ ...prev, geocode: g })),
    generateSessionToken: () => set(prev => ({ ...prev, sessionToken: uuidv4() })),
    _hasHydrated: false,
    setHasHydrated: (state) => set({ _hasHydrated: state }),
}), {
    name: "user-location",
    onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
    }
}));

export default useLocation;
