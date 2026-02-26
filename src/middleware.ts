import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
    const sessionCookie = request.cookies.get("bidauto_session")
    const { pathname } = request.nextUrl

    if (pathname.startsWith("/admin") || pathname.startsWith("/dashboard")) {
        if (!sessionCookie) {
            return NextResponse.redirect(new URL("/login", request.url))
        }

        try {
            const userData = JSON.parse(sessionCookie.value)
            if (pathname.startsWith("/admin") && userData.role !== "admin") {
                return NextResponse.redirect(new URL("/dashboard", request.url))
            }
        } catch {
            return NextResponse.redirect(new URL("/login", request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/admin/:path*", "/dashboard/:path*"],
}
