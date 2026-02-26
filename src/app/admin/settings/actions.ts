"use server"

import fs from "fs/promises"
import path from "path"
import { revalidatePath } from "next/cache"

const SETTINGS_FILE = path.join(process.cwd(), "src/data/settings.json")

export interface CompanySettings {
    company_name: string
    address: string
    phone: string
    email: string
}

export async function getSettingsAction(): Promise<CompanySettings> {
    try {
        const data = await fs.readFile(SETTINGS_FILE, "utf-8")
        return JSON.parse(data)
    } catch {
        return {
            company_name: "BidAutoDirect",
            address: "123 Auction Way, Miami, FL 33101",
            phone: "+1 (305) 555-0123",
            email: "sales@bidautodirect.com",
        }
    }
}

export async function updateSettingsAction(formData: FormData) {
    const settings: CompanySettings = {
        company_name: formData.get("company_name") as string,
        address: formData.get("address") as string,
        phone: formData.get("phone") as string,
        email: formData.get("email") as string,
    }

    try {
        await fs.writeFile(SETTINGS_FILE, JSON.stringify(settings, null, 4), "utf-8")
        revalidatePath("/")
        revalidatePath("/admin/settings")
        return { success: true }
    } catch (err: unknown) {
        return { success: false, error: err instanceof Error ? err.message : String(err) }
    }
}
