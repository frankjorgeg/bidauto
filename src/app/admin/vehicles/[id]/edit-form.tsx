"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { Trash2, Loader2, Save, ArrowLeft, Plus, Upload } from "lucide-react"
import { updateVehicleAction, deleteVehicleAction } from "../../actions"
import Link from "next/link"

interface Vehicle {
    id: string
    year: number
    make: string
    model: string
    status: string
    vin?: string
    trim?: string
    mileage?: number
    title_status?: string
    damage_type?: string
    engine?: string
    transmission?: string
    drivetrain?: string
    fuel_type?: string
    keys?: boolean
    running_condition?: string
    auction_house?: string
    lot_number?: string
    auction_date?: string
    location?: string
    current_bid?: number
    final_price?: number
    est_repair_cost?: number
    est_market_value?: number
    shipping_estimate?: number
    destination?: string
    images?: string[]
}

interface VehicleEditFormProps {
    vehicle: Vehicle
}

export function VehicleEditForm({ vehicle }: VehicleEditFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [images, setImages] = useState<string[]>(
        Array.isArray(vehicle.images) ? vehicle.images : []
    )
    const [newImageUrl, setNewImageUrl] = useState("")
    const fileInputRef = useRef<HTMLInputElement>(null)

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        try {
            const formData = new FormData(e.currentTarget)
            formData.append("images", JSON.stringify(images))
            const result = await updateVehicleAction(formData)
            if (result.success) {
                toast.success("Vehicle updated!")
                router.push("/admin")
            } else {
                toast.error(result.error || "Update failed")
            }
        } catch (err: unknown) {
            toast.error("Error: " + (err instanceof Error ? err.message : String(err)))
        } finally {
            setLoading(false)
        }
    }

    async function handleDelete() {
        if (!confirm("Are you sure?")) return
        setDeleting(true)
        const result = await deleteVehicleAction(vehicle.id)
        if (result.success) {
            toast.success("Deleted!")
            router.push("/admin")
        } else {
            toast.error(result.error || "Delete failed")
            setDeleting(false)
        }
    }

    function addImageByUrl() {
        if (newImageUrl.trim()) {
            setImages((prev: string[]) => [...prev, newImageUrl.trim()])
            setNewImageUrl("")
        }
    }

    function removeImage(index: number) {
        setImages((prev: string[]) => prev.filter((_: string, i: number) => i !== index))
    }

    async function handleFileUpload(files: FileList | null) {
        if (!files || files.length === 0) return
        setUploading(true)
        const uploadPromises = Array.from(files).map(async (file) => {
            const formData = new FormData()
            formData.append("file", file)
            try {
                const res = await fetch("/api/upload", { method: "POST", body: formData })
                const data = await res.json()
                if (!res.ok) { toast.error(`Upload failed: ${data.error}`); return null }
                return data.url as string
            } catch (err: unknown) { toast.error(`Upload error: ${err instanceof Error ? err.message : String(err)}`); return null }
        })
        const results = await Promise.all(uploadPromises)
        const urls = results.filter((url): url is string => url !== null)
        if (urls.length > 0) {
            setImages((prev: string[]) => [...prev, ...urls])
            toast.success(`${urls.length} image(s) uploaded!`)
        }
        setUploading(false)
        if (fileInputRef.current) fileInputRef.current.value = ""
    }

    const fmtDate = (d: string | null | undefined) => d ? new Date(d).toISOString().split("T")[0] : ""

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin"><Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button></Link>
                    <div>
                        <h1 className="text-2xl font-bold">Edit Vehicle</h1>
                        <p className="text-sm text-muted-foreground">{vehicle.year} {vehicle.make} {vehicle.model}</p>
                    </div>
                </div>
                <Button variant="destructive" size="sm" onClick={handleDelete} disabled={deleting} className="gap-2">
                    {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                    Delete Vehicle
                </Button>
            </div>

            <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                    {/* Core Specs */}
                    <Card>
                        <div className="bg-muted/50 p-4 border-b"><h3 className="font-bold">Core Specs</h3></div>
                        <CardContent className="pt-6 space-y-4">
                            <input type="hidden" name="id" value={vehicle.id} />
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="year">Year</Label>
                                    <Input id="year" name="year" type="number" defaultValue={vehicle.year} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <select id="status" name="status" defaultValue={vehicle.status}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                        <option value="BIDDING">Bidding</option>
                                        <option value="BUYED">Bought</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="make">Make</Label>
                                    <Input id="make" name="make" defaultValue={vehicle.make} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="model">Model</Label>
                                    <Input id="model" name="model" defaultValue={vehicle.model} required />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="vin">VIN</Label>
                                    <Input id="vin" name="vin" defaultValue={vehicle.vin || ""} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="trim">Trim</Label>
                                    <Input id="trim" name="trim" defaultValue={vehicle.trim || ""} placeholder="e.g. Sport, Limited" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Vehicle Specifications */}
                    <Card>
                        <div className="bg-muted/50 p-4 border-b"><h3 className="font-bold">Vehicle Specifications</h3></div>
                        <CardContent className="pt-6 space-y-4">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="mileage">Mileage</Label>
                                    <Input id="mileage" name="mileage" type="number" defaultValue={vehicle.mileage || 0} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="title_status">Title Status</Label>
                                    <select id="title_status" name="title_status" defaultValue={vehicle.title_status || "SALVAGE"}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                        <option value="SALVAGE">Salvage</option>
                                        <option value="CLEAN">Clean</option>
                                        <option value="REBUILT">Rebuilt</option>
                                        <option value="JUNK">Junk</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="damage_type">Damage</Label>
                                    <Input id="damage_type" name="damage_type" defaultValue={vehicle.damage_type || ""} placeholder="e.g. Front End" />
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="engine">Engine</Label>
                                    <Input id="engine" name="engine" defaultValue={vehicle.engine || ""} placeholder="e.g. 2.7L V6" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="transmission">Transmission</Label>
                                    <select id="transmission" name="transmission" defaultValue={vehicle.transmission || "AUTO"}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                        <option value="AUTO">Auto</option>
                                        <option value="MANUAL">Manual</option>
                                        <option value="CVT">CVT</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="drivetrain">Drivetrain</Label>
                                    <select id="drivetrain" name="drivetrain" defaultValue={vehicle.drivetrain || "FWD"}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                        <option value="FWD">FWD</option>
                                        <option value="RWD">RWD</option>
                                        <option value="AWD">AWD</option>
                                        <option value="4WD">4WD</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="fuel_type">Fuel Type</Label>
                                    <select id="fuel_type" name="fuel_type" defaultValue={vehicle.fuel_type || "GAS"}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                        <option value="GAS">Gas</option>
                                        <option value="DIESEL">Diesel</option>
                                        <option value="ELECTRIC">Electric</option>
                                        <option value="HYBRID">Hybrid</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="keys">Keys</Label>
                                    <select id="keys" name="keys" defaultValue={vehicle.keys === false ? "false" : "true"}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="running_condition">Running</Label>
                                    <select id="running_condition" name="running_condition" defaultValue={vehicle.running_condition || "N/A"}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                        <option value="YES">Yes</option>
                                        <option value="NO">No</option>
                                        <option value="N/A">N/A</option>
                                    </select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Auction Information */}
                    <Card>
                        <div className="bg-muted/50 p-4 border-b"><h3 className="font-bold">Auction Information</h3></div>
                        <CardContent className="pt-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="auction_house">House</Label>
                                    <select id="auction_house" name="auction_house" defaultValue={vehicle.auction_house || "Copart"}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                        <option value="Copart">Copart</option>
                                        <option value="IAAI">IAAI</option>
                                        <option value="Manheim">Manheim</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lot_number">Lot #</Label>
                                    <Input id="lot_number" name="lot_number" defaultValue={vehicle.lot_number || ""} placeholder="e.g. LOT-FBR004" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="auction_date">Auction Date</Label>
                                    <Input id="auction_date" name="auction_date" type="date" defaultValue={fmtDate(vehicle.auction_date)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="location">Location</Label>
                                    <Input id="location" name="location" defaultValue={vehicle.location || ""} placeholder="e.g. Houston, TX" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Pricing & Export */}
                    <Card>
                        <div className="bg-muted/50 p-4 border-b"><h3 className="font-bold">Pricing & Export Analysis</h3></div>
                        <CardContent className="pt-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="current_bid">Current Bid ($)</Label>
                                    <Input id="current_bid" name="current_bid" type="number" step="0.01" defaultValue={vehicle.current_bid || 0} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="final_price">Final Price ($)</Label>
                                    <Input id="final_price" name="final_price" type="number" step="0.01" defaultValue={vehicle.final_price || ""} placeholder="If bought" />
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="est_repair_cost">Est. Repair Cost ($)</Label>
                                    <Input id="est_repair_cost" name="est_repair_cost" type="number" step="0.01" defaultValue={vehicle.est_repair_cost || ""} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="est_market_value">Market Value ($)</Label>
                                    <Input id="est_market_value" name="est_market_value" type="number" step="0.01" defaultValue={vehicle.est_market_value || ""} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="shipping_estimate">Shipping Est. ($)</Label>
                                    <Input id="shipping_estimate" name="shipping_estimate" type="number" step="0.01" defaultValue={vehicle.shipping_estimate || ""} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="destination">Shipping Destination</Label>
                                <Input id="destination" name="destination" defaultValue={vehicle.destination || ""} placeholder="e.g. Santo Domingo, DR" />
                            </div>
                        </CardContent>
                    </Card>

                    <Button type="submit" className="w-full h-14 text-lg font-bold gap-2" disabled={loading}>
                        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
                        Save Changes
                    </Button>
                </div>

                {/* Right Column — Images */}
                <div className="space-y-6">
                    <Card>
                        <div className="bg-muted/50 p-4 border-b flex items-center justify-between">
                            <h3 className="font-bold">Images</h3>
                            <Badge variant="outline">{images.length} photos</Badge>
                        </div>
                        <CardContent className="pt-6 space-y-4">
                            {images.length > 0 && (
                                <div className="grid grid-cols-2 gap-3">
                                    {images.map((url: string, i: number) => (
                                        <div key={i} className="relative group aspect-video rounded-lg overflow-hidden border">
                                            <Image
                                                src={url}
                                                alt={`Photo ${i + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                            <button type="button" onClick={() => removeImage(i)}
                                                className="absolute top-1 right-1 bg-destructive text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Trash2 className="h-3 w-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="space-y-3">
                                <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" multiple className="hidden"
                                    onChange={(e) => handleFileUpload(e.target.files)} />
                                <Button type="button" variant="outline" className="w-full h-12 gap-2 border-dashed"
                                    onClick={() => fileInputRef.current?.click()} disabled={uploading || loading}>
                                    {uploading ? <><Loader2 className="h-4 w-4 animate-spin" /> Uploading...</> : <><Upload className="h-4 w-4" /> Upload from Computer</>}
                                </Button>
                                <p className="text-[10px] text-muted-foreground text-center">JPG, PNG, WebP or GIF • Max 5MB per file</p>
                            </div>
                            <div className="relative"><div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div><div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">or paste url</span></div></div>
                            <div className="flex gap-2">
                                <Input placeholder="https://example.com/image.jpg" value={newImageUrl}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewImageUrl(e.target.value)} className="flex-1" />
                                <Button type="button" variant="secondary" onClick={addImageByUrl} disabled={!newImageUrl.trim()}>
                                    <Plus className="h-4 w-4 mr-1" /> Add
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </form>
        </div>
    )
}
