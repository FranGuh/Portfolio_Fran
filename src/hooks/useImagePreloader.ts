import { useState, useEffect } from "react";

export const useImagePreloader = (imageUrls: string[], storageKey: string = "imagesPreloaded") => {
    const [isLoading, setIsLoading] = useState<boolean>(() => {
        try {
            const isReady = sessionStorage.getItem(storageKey);
            return !isReady;
        } catch (error) {
            if (import.meta.env.DEV) {
                console.warn("sessionStorage no está disponible. El loader siempre se mostrará.", error);
            }
            return true;
        }
    });

    useEffect(() => {
        if (!isLoading) return;

        if(imageUrls.length === 0) {
            setIsLoading(false);
            return;
        }

        const loadImage = (url: string) => {
            return new Promise((resolve) => {
                const img = new Image();
                img.src = url;
                img.onload = () => resolve(url);
                img.onerror = () => resolve(url);
            });
        };

        Promise.all(imageUrls.map(loadImage)).then(() => {
            try {
                sessionStorage.setItem(storageKey, "true");
            } catch (error) {
                if (import.meta.env.DEV) {
                    console.warn("No se pudo guardar en sessionStorage.", error);
                }
            }
            
            setIsLoading(false);
        });
    }, [imageUrls, isLoading, storageKey]);

    return isLoading;
};
