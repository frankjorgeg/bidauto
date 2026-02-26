import { Mail, Phone, MapPin } from "lucide-react"
import { getSettingsAction } from "../admin/settings/actions"
import { ContactForm } from "./contact-form"

export default async function ContactPage() {
    const settings = await getSettingsAction();
    return (
        <div className="container py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                <div className="space-y-12">
                    <div>
                        <h1 className="text-5xl font-black tracking-tight mb-6">Let's connect.</h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            Questions about a specific lot? Need help navigating international customs? Our team is standing by.
                        </p>
                    </div>

                    <div className="space-y-8">
                        <div className="flex gap-4">
                            <div className="shrink-0 h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                                <Mail className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">Email Us</h3>
                                <p className="text-muted-foreground">{settings.email}</p>
                                <p className="text-muted-foreground">support@{settings.email.split('@')[1]}</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="shrink-0 h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                                <Phone className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">Call Us</h3>
                                <p className="text-muted-foreground">{settings.phone}</p>
                                <p className="text-xs text-muted-foreground mt-1">Available Mon-Fri, 9AM - 6PM EST</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="shrink-0 h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                                <MapPin className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">Visit Office</h3>
                                <p className="text-muted-foreground">{settings.address}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-muted/30 p-8 md:p-12 rounded-3xl border border-muted/50 shadow-sm">
                    <ContactForm />
                </div>
            </div>
        </div>
    )
}
