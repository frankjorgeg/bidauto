import { HeroCarousel } from "@/components/hero-carousel"
import { Globe, ShieldCheck, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function Home() {
  const steps = [
    {
      title: "Browse & Analyze",
      description: "Access our vast inventory of vehicles with detailed reports, history, and real-time data.",
      icon: Globe,
    },
    {
      title: "Bid or Purchase",
      description: "Join live auctions or buy directly. Our platform ensures secure transactions and bidding.",
      icon: Zap,
    },
    {
      title: "Export & Delivery",
      description: "Complete international documentation and shipping. We handle the complexity of global logistics.",
      icon: ShieldCheck,
    },
  ]
  return (
    <div className="flex flex-col gap-20 pb-20">
      <HeroCarousel />

      {/* How It Works */}
      <section className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Streamlined Export Process</h2>
          <p className="mt-4 text-muted-foreground">From the auction floor to your doorstep, anywhere in the world.</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.title}
            >
              <Card className="h-full hover-card-effect border-muted/50">
                <CardContent className="pt-8 text-center">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <step.icon className="h-8 w-8" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container">
        <div className="rounded-[2.5rem] premium-gradient p-12 md:p-24 text-center text-white relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] transition-all group-hover:bg-primary/20" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl font-black tracking-tight md:text-6xl mb-8 leading-tight">Ready to expand your inventory?</h2>
            <p className="mx-auto max-w-2xl text-white/70 text-lg md:text-xl mb-12 font-medium">
              Join hundreds of international dealers and investors using BidAutoDirect to source quality U.S. vehicles daily.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/contact">
                <Button size="lg" className="h-14 px-12 text-lg font-bold bg-white text-black hover:bg-white/90 rounded-full">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
