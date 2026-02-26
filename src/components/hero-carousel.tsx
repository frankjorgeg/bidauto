"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Globe, ShieldCheck, Zap } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const heroImages = [
    {
        url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop",
        title: "Exclusive Performance",
        subtitle: "Verified luxury vehicles from major U.S. auctions."
    },
    {
        url: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop",
        title: "Global Logistics",
        subtitle: "Full documentation and secure international delivery."
    },
    {
        url: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=2070&auto=format&fit=crop",
        title: "Premium Inventory",
        subtitle: "Access the gold standard in automotive export."
    },
    {
        url: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop",
        title: "Buy with Confidence",
        subtitle: "Transparent history reports and expert inspections."
    }
]

export function HeroCarousel() {
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % heroImages.length)
        }, 6000)
        return () => clearInterval(timer)
    }, [])

    return (
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-slate-950 text-white">
            {/* Background Images */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80 z-10" />
                {heroImages.map((image, index) => (
                    <div
                        key={image.url}
                        className={cn(
                            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
                            index === current ? "opacity-60 scale-100" : "opacity-0 scale-105"
                        )}
                    >
                        <Image
                            src={image.url}
                            alt={image.title}
                            fill
                            className="object-cover"
                            priority={index === 0}
                        />
                    </div>
                ))}
            </div>

            <div className="container relative z-20">
                <div className="mx-auto max-w-4xl text-center">
                    <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000">
                        <Badge variant="outline" className="mb-6 border-white/20 bg-white/5 backdrop-blur-sm text-white px-4 py-1 text-sm">
                            {heroImages[current].title}
                        </Badge>
                        <h1 className="text-5xl font-black tracking-tight sm:text-7xl md:text-8xl lg:text-9xl uppercase italic leading-[0.9] transition-all duration-500">
                            BID SMART.<br />
                            <span className="text-white tracking-tighter not-italic">BUY SECURE.</span>
                        </h1>
                        <p className="mt-8 text-xl text-white/70 leading-relaxed max-w-2xl mx-auto font-medium transition-all duration-500">
                            {heroImages[current].subtitle}
                        </p>
                        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link href="/auctions">
                                <Button size="lg" className="h-14 px-10 text-lg font-bold rounded-full group">
                                    Live Auctions
                                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                            <Link href="/how-it-works">
                                <Button variant="outline" size="lg" className="h-14 px-10 text-lg font-bold rounded-full border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10">
                                    Process Guide
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dots */}
            <div className="absolute bottom-24 left-0 right-0 z-20 flex justify-center gap-2">
                {heroImages.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={cn(
                            "w-2 h-2 rounded-full transition-all duration-300",
                            current === i ? "bg-white w-8" : "bg-white/40 hover:bg-white/60"
                        )}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>

            {/* Floating Stats */}
            <div className="absolute bottom-12 left-0 right-0 z-20 hidden md:block">
                <div className="container flex justify-around items-center border-t border-white/10 pt-8 text-white/50 text-sm font-bold tracking-widest uppercase">
                    <div className="flex items-center gap-2 italic"><Globe className="h-4 w-4" /> Global Delivery</div>
                    <div className="flex items-center gap-2 italic"><ShieldCheck className="h-4 w-4" /> Insured Cargo</div>
                    <div className="flex items-center gap-2 italic"><Zap className="h-4 w-4" /> Rapid Document Processing</div>
                </div>
            </div>
        </section>
    )
}
