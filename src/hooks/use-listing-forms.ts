import { create } from "zustand";

type ListingFormStore = {
    reg_no: string;
    showForm: boolean;
    setShowForm: (b: boolean, reg_no: string) => void;
    listingId: string;
    showImageUpload: boolean;
    setShowImageUpload: (b: boolean, id: string) => void;
}

export const useListingForms = create<ListingFormStore>(set => ({
    reg_no: "",
    showForm: false,
    setShowForm: (b, reg_no) => set(prev => ({ ...prev, showForm: b, reg_no })),
    listingId: "",
    showImageUpload: false,
    setShowImageUpload: (b, id) => set(prev => ({ ...prev, showImageUpload: b, listingId: id })),
}));
