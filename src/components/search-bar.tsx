"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"

export function SearchBar() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [query, setQuery] = useState(searchParams.get("q") || "")

    const handleSearch = (value: string) => {
        setQuery(value)
        const params = new URLSearchParams(searchParams.toString())
        if (value.trim()) {
            params.set("q", value.trim())
        } else {
            params.delete("q")
        }
        router.replace(`/admin?${params.toString()}`)
    }

    return (
        <div className="relative w-64">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
                placeholder="Search by make, model, VIN or Lot #..."
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-8 pr-8 h-9"
            />
            {query && (
                <button
                    onClick={() => handleSearch("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                    <X className="h-4 w-4" />
                </button>
            )}
        </div>
    )
}
