import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Globe, ShieldCheck, Zap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

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
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-slate-950 text-white">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80 z-10" />
          <Image
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop"
            alt="Premium Porsche"
            fill
            className="object-cover opacity-60 scale-105"
            priority
          />
        </div>

        <div className="container relative z-20">
          <div className="mx-auto max-w-4xl text-center">
            <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000">
              <Badge variant="outline" className="mb-6 border-white/20 bg-white/5 backdrop-blur-sm text-white px-4 py-1 text-sm">
                The Gold Standard in Auto Export
              </Badge>
              <h1 className="text-5xl font-black tracking-tight sm:text-7xl md:text-8xl lg:text-9xl uppercase italic leading-[0.9]">
                BID SMART.<br />
                <span className="text-white tracking-tighter not-italic">BUY SECURE.</span>
              </h1>
              <p className="mt-8 text-xl text-white/70 leading-relaxed max-w-2xl mx-auto font-medium">
                Access verified luxury and performance vehicles from major U.S. auctions.
                Full logistics, documentation, and global delivery handled by experts.
              </p>
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link href="/auctions">
                  <Button size="lg" className="h-14 px-10 text-lg font-bold rounded-full group">
                    Live Auctions
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/how-it-works">
                  <Button variant="outline" size="lg" className="h-14 px-10 text-lg font-bold rounded-full border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10">
                    Process Guide
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Stats */}
        <div className="absolute bottom-12 left-0 right-0 z-20 hidden md:block">
          <div className="container flex justify-around items-center border-t border-white/10 pt-8 text-white/50 text-sm font-bold tracking-widest uppercase">
            <div className="flex items-center gap-2 italic"><Globe className="h-4 w-4" /> Global Delivery</div>
            <div className="flex items-center gap-2 italic"><ShieldCheck className="h-4 w-4" /> Insured Cargo</div>
            <div className="flex items-center gap-2 italic"><Zap className="h-4 w-4" /> Rapid Document Processing</div>
          </div>
        </div>
      </section>

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
