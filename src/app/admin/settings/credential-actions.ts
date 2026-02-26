"use server"

import { getSession, getAuthData, updateAuthData } from "@/lib/auth-service"

export async function updateCredentialsAction(
    currentPassword: string,
    newEmail?: string,
    newPassword?: string
) {
    const session = await getSession()
    if (!session) return { error: "Not authenticated" }

    const authData = await getAuthData()
    const userIndex = authData.users.findIndex((u) => u.id === session.id)
    if (userIndex === -1) return { error: "User not found" }

    const user = authData.users[userIndex]

    // Verify current password
    if (user.password !== currentPassword) {
        return { error: "Current password is incorrect" }
    }

    // Update email if provided
    if (newEmail && newEmail.trim()) {
        authData.users[userIndex].email = newEmail.trim()
    }

    // Update password if provided
    if (newPassword && newPassword.trim()) {
        authData.users[userIndex].password = newPassword.trim()
    }

    // If nothing changed
    if (!newEmail && !newPassword) {
        return { error: "No changes provided" }
    }

    await updateAuthData(authData)
    return { success: true }
}
