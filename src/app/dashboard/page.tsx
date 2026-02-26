import { getSession } from "@/lib/auth-service"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Car, Gavel, CheckCircle, ArrowRight, LayoutDashboard } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { VehicleCard } from "@/components/vehicle-card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function DashboardPage() {
    const user = await getSession()

    if (!user) {
        redirect("/login")
    }

    const supabase = createClient()

    // Fetch bidding vehicles
    const { data: biddingVehicles } = await supabase
        .from("vehicles")
        .select("*")
        .eq("status", "BIDDING")
        .eq("is_published", true)
        .order("created_at", { ascending: false })

    // Fetch bought vehicles
    const { data: boughtVehicles } = await supabase
        .from("vehicles")
        .select("*")
        .eq("status", "BUYED")
        .eq("is_published", true)
        .order("updated_at", { ascending: false })

    return (
        <div className="container py-10">
            <div className="flex flex-col gap-10">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                        <p className="text-muted-foreground">
                            Welcome back, {user.name}
                        </p>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="bg-muted/5 border-muted/50">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Bidding Vehicles</CardTitle>
                            <Gavel className="h-4 w-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{biddingVehicles?.length || 0}</div>
                            <p className="text-xs text-muted-foreground mt-1">Live opportunities</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-muted/5 border-muted/50">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Bought Vehicles</CardTitle>
                            <CheckCircle className="h-4 w-4 text-emerald-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{boughtVehicles?.length || 0}</div>
                            <p className="text-xs text-muted-foreground mt-1">Successfully secured</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-muted/5 border-muted/50">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Account Status</CardTitle>
                            <Car className="h-4 w-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2">
                                <Badge variant="success" className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20">Verified</Badge>
                                <span className="text-xs text-muted-foreground font-mono uppercase">{user.role}</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">Active access to U.S. inventory</p>
                        </CardContent>
                    </Card>
                </div>

                <Tabs defaultValue="bought" className="w-full">
                    <div className="flex items-center justify-between mb-8">
                        <TabsList className="grid w-[400px] grid-cols-2 bg-muted/20 p-1">
                            <TabsTrigger value="bought" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white font-bold">
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Bought Vehicles
                            </TabsTrigger>
                            <TabsTrigger value="auctions" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold">
                                <Gavel className="mr-2 h-4 w-4" />
                                Live Auctions
                            </TabsTrigger>
                        </TabsList>

                        <div className="hidden md:block">
                            <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 bg-muted/5">
                                Real-Time Inventory Control
                            </Badge>
                        </div>
                    </div>

                    <TabsContent value="bought" className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold tracking-tight">Recently <span className="text-emerald-500 italic">Bought</span></h2>
                        </div>
                        {boughtVehicles && boughtVehicles.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-90">
                                {boughtVehicles.map((vehicle) => (
                                    <VehicleCard key={vehicle.id} vehicle={vehicle} />
                                ))}
                            </div>
                        ) : (
                            <Card className="flex h-[300px] items-center justify-center text-center bg-muted/5 border-dashed border-2">
                                <div className="space-y-3">
                                    <div className="mx-auto w-12 h-12 rounded-full bg-muted/10 flex items-center justify-center">
                                        <CheckCircle className="h-6 w-6 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg">No purchased vehicles</p>
                                        <p className="text-sm text-muted-foreground">Successfully secured deals will appear here.</p>
                                    </div>
                                </div>
                            </Card>
                        )}
                    </TabsContent>

                    <TabsContent value="auctions" className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold tracking-tight">Vehicles <span className="text-primary italic">Live</span></h2>
                        </div>
                        {biddingVehicles && biddingVehicles.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {biddingVehicles.map((vehicle) => (
                                    <VehicleCard key={vehicle.id} vehicle={vehicle} />
                                ))}
                            </div>
                        ) : (
                            <Card className="flex h-[300px] items-center justify-center text-center bg-muted/5 border-dashed border-2">
                                <div className="space-y-3">
                                    <div className="mx-auto w-12 h-12 rounded-full bg-muted/10 flex items-center justify-center">
                                        <Gavel className="h-6 w-6 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg">No auctions active</p>
                                        <p className="text-sm text-muted-foreground">Check back later for new inventory.</p>
                                    </div>
                                </div>
                            </Card>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
