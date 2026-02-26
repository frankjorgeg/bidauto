import { Badge } from "@/components/ui/badge"

export default function AboutPage() {
    return (
        <div className="container py-24">
            <div className="max-w-3xl mx-auto space-y-12">
                <div className="space-y-6">
                    <Badge variant="secondary">Founded 2024</Badge>
                    <h1 className="text-5xl font-black tracking-tight md:text-7xl">Mission Driven Export Solutions.</h1>
                    <p className="text-xl text-muted-foreground leading-relaxed italic">
                        &quot;Removing the friction between the World&apos;s most valuable vehicle inventory and Global demand.&quot;
                    </p>
                </div>

                <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-lg leading-relaxed text-muted-foreground">
                    <p>
                        BidAutoDirect was created by a collective of automotive enthusiasts and logistics experts who saw a fundamental problem in the industry: **The complexity and risk involved in purchasing vehicles from U.S. auctions from abroad.**
                    </p>
                    <p>
                        Traditional export brokers often lack transparency, provide inconsistent reports, and offer fragmented logistics solutions. We built BidAutoDirect to be the single source of truth—a platform where verified data meets professional execution.
                    </p>
                    <h2 className="text-2xl font-bold text-foreground pt-6">Our Core Pillars</h2>
                    <ul className="grid gap-4 list-none pl-0">
                        <li className="p-6 bg-muted/30 rounded-2xl border border-muted/50">
                            <strong className="text-foreground block mb-2 text-xl">Integrity First</strong>
                            We provide unvarnished condition reports. If a vehicle isn&apos;t a good investment, we tell you—even if it means losing a sale.
                        </li>
                        <li className="p-6 bg-muted/30 rounded-2xl border border-muted/50">
                            <strong className="text-foreground block mb-2 text-xl">Operational Excellence</strong>
                            Our boots-on-the-ground team inspects vehicles and manages the chain of custody from the lot to the vessel.
                        </li>
                        <li className="p-6 bg-muted/30 rounded-2xl border border-muted/50">
                            <strong className="text-foreground block mb-2 text-xl">Technological Innovation</strong>
                            We leverage real-time API integrations and data modeling to help you bid with mathematical confidence.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
