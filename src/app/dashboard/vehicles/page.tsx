import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Gauge, CalendarDays } from "lucide-react"
import Link from "next/link"
import { formatCurrency } from "@/lib/utils"
import { ImageCarousel } from "@/components/image-carousel"

export default async function VehiclesPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const supabase = createClient()

    let query = supabase.from("vehicles").select("*")

    const status = searchParams.status as string
    if (status) {
        query = query.eq("status", status)
    }

    const { data: vehicles } = await query.order("auction_date", { ascending: false })

    return (
        <div className="container py-10">
            <div className="flex flex-col gap-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Browse Vehicles</h1>
                        <p className="text-muted-foreground">Find and source premium U.S. auction inventory.</p>
                    </div>
                    <div className="flex gap-2">
                        <Link href="/dashboard/vehicles">
                            <Button variant={!status ? "default" : "outline"} size="sm">All</Button>
                        </Link>
                        <Link href="/dashboard/vehicles?status=BIDDING">
                            <Button variant={status === "BIDDING" ? "default" : "outline"} size="sm">Live Bidding</Button>
                        </Link>
                        <Link href="/dashboard/vehicles?status=BUYED">
                            <Button variant={status === "BUYED" ? "default" : "outline"} size="sm">Recently Bought</Button>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {vehicles?.map((vehicle) => (
                        <Card key={vehicle.id} className="overflow-hidden hover-card-effect group border-muted/50">
                            <div className="aspect-[4/3] bg-slate-800 relative">
                                <Badge
                                    className="absolute top-4 left-4 z-10"
                                    variant={vehicle.status === "BIDDING" ? "warning" : "success"}
                                >
                                    {vehicle.status}
                                </Badge>
                                <ImageCarousel
                                    images={Array.isArray(vehicle.images) ? vehicle.images : []}
                                    alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                                />
                            </div>
                            <CardHeader className="p-4">
                                <CardTitle className="text-lg leading-tight">
                                    {vehicle.year} {vehicle.make} {vehicle.model}
                                </CardTitle>
                                <p className="text-sm text-muted-foreground">{vehicle.trim}</p>
                            </CardHeader>
                            <CardContent className="p-4 pt-0 space-y-2">
                                <div className="flex items-center gap-2 text-sm">
                                    <Gauge className="h-4 w-4 text-muted-foreground" />
                                    <span>{vehicle.mileage?.toLocaleString()} mi</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <span>{vehicle.location}</span>
                                </div>
                                {vehicle.auction_date && (
                                    <div className="flex items-center gap-2 text-sm">
                                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                                        <span>{new Date(vehicle.auction_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                                    </div>
                                )}
                                <div className="flex items-center justify-between pt-2 border-t">
                                    <span className="text-sm text-muted-foreground">
                                        {vehicle.status === "BIDDING" ? "Current Bid" : "Final Price"}
                                    </span>
                                    <span className="font-bold text-primary">
                                        {formatCurrency(vehicle.status === "BIDDING" ? vehicle.current_bid : vehicle.final_price)}
                                    </span>
                                </div>
                            </CardContent>
                            <CardFooter className="p-4 pt-0">
                                <Link href={`/dashboard/vehicles/${vehicle.id}`} className="w-full">
                                    <Button variant="secondary" className="w-full">View Details</Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                    {(!vehicles || vehicles.length === 0) && (
                        <div className="col-span-full h-64 flex flex-col items-center justify-center text-muted-foreground bg-muted/20 rounded-xl border-2 border-dashed border-muted/50">
                            <p>No vehicles found matching your criteria.</p>
                            <p className="text-sm">Try clearing filters or search back later.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
