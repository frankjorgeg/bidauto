import Link from "next/link"
import { Car, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { CompanySettings } from "@/app/admin/settings/actions"

interface FooterProps {
    settings?: CompanySettings
}

export function Footer({ settings }: FooterProps) {
    const companyName = settings?.company_name || "BidAutoDirect"

    return (
        <footer className="border-t bg-muted/50">
            <div className="container py-12 md:py-16">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <Car className="h-6 w-6 text-primary" />
                            <span className="text-xl font-bold tracking-tight">{companyName}</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Premium U.S. Auto Auctions & International Export Solutions. Access verified vehicles and export worldwide with confidence.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-muted-foreground hover:text-primary">
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary">
                                <Instagram className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary">
                                <Linkedin className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>



                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">Company</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/how-it-works" className="hover:text-primary transition-colors">How It Works</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                            <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">Contact Us</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span>{settings?.address || "123 Auction Way, Miami, FL 33101"}</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                <span>{settings?.phone || "+1 (800) BID-AUTO"}</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                <span>{settings?.email || "contact@bidautodirect.com"}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} {companyName}. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
