import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { VehicleEditForm } from "./edit-form"

export default async function VehiclePage({ params }: { params: { id: string } }) {
    const supabase = createClient()
    const { data: vehicle, error } = await supabase
        .from("vehicles")
        .select("*")
        .eq("id", params.id)
        .single()

    if (error || !vehicle) {
        return notFound()
    }

    return (
        <div className="container py-10">
            <VehicleEditForm vehicle={vehicle} />
        </div>
    )
}
