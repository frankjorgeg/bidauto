import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Timer, Calendar, MapPin } from "lucide-react"
import Link from "next/link"
import { formatCurrency } from "@/lib/utils"

interface Vehicle {
    id: string
    year: number | string
    make: string
    model: string
    status: "BIDDING" | "BUYED"
    images?: string[]
    current_bid?: number
    final_price?: number
    location?: string
    auction_house?: string
    destination?: string
    purchase_date?: string
}

interface VehicleCardProps {
    vehicle: Vehicle
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
    return (
        <Card key={vehicle.id} className="overflow-hidden hover-card-effect group border-muted/50">
            <div className="aspect-video bg-slate-800 relative overflow-hidden">
                <Badge
                    className="absolute top-4 left-4 z-10"
                    variant={vehicle.status === "BIDDING" ? "warning" : "success"}
                >
                    {vehicle.status}
                </Badge>
                {vehicle.images?.[0] ? (
                    <img
                        src={vehicle.images[0]}
                        alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-white/10 font-bold">
                        NO IMAGE
                    </div>
                )}
            </div>
            <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold truncate pr-2">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                    </h3>
                    <span className="text-base font-bold text-primary shrink-0">
                        {formatCurrency(vehicle.status === "BIDDING" ? vehicle.current_bid : vehicle.final_price)}
                    </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-1">
                    {vehicle.location} | {vehicle.auction_house}
                </p>
                <div className="grid grid-cols-2 gap-y-3 gap-x-1 mb-6">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Timer className="h-3 w-3 text-primary" />
                        <span className="truncate">{vehicle.status === "BIDDING" ? "Live Bidding" : "Sold"}</span>
                    </div>
                    {vehicle.purchase_date && (
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3 text-primary" />
                            <span className="truncate">{new Date(vehicle.purchase_date).toLocaleDateString()}</span>
                        </div>
                    )}
                    {vehicle.status === "BUYED" && (
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground col-span-2">
                            <MapPin className="h-3 w-3 text-emerald-500" />
                            <span className="truncate">Dest: {vehicle.destination || "Santo Domingo, DR"}</span>
                        </div>
                    )}
                </div>
                <Link href={`/dashboard/vehicles/${vehicle.id}`}>
                    <Button className="w-full font-bold">View Details</Button>
                </Link>
            </CardContent>
        </Card>
    )
}
