import { createClient } from "@/lib/supabase/server"
import { getSession } from "@/lib/auth-service"
import { notFound, redirect } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Car, Gavel, MapPin, Gauge, Shield, Clock,
    Info, CheckCircle2, AlertTriangle, FileText,
    Settings, Zap, DollarSign, Truck, Globe
} from "lucide-react"
import { formatCurrency, formatDate } from "@/lib/utils"
import Link from "next/link"
import { VehicleGallery } from "./vehicle-gallery"

export default async function VehicleDetailPage({ params }: { params: { id: string } }) {
    const user = await getSession()

    if (!user) {
        redirect("/login")
    }

    const supabase = createClient()

    const { data: vehicle } = await supabase
        .from("vehicles")
        .select("*")
        .eq("id", params.id)
        .single()

    if (!vehicle) {
        notFound()
    }

    return (
        <div className="container py-10">
            <div className="flex flex-col gap-8">
                {/* Breadcrumb / Back */}
                <Link href="/dashboard/vehicles" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                    &larr; Back to Listings
                </Link>

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <Badge variant={vehicle.status === "BIDDING" ? "warning" : "success"} className="text-sm px-4">
                                {vehicle.status}
                            </Badge>
                            <span className="text-muted-foreground font-mono text-sm uppercase">VIN: {vehicle.vin}</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                            {vehicle.year} {vehicle.make} {vehicle.model}
                        </h1>
                        <p className="text-xl text-muted-foreground mt-1">{vehicle.trim}</p>
                    </div>
                    <div className="flex flex-col gap-3 min-w-[300px]">
                        <div className="bg-muted p-4 rounded-xl flex justify-between items-center">
                            <span className="text-sm font-medium">{vehicle.status === "BIDDING" ? "Current Bid" : "Final Price"}</span>
                            <span className="text-2xl font-bold">{formatCurrency(vehicle.status === "BIDDING" ? vehicle.current_bid : vehicle.final_price)}</span>
                        </div>
                        {vehicle.status === "BIDDING" && (
                            <Button size="lg" className="w-full">Place Bid</Button>
                        )}
                        {vehicle.buy_now_price && vehicle.status === "BIDDING" && (
                            <Button variant="outline" className="w-full">Buy It Now for {formatCurrency(vehicle.buy_now_price)}</Button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Info Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Gallery Section */}
                        <VehicleGallery
                            images={Array.isArray(vehicle.images) ? vehicle.images : []}
                            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                        />

                        {/* Core Specifications */}
                        <Card className="border-muted/50">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Settings className="h-5 w-5" />
                                    Vehicle Specifications
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
                                {[
                                    { label: "Mileage", value: `${vehicle.mileage?.toLocaleString()} mi`, icon: Gauge },
                                    { label: "Title Status", value: vehicle.title_status, icon: Shield },
                                    { label: "Damage", value: vehicle.damage_type || "None", icon: AlertTriangle },
                                    { label: "Engine", value: vehicle.engine, icon: Zap },
                                    { label: "Transmission", value: vehicle.transmission, icon: Settings },
                                    { label: "Drivetrain", value: vehicle.drivetrain, icon: Car },
                                    { label: "Fuel Type", value: vehicle.fuel_type, icon: Info },
                                    { label: "Keys", value: vehicle.keys ? "Yes" : "No", icon: Zap },
                                    { label: "Running", value: vehicle.running_condition, icon: CheckCircle2 },
                                ].map((spec) => (
                                    <div key={spec.label} className="space-y-1">
                                        <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">{spec.label}</p>
                                        <div className="flex items-center gap-2">
                                            <spec.icon className="h-4 w-4 text-primary/60" />
                                            <span className="font-medium">{spec.value || "N/A"}</span>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Condition Notes */}
                        {vehicle.condition_notes && (
                            <Card className="border-muted/50">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <FileText className="h-5 w-5" />
                                        Condition Notes
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground leading-relaxed">{vehicle.condition_notes}</p>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar Info Column */}
                    <div className="space-y-6">
                        {/* Auction Info */}
                        <Card className="border-muted/50 bg-muted/10">
                            <CardHeader>
                                <CardTitle className="text-lg">Auction Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                                        <Gavel className="h-4 w-4" /> House
                                    </span>
                                    <span className="font-semibold">{vehicle.auction_house}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                                        <Info className="h-4 w-4" /> Lot #
                                    </span>
                                    <span className="font-mono">{vehicle.lot_number}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                                        <Clock className="h-4 w-4" /> {vehicle.status === "BIDDING" ? "Auction Date" : "Purchase Date"}
                                    </span>
                                    <span className="font-semibold">
                                        {formatDate(vehicle.status === "BIDDING" ? vehicle.auction_date : vehicle.purchase_date)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-start gap-4">
                                    <span className="text-sm text-muted-foreground flex items-center gap-2 shrink-0">
                                        <MapPin className="h-4 w-4" /> Location
                                    </span>
                                    <span className="font-semibold text-right">{vehicle.location}</span>
                                </div>
                                {vehicle.status === "BUYED" && (
                                    <div className="flex justify-between items-start gap-4 border-t border-muted pt-4">
                                        <span className="text-sm text-muted-foreground flex items-center gap-2 shrink-0">
                                            <Globe className="h-4 w-4 text-emerald-500" /> Export Destination
                                        </span>
                                        <span className="font-bold text-right text-emerald-600 dark:text-emerald-400">
                                            {vehicle.destination || "Santo Domingo, Dominican Republic"}
                                        </span>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Export Evaluation */}
                        <Card className="border-primary/20 bg-primary/5">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Globe className="h-5 w-5" />
                                    Export Analysis
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                                        <DollarSign className="h-4 w-4" /> Est. Repair Cost
                                    </span>
                                    <span className="font-semibold">{formatCurrency(vehicle.est_repair_cost)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                                        <Car className="h-4 w-4" /> Market Value
                                    </span>
                                    <span className="font-semibold">{formatCurrency(vehicle.est_market_value)}</span>
                                </div>
                                <div className="flex justify-between items-center border-t border-primary/10 pt-4">
                                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                                        <Truck className="h-4 w-4" /> Shipping Est.
                                    </span>
                                    <span className="font-semibold">{formatCurrency(vehicle.shipping_estimate)}</span>
                                </div>
                                <div className="mt-4 p-3 bg-white/50 dark:bg-black/20 rounded-lg text-xs text-muted-foreground">
                                    Note: Export documentation and logistics are included in our service fee.
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
