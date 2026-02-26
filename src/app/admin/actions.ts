"use server"

import { createAdminClient } from "@/lib/supabase/admin"
import { revalidatePath } from "next/cache"

export async function updateVehicleAction(formData: FormData) {
    const supabase = createAdminClient()

    const id = formData.get("id") as string
    const year = parseInt(formData.get("year") as string)
    const make = formData.get("make") as string
    const model = formData.get("model") as string
    const trim = (formData.get("trim") as string) || null
    const vin = (formData.get("vin") as string) || ""
    const status = formData.get("status") as string
    const mileage = parseInt(formData.get("mileage") as string) || 0
    const title_status = formData.get("title_status") as string
    const damage_type = (formData.get("damage_type") as string) || null
    const engine = (formData.get("engine") as string) || null
    const transmission = (formData.get("transmission") as string) || null
    const drivetrain = (formData.get("drivetrain") as string) || null
    const fuel_type = (formData.get("fuel_type") as string) || null
    const keys = formData.get("keys") === "true"
    const running_condition = (formData.get("running_condition") as string) || null
    const auction_house = (formData.get("auction_house") as string) || "Copart"
    const lot_number = (formData.get("lot_number") as string) || ""
    const auctionDateRaw = formData.get("auction_date") as string
    const auction_date = auctionDateRaw ? new Date(auctionDateRaw).toISOString() : null
    const location = (formData.get("location") as string) || ""
    const current_bid = parseFloat(formData.get("current_bid") as string) || 0
    const final_price = formData.get("final_price") ? parseFloat(formData.get("final_price") as string) : null
    const est_repair_cost = formData.get("est_repair_cost") ? parseFloat(formData.get("est_repair_cost") as string) : null
    const est_market_value = formData.get("est_market_value") ? parseFloat(formData.get("est_market_value") as string) : null
    const shipping_estimate = formData.get("shipping_estimate") ? parseFloat(formData.get("shipping_estimate") as string) : null
    const destination = (formData.get("destination") as string) || null
    const images = JSON.parse(formData.get("images") as string || "[]")

    const { data, error } = await supabase
        .from("vehicles")
        .update({
            year, make, model, trim, vin, status,
            mileage, title_status, damage_type,
            engine, transmission, drivetrain, fuel_type,
            keys, running_condition,
            auction_house, lot_number, auction_date, location,
            current_bid, final_price,
            est_repair_cost, est_market_value, shipping_estimate,
            destination, images,
            updated_at: new Date().toISOString()
        })
        .eq("id", id)
        .select()

    if (error) {
        console.error("UPDATE ERROR:", error)
        return { error: error.message }
    }

    console.log("UPDATE SUCCESS:", data?.length, "rows updated")

    revalidatePath("/admin")
    revalidatePath(`/admin/vehicles/${id}`)
    revalidatePath("/")

    return { success: true }
}

export async function createVehicleAction(formData: FormData) {
    const supabase = createAdminClient()

    const year = parseInt(formData.get("year") as string)
    const make = formData.get("make") as string
    const model = formData.get("model") as string
    const trim = (formData.get("trim") as string) || null
    const vin = (formData.get("vin") as string) || ""
    const status = formData.get("status") as string
    const mileage = parseInt(formData.get("mileage") as string) || 0
    const title_status = (formData.get("title_status") as string) || "SALVAGE"
    const damage_type = (formData.get("damage_type") as string) || null
    const engine = (formData.get("engine") as string) || null
    const transmission = (formData.get("transmission") as string) || "AUTO"
    const drivetrain = (formData.get("drivetrain") as string) || "FWD"
    const fuel_type = (formData.get("fuel_type") as string) || "GAS"
    const keys = formData.get("keys") === "true"
    const running_condition = (formData.get("running_condition") as string) || "N/A"
    const auction_house = (formData.get("auction_house") as string) || "Copart"
    const lot_number = (formData.get("lot_number") as string) || ""
    const auctionDateRaw = formData.get("auction_date") as string
    const auction_date = auctionDateRaw ? new Date(auctionDateRaw).toISOString() : null
    const location = (formData.get("location") as string) || ""
    const current_bid = parseFloat(formData.get("current_bid") as string) || 0
    const final_price = formData.get("final_price") ? parseFloat(formData.get("final_price") as string) : null
    const est_repair_cost = formData.get("est_repair_cost") ? parseFloat(formData.get("est_repair_cost") as string) : null
    const est_market_value = formData.get("est_market_value") ? parseFloat(formData.get("est_market_value") as string) : null
    const shipping_estimate = formData.get("shipping_estimate") ? parseFloat(formData.get("shipping_estimate") as string) : null
    const destination = (formData.get("destination") as string) || null
    const images = JSON.parse(formData.get("images") as string || "[]")

    const { error } = await supabase
        .from("vehicles")
        .insert({
            year, make, model, trim, vin, status,
            mileage, title_status, damage_type,
            engine, transmission, drivetrain, fuel_type,
            keys, running_condition,
            auction_house, lot_number, auction_date, location,
            current_bid, final_price,
            est_repair_cost, est_market_value, shipping_estimate,
            destination, images,
        })

    if (error) {
        console.error("CREATE ERROR:", error)
        return { error: error.message }
    }

    revalidatePath("/admin")
    revalidatePath("/")

    return { success: true }
}

export async function deleteVehicleAction(id: string) {
    const supabase = createAdminClient()
    const { error } = await supabase.from("vehicles").delete().eq("id", id)
    if (error) return { success: false, error: error.message }
    revalidatePath("/admin")
    return { success: true }
}

export async function toggleVisibilityAction(id: string, published: boolean) {
    const supabase = createAdminClient()
    const { error } = await supabase
        .from("vehicles")
        .update({ is_published: !published })
        .eq("id", id)
    if (error) return { success: false, error: error.message }
    revalidatePath("/admin")
    return { success: true }
}
