"use client"

import { useState } from "react"
import { ImageCarousel } from "@/components/image-carousel"
import { cn } from "@/lib/utils"

interface VehicleGalleryProps {
    images: string[]
    alt: string
}

export function VehicleGallery({ images, alt }: VehicleGalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0)

    if (!images || images.length === 0) {
        return (
            <div className="aspect-video bg-muted rounded-3xl flex items-center justify-center text-muted-foreground border">
                No images available
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Main Carousel */}
            <div className="aspect-video bg-slate-900 rounded-3xl overflow-hidden shadow-2xl relative border border-white/5">
                <ImageCarousel
                    images={images}
                    alt={alt}
                    currentExternal={activeIndex}
                    onChange={setActiveIndex}
                />
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="flex flex-wrap gap-3">
                    {images.map((img, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveIndex(i)}
                            className={cn(
                                "relative w-24 md:w-32 aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all duration-300",
                                activeIndex === i
                                    ? "border-primary ring-2 ring-primary/20 scale-105"
                                    : "border-transparent opacity-60 hover:opacity-100"
                            )}
                        >
                            <img src={img} alt="" className="h-full w-full object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
