"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Car, Menu, X, User, LogOut, LayoutDashboard, Settings, ChevronLeft } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CompanySettings } from "@/app/admin/settings/actions"

const publicNav = [
    { name: "Home", href: "/" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
]

const adminNav = [
    { name: "Inventory", href: "/admin", icon: Car },
    { name: "Settings", href: "/admin/settings", icon: Settings },
]

interface HeaderProps {
    settings?: CompanySettings
    user?: { name?: string; role?: string } | null
}

export function Header({ settings, user }: HeaderProps) {
    const pathname = usePathname()
    const router = useRouter()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const isAdmin = pathname.startsWith("/admin")
    const isDashboard = pathname.startsWith("/dashboard")
    const isProtected = isAdmin || isDashboard

    const handleLogout = async () => {
        await fetch("/api/logout", { method: "POST" })
        router.push("/login")
        router.refresh()
    }

    // Choose which nav items to show
    const navItems = isAdmin ? adminNav : isDashboard ? [] : publicNav

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Link href={isProtected ? "/admin" : "/"} className="flex items-center space-x-2">
                        <Car className="h-6 w-6 text-primary" />
                        <span className="text-xl font-bold tracking-tight">
                            {settings?.company_name || "BidAutoDirect"}
                        </span>
                    </Link>
                    {isProtected && (
                        <span className="hidden md:inline-flex ml-2 px-2 py-0.5 text-[10px] font-bold uppercase bg-primary/10 text-primary rounded">
                            {isAdmin ? "Admin" : "Dashboard"}
                        </span>
                    )}
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "transition-colors hover:text-primary",
                                pathname === item.href ? "text-primary font-semibold" : "text-muted-foreground"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Right side: auth button */}
                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="hidden md:flex items-center gap-3">
                            <span className="text-sm text-muted-foreground">
                                {user.name}
                            </span>
                            <Button variant="ghost" size="sm" className="gap-2" onClick={handleLogout}>
                                <LogOut className="h-4 w-4" />
                                Log Out
                            </Button>
                        </div>
                    ) : (
                        <Link href="/login" className="hidden md:block">
                            <Button variant="ghost" size="sm" className="gap-2">
                                <User className="h-4 w-4" />
                                Sign In
                            </Button>
                        </Link>
                    )}

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t bg-background p-4 animate-in slide-in-from-top-5">
                    <nav className="flex flex-col space-y-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary",
                                    pathname === item.href ? "text-primary" : "text-muted-foreground"
                                )}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <hr className="my-2" />
                        {user ? (
                            <Button variant="outline" className="w-full gap-2" onClick={() => { handleLogout(); setMobileMenuOpen(false) }}>
                                <LogOut className="h-4 w-4" /> Log Out
                            </Button>
                        ) : (
                            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                                <Button variant="outline" className="w-full">Sign In</Button>
                            </Link>
                        )}
                    </nav>
                </div>
            )}
        </header>
    )
}
