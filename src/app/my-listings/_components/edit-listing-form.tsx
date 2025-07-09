'use client';

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { toast } from "sonner";
import { useAuthStore } from "@/components/stores/auth-store";
import { useListingForms } from "@/hooks/use-listing-forms";
import PhotoUploads from "@/app/sell/forms/photo-upload";
import { CarDto } from "@/hooks/use-cars";

type UpdateListingPayload = Partial<{
    kilometers_driven: number;
    price: number;
    city: string;
    seller_phone: string;
    description: string;
}>;

type ListingImage = {
    id: number;
    url: string;
    is_primary: boolean;
};

type ImageData = {
    preview: string;
    file?: File;
    isPrimary: boolean;
    isExisting?: boolean;
    id?: string;
    url: string;
};

type ExistingImage = {
    url: string;
    isPrimary: boolean;
    id: string;
};

export default function EditListingForm({ listing }: { listing: CarDto }) {
    const [formData, setFormData] = useState({
        reg_no: listing.reg_no,
        vehicle_type: listing.vehicle_type,
        kilometers_driven: listing.kilometers_driven,
        price: listing.price,
        city: listing.usr_inp_city,
        seller_phone: listing.seller_phone,
        description: listing.description,
        created_at: listing.created_at
    });

    const token = useAuthStore((s) => s.token);
    const setShowImageUpload = useListingForms(state => state.setShowImageUpload);
    const showImageUpload = useListingForms(state => state.showImageUpload);
    const uploadForId = useListingForms(state => state.listingId);

    const memoizedImages = useMemo((): ImageData[] => {
        return (listing.images as ListingImage[]).map((img) => ({
            url: img.url,
            preview: img.url,
            id: img.id.toString(), // convert number to string
            isPrimary: img.is_primary,
            isExisting: true,
        }));
    }, [listing.images]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Build an object of only changed fields
        const changedFields: UpdateListingPayload = {};
        if (formData.kilometers_driven !== listing.kilometers_driven) changedFields.kilometers_driven = formData.kilometers_driven;
        if (formData.price !== listing.price) changedFields.price = formData.price;
        if (formData.description !== (listing.description || '')) changedFields.description = formData.description;
        if (formData.city !== listing.usr_inp_city) changedFields.city = formData.city;
        if (formData.seller_phone !== listing.seller_phone) changedFields.seller_phone = formData.seller_phone

        if (Object.keys(changedFields).length === 0) {
            toast.info("No changes to update.");
            return;
        }

        try {
            await axios.put(
                `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/listings/${listing.id}`,
                changedFields,
                {
                    headers: {
                        Authorization: `Bearer ${token?.access_token}`,
                        'Content-Type': 'application/json',
                    }
                }
            );
            toast.success("Listing updated successfully!");
        } catch (err) {
            console.error("Update failed:", err);
            toast.error("Failed to update listing.");
        }
    };

    // const handleDeleteListing = async () => {
    //     const confirmDelete = window.confirm("Are you sure you want to delete this listing? This action cannot be undone.");

    //     if (!confirmDelete) return;

    //     try {
    //         await axios.delete(
    //             `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/listings/${listing.id}`,
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${token?.access_token}`,
    //                 },
    //             }
    //         );

    //         toast.success("Listing deleted successfully!");

    //         // Optional: Redirect to "My Listings" or another page
    //         window.location.href = "/my-listings";
    //     } catch (err) {
    //         console.error("Delete failed:", err);
    //         toast.error("Failed to delete listing.");
    //     }
    // };


    return (
        <div className="">
            <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-4 rounded-md mt-6 scroll-auto overflow-scroll">
                {/* <Input name="reg_no" value={formData.reg_no} onChange={handleChange} placeholder="RC Number" disabled />
                <Input name="vehicle_type" value={formData.vehicle_type} onChange={handleChange} placeholder="Vehicle Type" disabled />
                <Input name="kilometers_driven" type="number" value={formData.kilometers_driven} onChange={handleChange} placeholder="Kilometers Driven" />
                <Input name="city" value={formData.city} onChange={handleChange} placeholder="Place of listing (City)" />
                <Input name="seller_phone" type="number" value={formData.seller_phone} onChange={handleChange} placeholder="Seller Phone" />
                <Textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
                <Input name="created_at" value={formData.created_at} onChange={handleChange} placeholder="Listing Created on" disabled/> */}
                <div>
                    <div className="space-y-1">
                        <label htmlFor="reg_no" className="block text-sm font-medium text-gray-700">RC Number</label>
                        <Input id="reg_no" name="reg_no" value={formData.reg_no} onChange={handleChange} placeholder="RC Number" disabled />
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="vehicle_type" className="block text-sm font-medium text-gray-700">Vehicle Type</label>
                        <Input id="vehicle_type" name="vehicle_type" value={formData.vehicle_type} onChange={handleChange} placeholder="Vehicle Type" disabled />
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="kilometers_driven" className="block text-sm font-medium text-gray-700">Kilometers Driven</label>
                        <Input id="kilometers_driven" name="kilometers_driven" type="number" value={formData.kilometers_driven} onChange={handleChange} placeholder="Kilometers Driven" />
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">Place of Listing (City)</label>
                        <Input id="city" name="city" value={formData.city} onChange={handleChange} placeholder="Place of listing (City)" />
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="seller_phone" className="block text-sm font-medium text-gray-700">Seller Phone</label>
                        <Input maxLength={10} id="seller_phone" name="seller_phone" value={formData.seller_phone} onChange={handleChange} placeholder="Seller Phone" />
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <Textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="created_at" className="block text-sm font-medium text-gray-700">Listing Created On</label>
                        <Input id="created_at" name="created_at" value={formData.created_at} onChange={handleChange} placeholder="Listing Created on" disabled />
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Button type="submit">Save Changes</Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowImageUpload(true, String(listing.id))}
                    >
                        Update Images
                    </Button>
                </div>
            </form>

            {showImageUpload && uploadForId === String(listing.id) && (
                <PhotoUploads existingImages={memoizedImages as ExistingImage[]} />
            )}
        </div>
    );
}