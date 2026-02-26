"use client"

import { Button } from "@/components/ui/button"
import { Eye, EyeOff, Trash2 } from "lucide-react"
import { toggleVehicleVisibility, deleteVehicle } from "./client-actions"
import { useRouter } from "next/navigation"

interface AdminVehicleActionsProps {
    vehicleId: string
    isPublished: boolean
}

export function AdminVehicleActions({ vehicleId, isPublished }: AdminVehicleActionsProps) {
    const router = useRouter()

    const handleToggle = async () => {
        const result = await toggleVehicleVisibility(vehicleId, isPublished)
        if (result.success) router.refresh()
    }

    const handleDelete = async () => {
        if (confirm("Are you sure you want to delete this vehicle?")) {
            const result = await deleteVehicle(vehicleId)
            if (result.success) router.refresh()
        }
    }

    return (
        <div className="flex items-center gap-1">
            <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:text-primary"
                onClick={handleToggle}
                title={isPublished ? "Hide from public" : "Show to public"}
            >
                {isPublished ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:bg-destructive/10"
                onClick={handleDelete}
            >
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    )
}
