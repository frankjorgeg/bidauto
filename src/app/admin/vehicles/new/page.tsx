import { getSession } from "@/lib/auth-service"
import { redirect } from "next/navigation"
import { NewVehicleForm } from "./new-form"

export default async function NewVehiclePage() {
    const user = await getSession()
    if (!user || user.role !== "admin") {
        redirect("/login")
    }

    return (
        <div className="container py-10">
            <NewVehicleForm />
        </div>
    )
}
