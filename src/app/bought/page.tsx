import { createClient } from "@/lib/supabase/server"
import { getSession } from "@/lib/auth-service"
import { redirect } from "next/navigation"
import { VehicleCard } from "@/components/vehicle-card"

export default async function BoughtVehiclesPage() {
    const user = await getSession()
    if (!user) redirect("/login")

    const supabase = createClient()

    const { data: vehicles } = await supabase
        .from("vehicles")
        .select("*")
        .eq("status", "BUYED")
        .eq("is_published", true)
        .order("updated_at", { ascending: false })

    return (
        <div className="container py-12 md:py-20">
            <div className="flex flex-col gap-10">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight mb-4">Bought Vehicles</h1>
                    <p className="text-xl text-muted-foreground">Succesfully sourced and exported premium inventory for our clients.</p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {vehicles?.map((vehicle) => (
                        <VehicleCard key={vehicle.id} vehicle={vehicle} />
                    ))}
                </div>
            </div>
        </div>
    )
}
