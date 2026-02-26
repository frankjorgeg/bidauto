/* eslint-disable */
import { toggleVisibilityAction, deleteVehicleAction } from "./actions"
import { toast } from "sonner"

export async function toggleVehicleVisibility(vehicleId: string, currentStatus: boolean) {
    try {
        const result = await toggleVisibilityAction(vehicleId, currentStatus)
        if (result.success) {
            toast.success("Visibility updated")
            return { success: true }
        } else {
            let errorMessage: string | undefined;
            if (typeof result.error === 'object' && result.error !== null && 'message' in result.error && typeof (result.error as any).message === 'string') {
                errorMessage = (result.error as Record<string, unknown>).message as string;
            }
            toast.error(errorMessage || result.error || "Failed to update visibility");
            return { success: false };
        }
    } catch (error: unknown) {
        let errorMessage: string | undefined;
        if (typeof error === 'object' && error !== null && 'message' in error && typeof (error as any).message === 'string') {
            errorMessage = (error as Record<string, unknown>).message as string;
        }
        toast.error(errorMessage || "An error occurred");
        return { success: false };
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
    } catch (unusedError) {
        toast.error("An error occurred")
        return { success: false }
    }
}
