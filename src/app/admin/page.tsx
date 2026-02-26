/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "@/lib/supabase/server"
import { getSession } from "@/lib/auth-service"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Plus, Settings, Car, Gavel,
    TrendingUp, ArrowUpRight, CalendarDays
} from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"
import { ImageCarousel } from "@/components/image-carousel"
import { SearchBar } from "@/components/search-bar"

interface AdminVehicle {
    id: string
    year: number
    make: string
    model: string
    vin?: string
    lot_number?: string
    status: string
    images?: string[]
    auction_date?: string
    current_bid?: number
    final_price?: number
}

export default async function AdminPage({ searchParams }: { searchParams: { q?: string } }) {
    const user = await getSession()

    if (!user || user.role !== "admin") {
        redirect("/login")
    }

    try {
        const supabase = createClient()
        const { data: vehicles, error } = await supabase
            .from("vehicles")
            .select("*")
            .order("auction_date", { ascending: false })

        if (error) {
            throw new Error(`Database error: ${error.message}`)
        }

        const safeVehicles = ((vehicles || []) as unknown as AdminVehicle[]).filter(v => {
            const q = searchParams.q?.toLowerCase()
            if (!q) return true
            return (
                v.make?.toLowerCase().includes(q) ||
                v.model?.toLowerCase().includes(q) ||
                v.vin?.toLowerCase().includes(q) ||
                v.lot_number?.toLowerCase().includes(q) ||
                `${v.year}`.includes(q)
            )
        })
        const biddingCount = safeVehicles.filter(v => v.status === "BIDDING").length
        const boughtCount = safeVehicles.filter(v => v.status === "BUYED").length
        const totalValue = safeVehicles.reduce((acc, v) => acc + (Number(v.final_price) || Number(v.current_bid) || 0), 0)

        return (
            <div className="container py-10">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Admin Control Panel</h1>
                            <p className="text-muted-foreground">Manage inventory and logistics.</p>
                        </div>
                        <div className="flex gap-3">
                            <Link href="/admin/vehicles/new">
                                <Button className="gap-2">
                                    <Plus className="h-4 w-4" />
                                    New Vehicle
                                </Button>
                            </Link>
                            <Link href="/admin/settings">
                                <Button variant="outline" className="gap-2">
                                    <Settings className="h-4 w-4" />
                                    Settings
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {[
                            { title: "Total Vehicles", value: safeVehicles.length, icon: Car, trend: "Overall count" },
                            { title: "Active Auctions", value: biddingCount, icon: Gavel, trend: "Status: BIDDING" },
                            { title: "Closed Deals", value: boughtCount, icon: TrendingUp, trend: "Status: BUYED" },
                            { title: "Inventory Value", value: formatCurrency(totalValue), icon: ArrowUpRight, trend: "Sum of prices" },
                        ].map((stat) => (
                            <Card key={stat.title}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stat.value}</div>
                                    <p className="text-xs text-muted-foreground mt-1">{stat.trend}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold tracking-tight">Inventory</h2>
                            <SearchBar />
                        </div>

                        {safeVehicles.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {safeVehicles.map((vehicle) => (
                                    <Link key={vehicle.id} href={`/admin/vehicles/${vehicle.id}`}>
                                        <Card className="overflow-hidden hover:border-primary/50 transition-colors group h-full flex flex-col">
                                            <div className="aspect-video bg-muted relative overflow-hidden">
                                                <ImageCarousel
                                                    images={Array.isArray(vehicle.images) ? vehicle.images : []}
                                                    alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                                                />
                                                <div className="absolute top-2 right-2 flex flex-col gap-2 items-end">
                                                    <Badge variant={vehicle.status === "BIDDING" ? "secondary" : "default"}>
                                                        {vehicle.status}
                                                    </Badge>
                                                </div>
                                            </div>
                                            <CardContent className="p-4 flex-1">
                                                <h3 className="font-bold truncate">
                                                    {vehicle.year} {vehicle.make} {vehicle.model}
                                                </h3>
                                                <p className="text-xs text-muted-foreground font-mono mt-1">
                                                    VIN: {vehicle.vin || "N/A"}
                                                </p>
                                                {vehicle.auction_date && (
                                                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                                        <CalendarDays className="h-3 w-3" />
                                                        {new Date(vehicle.auction_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                                    </p>
                                                )}
                                                <div className="mt-3 flex justify-between items-center bg-muted/30 p-2 rounded">
                                                    <span className="text-[10px] text-muted-foreground uppercase font-bold">Price</span>
                                                    <span className="font-bold text-sm text-primary">
                                                        {formatCurrency(vehicle.status === "BIDDING" ? vehicle.current_bid : vehicle.final_price)}
                                                    </span>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <Card className="h-48 flex items-center justify-center text-muted-foreground border-dashed">
                                No vehicles found.
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        )
    } catch (e: unknown) {
        return (
            <div className="container py-20 text-center">
                <div className="bg-destructive/10 p-10 rounded-xl border-2 border-destructive inline-block">
                    <h1 className="text-2xl font-bold text-destructive">Dashboard Load Error</h1>
                    <p className="text-muted-foreground mt-2">{e instanceof Error ? e.message : "Internal Error"}</p>
                    <Link href="/admin">
                        <Button className="mt-6">Refresh Dashboard</Button>
                    </Link>
                </div>
            </div>
        )
    }
}
