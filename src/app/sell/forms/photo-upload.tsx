"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useAuthStore } from "@/components/stores/auth-store";
import { useListingForms } from "@/hooks/use-listing-forms";
import axios, { AxiosError } from "axios";
import { ChangeEvent, startTransition, useEffect, useRef, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { toast } from "sonner";
import { postWithAuth } from "@/lib/post-with-auth";

type PhotoUploadProps = {
    maxImages?: number;
    existingImages?: { url: string; isPrimary: boolean; id: string }[];
};

type ImageData = {
    preview: string;
    file?: File;
    isPrimary: boolean;
    isExisting?: boolean;
    id?: string; // only for existing
};

const PhotoUploads = ({ maxImages = 5, existingImages = [] }: PhotoUploadProps) => {
    const [images, setImages] = useState<ImageData[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const listingId = useListingForms(state => state.listingId);
    const showImageUpload = useListingForms(state => state.showImageUpload);
    const setShowImageUpload = useListingForms(state => state.setShowImageUpload);
    const token = useAuthStore.getState().token?.access_token

    useEffect(() => {
        if (!existingImages?.length) return;

        const loaded = existingImages.map(img => ({
            preview: img.url,
            isPrimary: img.isPrimary,
            isExisting: true,
            id: img.id,
        }));

        setImages(prev => {
            const same =
                prev.length === loaded.length &&
                prev.every((img, idx) =>
                    img.preview === loaded[idx].preview &&
                    img.isPrimary === loaded[idx].isPrimary &&
                    img.id === loaded[idx].id &&
                    img.isExisting === loaded[idx].isExisting
                );
            return same ? prev : loaded;
        });
    }, [existingImages]);



    if (!showImageUpload) return null;

    const updatePrimaryImage = async (newPrimaryId: string) => {
        try {
            const res = await axios.patch(
                `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/listings/${listingId}/images/${newPrimaryId}/make-primary`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.status === 200) {
                toast.success("Primary image updated");
            } else {
                toast.error("Failed to update primary image");
            }
        } catch (err) {
            toast.error("Failed to update primary image");
            console.error("Update primary error:", err);
        }
    };


    const fileToDataUrl = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const handleImageSelection = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const files = Array.from(e.target.files);

        if (images.length + files.length > maxImages) {
            toast.warning(`You can only upload up to ${maxImages} images`);
            return;
        }

        try {
            const newImages = await Promise.all(
                files.map(async (file, i) => ({
                    file,
                    preview: await fileToDataUrl(file),
                    isPrimary: images.length === 0 && i === 0,// First image becomes primary by default
                }))
            );

            setImages(prev => [...prev, ...newImages]);
        } catch (error) {
            console.error("Error creating previews:", error);
            alert("Failed to process selected images");
        }

        e.target.value = '';
    };

    const removeImage = async (index: number) => {
        const image = images[index];
        if (image.isExisting && image.id) {
            try {
                const res = await axios.delete(
                    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/listings/images/${image.id}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                if (res.status === 204) {
                    toast.success("Image deleted!")
                }
            } catch (err) {
                console.log(err)
                toast.error("Failed to delete image");
                return;
            }
        }
        const newImages = images.filter((_, i) => i !== index);
        // If we're removing the primary image and there are other images left,
        // make the first remaining image primary
        if (image.isPrimary && newImages.length > 0) {
            newImages[0].isPrimary = true;
        }
        setImages(newImages);
    };

    const setPrimaryImage = (index: number) => {
        setImages(prev =>
            prev.map((img, i) => ({
                ...img,
                isPrimary: i === index
            }))
        );
    };


    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const uploadImages = async() => {
        const newUploads = images.filter(img => !img.isExisting && img.file);
        const existingPrimary = existingImages?.find(img => img.isPrimary)?.id;
        const newPrimary = images.find(img => img.isPrimary && img.isExisting)?.id;

        if (!newUploads.length && existingPrimary !== newPrimary && newPrimary) {
            await updatePrimaryImage(newPrimary);
            setTimeout(() => setShowImageUpload(false, ""), 500);
            return
        }

        if (!newUploads.length) return;

        const formData = new FormData();
        newUploads.forEach(image => {
            formData.append("files", image.file!);
            formData.append("is_primary_flags", image.isPrimary.toString());
        });

        startTransition(async () => {
            try {
                const res = await postWithAuth(`/listings/${listingId}/images`, formData);
                if (res.status === 200)
                    toast.success("Image upload Succeeded.");
                else toast.error("Failed image upload!");
                setImages([]);
                setTimeout(() => setShowImageUpload(false, ""), 500);
            } catch (err) {
                const e = err as AxiosError;
                console.error("error image upload:", e);
                if (e.response?.status === 401) {
                    toast.error("Authentication Failed! Please try logging in again.");
                } else if (e.response?.status && e.response.status >= 400 && e.response.status < 500) {
                    toast.error("Bad Request! Please try again.");
                } else if (e.response?.status && e.response.status >= 500) {
                    toast.error("Something went wrong!");
                }

            }
        });
    };

    return (
        <div className='fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4'>
            <div className='w-full max-w-3xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-white rounded-2xl'>
                <div className='flex flex-col sm:flex-row w-full shadow-lg rounded-xl bg-green-400'>
                    <Card id='listing-car-detail' className="w-full outline-none border-none shadow-none relative">
                        <IoCloseCircleOutline className="absolute -top-1 -right-8 text-neutral-400 text-2xl hover:cursor-pointer hover:text-neutral-800" onClick={() => setShowImageUpload(false, "")} />
                        <CardHeader>
                            <div className="flex space-x-2">
                                <Badge>Upload Photos</Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="">
                                <div className="flex flex-wrap gap-3">
                                    {/* Display uploaded thumbnails */}
                                    {images.map((image, index) => (
                                        <div key={index} className="relative w-30 h-30 rounded-md overflow-hidden group">
                                            <img
                                                src={image.preview}
                                                alt={`Preview ${index}`}
                                                className="w-full h-full object-cover"
                                            />

                                            {/* Primary star indicator */}
                                            <button
                                                onClick={() => setPrimaryImage(index)}
                                                className={`absolute top-1 left-1 p-1 rounded-full ${image.isPrimary ? 'bg-yellow-400 text-yellow-800' : 'bg-white bg-opacity-70 text-gray-500 hover:bg-opacity-100'}`}
                                                aria-label={image.isPrimary ? "Primary image" : "Set as primary"}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-4 w-4"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            </button>

                                            {/* Remove button */}
                                            <button
                                                onClick={() => removeImage(index)}
                                                className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-opacity-70 transition opacity-0 group-hover:opacity-100"
                                            >
                                                ×
                                            </button>

                                            {/* Primary image badge */}
                                            {image.isPrimary && (
                                                <div className="absolute bottom-1 left-1 right-1 bg-black bg-opacity-50 text-white text-xs text-center py-0.5 rounded">
                                                    Primary
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                    {/* Display placeholder if we haven't reached max */}
                                    {images.length < maxImages && (
                                        <div
                                            className="w-30 h-30 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition"
                                            onClick={triggerFileInput}
                                        >
                                            <div className="text-2xl text-gray-500">+</div>
                                            <div className="text-xs text-gray-500 mt-1">Add Image</div>
                                        </div>
                                    )}
                                </div>

                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageSelection}
                                    accept="image/*"
                                    multiple
                                    className="hidden"
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex-col gap-2">
                            <Button className="w-full" disabled={!images.length} onClick={uploadImages}>
                                Submit
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default PhotoUploads;