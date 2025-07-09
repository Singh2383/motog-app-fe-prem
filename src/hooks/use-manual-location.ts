import { create } from "zustand";

interface ManualLocationStore {
    show: boolean;
    setShow: (b: boolean) => void;
}

const useManualLocation = create<ManualLocationStore>(set => (
    {
        show: false,
        setShow: (b) => set({ show: b }),
    }
));

export default useManualLocation;
