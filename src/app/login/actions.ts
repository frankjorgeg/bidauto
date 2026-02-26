'use server'

import { loginAction, logoutAction } from "@/lib/auth-service"
import { redirect } from "next/navigation"

export async function handleLoginAction(_state: unknown, formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const result = await loginAction(email, password)

    if (result.error) {
        return { error: result.error }
    }

    redirect('/dashboard')
    return { error: null }
}

export async function handleLogoutAction() {
    await logoutAction()
    redirect('/login')
}
