import { toggleVisibilityAction, deleteVehicleAction } from "./actions"
import { toast } from "sonner"

export async function toggleVehicleVisibility(vehicleId: string, currentStatus: boolean) {
    try {
        const result = await toggleVisibilityAction(vehicleId, currentStatus)
        if (result.success) {
            toast.success("Visibility updated")
            return { success: true }
        } else {
            toast.error(result.error || "Failed to update visibility")
            return { success: false }
        }
    } catch (error) {
        toast.error("An error occurred")
        return { success: false }
    }
}

export async function deleteVehicle(vehicleId: string) {
    if (!confirm("Are you sure you want to delete this vehicle?")) {
        return { success: false }
    }

    try {
        const result = await deleteVehicleAction(vehicleId)
        if (result.success) {
            toast.success("Vehicle deleted")
            return { success: true }
        } else {
            toast.error(result.error || "Failed to delete vehicle")
            return { success: false }
        }
    } catch (error) {
        toast.error("An error occurred")
        return { success: false }
    }
}
