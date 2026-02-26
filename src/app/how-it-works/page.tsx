import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Globe, ShieldCheck, Zap, Truck, Search, Gavel } from "lucide-react"

export default function HowItWorksPage() {
    const steps = [
        {
            title: "Expert Sourcing",
            description: "We use big data and real-time auction access to find vehicles that meet your specific criteria for condition, price, and export suitability.",
            icon: Search,
            color: "text-blue-500",
            bg: "bg-blue-500/10"
        },
        {
            title: "Technical Analysis",
            description: "Every listing is vetted. We analyze condition reports, vehicle history, and estimated repair costs to ensure a profitable investment.",
            icon: Globe,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10"
        },
        {
            title: "Strategic Bidding",
            description: "Authorized representatives place bids on your behalf using optimized strategies to secure the best possible purchase price.",
            icon: Gavel,
            color: "text-amber-500",
            bg: "bg-amber-500/10"
        },
        {
            title: "Secure Transaction",
            description: "All payments and documentation are handled through high-security channels, ensuring full compliance and legal ownership transfer.",
            icon: ShieldCheck,
            color: "text-indigo-500",
            bg: "bg-indigo-500/10"
        },
        {
            title: "Logistics & Loading",
            description: "Vehicles are transported to major U.S. ports, safely loaded into containers or Ro-Ro vessels by export specialists.",
            icon: Truck,
            color: "text-rose-500",
            bg: "bg-rose-500/10"
        },
        {
            title: "Final Delivery",
            description: "Documentation is courier-delivered. We monitor the shipment until it arrives at your destination port for customs clearance.",
            icon: Zap,
            color: "text-violet-500",
            bg: "bg-violet-500/10"
        },
    ]

    return (
        <div className="container py-12 md:py-24">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <Badge variant="outline" className="mb-4">Ecosystem Overview</Badge>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">How BidAutoDirect Works.</h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        We've built a world-class infrastructure to simplify the complexity of U.S. vehicle auctions and global logistics.
                    </p>
                </div>

                <div className="grid gap-12 mt-20 relative">
                    {/* Visual Connector Line for Desktop */}
                    <div className="absolute left-8 top-10 bottom-10 w-px bg-border hidden md:block" />

                    {steps.map((step, index) => (
                        <div key={step.title} className="flex flex-col md:flex-row gap-8 relative">
                            <div className={`shrink-0 z-10 mx-auto md:mx-0 flex h-16 w-16 items-center justify-center rounded-2xl ${step.bg} ${step.color} shadow-lg ring-4 ring-background`}>
                                <step.icon className="h-8 w-8" />
                            </div>
                            <div className="flex-1 pt-2">
                                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
