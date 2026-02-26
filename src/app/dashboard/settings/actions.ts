'use server'

import { changePasswordAction } from "@/lib/auth-service"
import { revalidatePath } from "next/cache"

export async function handleChangePassword(formData: FormData) {
    const currentPassword = formData.get('currentPassword') as string
    const newPassword = formData.get('newPassword') as string
    const confirmPassword = formData.get('confirmPassword') as string

    if (newPassword !== confirmPassword) {
        return { error: "New passwords do not match" }
    }

    const result = await changePasswordAction(currentPassword, newPassword)

    if (result.error) {
        return { error: result.error }
    }

    revalidatePath('/dashboard/settings')
    return { success: "Password updated successfully" }
}
