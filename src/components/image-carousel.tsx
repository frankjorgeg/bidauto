"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageCarouselProps {
    images: string[]
    alt: string
    currentExternal?: number
    onChange?: (index: number) => void
    className?: string
}

export function ImageCarousel({ images, alt, currentExternal, onChange, className }: ImageCarouselProps) {
    const [internalCurrent, setInternalCurrent] = useState(0)

    // Support both internal and external state
    const current = currentExternal !== undefined ? currentExternal : internalCurrent
    const setCurrent = (index: number) => {
        if (onChange) {
            onChange(index)
        } else {
            setInternalCurrent(index)
        }
    }

    if (!images || images.length === 0) {
        return (
            <div className={cn("absolute inset-0 flex items-center justify-center text-muted-foreground bg-muted", className)}>
                <ImageIcon className="h-8 w-8" />
            </div>
        )
    }

    const prev = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setCurrent(current === 0 ? images.length - 1 : current - 1)
    }

    const next = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setCurrent(current === images.length - 1 ? 0 : current + 1)
    }

    return (
        <div className={cn("relative w-full h-full group select-none", className)}>
            <Image
                src={images[current]}
                alt={alt}
                fill
                className="object-cover transition-all duration-500 ease-in-out"
                priority={current === 0}
            />

            {images.length > 1 && (
                <>
                    {/* Navigation arrows - visible on mobile by default, hover on desktop */}
                    <button
                        onClick={prev}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 md:opacity-0 md:group-hover:opacity-100 transition-all z-20 backdrop-blur-sm border border-white/10"
                        aria-label="Previous image"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 md:opacity-0 md:group-hover:opacity-100 transition-all z-20 backdrop-blur-sm border border-white/10"
                        aria-label="Next image"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>

                    {/* Dots indicator */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 bg-black/20 px-2 py-1 rounded-full backdrop-blur-xs">
                        {images.map((_: string, i: number) => (
                            <button
                                key={i}
                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrent(i); }}
                                className={cn(
                                    "block w-2 h-2 rounded-full transition-all duration-300",
                                    i === current ? "bg-white scale-125 shadow-sm" : "bg-white/40 hover:bg-white/60"
                                )}
                                aria-label={`Go to image ${i + 1}`}
                            />
                        ))}
                    </div>

                    {/* Image Counter */}
                    <div className="absolute top-4 right-4 bg-black/50 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-md border border-white/10 z-20">
                        {current + 1} / {images.length}
                    </div>
                </>
            )}
        </div>
    )
}
