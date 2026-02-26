/* eslint-disable */
import { createAdminClient } from "@/lib/supabase/admin"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const file = formData.get("file") as File

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 })
        }

        // Validate file type
        const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"]
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { error: "Invalid file type. Allowed: JPG, PNG, WebP, GIF" },
                { status: 400 }
            )
        }

        // Max 5MB
        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json({ error: "File too large. Max 5MB." }, { status: 400 })
        }

        const supabase = createAdminClient()

        // Generate unique filename
        const ext = file.name.split(".").pop() || "jpg"
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`
        const filePath = `${fileName}`

        // Convert File to ArrayBuffer then to Buffer for upload
        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        const { data, error } = await supabase.storage
            .from("vehicles")
            .upload(filePath, buffer, {
                contentType: file.type,
                upsert: false,
            })

        if (error) {
            console.error("Supabase storage error:", error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        // Get public URL
        const { data: urlData } = supabase.storage
            .from("vehicles")
            .getPublicUrl(data.path)

        return NextResponse.json({ url: urlData.publicUrl })
    } catch (err: unknown) {
        console.error("Upload error:", err)
        let errorMessage = "An unknown error occurred."
        if (err instanceof Error) {
            errorMessage = err.message
        } else if (typeof err === 'object' && err !== null && 'message' in err && typeof (err as any).message === 'string') {
            errorMessage = (err as any).message
        }
        return NextResponse.json({ error: errorMessage }, { status: 500 })
    }
}
