/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Loader2, Save, ArrowLeft, Plus, Upload, Trash2 } from "lucide-react"
import { createVehicleAction } from "../../actions"
import Link from "next/link"

export function NewVehicleForm() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [images, setImages] = useState<string[]>([])
    const [newImageUrl, setNewImageUrl] = useState("")
    const fileInputRef = useRef<HTMLInputElement>(null)

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        try {
            const formData = new FormData(e.currentTarget)
            formData.append("images", JSON.stringify(images))
            const result = await createVehicleAction(formData)
            if (result.success) {
                toast.success("Vehicle created!")
                router.push("/admin")
            } else {
                toast.error(result.error || "Create failed")
            }
        } catch (err: unknown) {
            toast.error("Error: " + (err instanceof Error ? err.message : String(err)))
        } finally {
            setLoading(false)
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
                if (!res.ok) { toast.error(`Upload failed: ${data.error} `); return null }
                return data.url as string
            } catch (err: unknown) { toast.error(`Upload error: ${err instanceof Error ? err.message : String(err)} `); return null }
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

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex items-center gap-4">
                <Link href="/admin"><Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button></Link>
                <div>
                    <h1 className="text-2xl font-bold">New Vehicle</h1>
                    <p className="text-sm text-muted-foreground">Fill in the details to add a new vehicle</p>
                </div>
            </div>

            <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    {/* Core Specs */}
                    <Card>
                        <div className="bg-muted/50 p-4 border-b"><h3 className="font-bold">Core Specs</h3></div>
                        <CardContent className="pt-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2"><Label>Year</Label><Input name="year" type="number" defaultValue={new Date().getFullYear()} required /></div>
                                <div className="space-y-2"><Label>Status</Label>
                                    <select name="status" defaultValue="BIDDING" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                        <option value="BIDDING">Bidding</option><option value="BUYED">Bought</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2"><Label>Make</Label><Input name="make" placeholder="e.g. Toyota" required /></div>
                                <div className="space-y-2"><Label>Model</Label><Input name="model" placeholder="e.g. Camry" required /></div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2"><Label>VIN</Label><Input name="vin" placeholder="Vehicle ID Number" /></div>
                                <div className="space-y-2"><Label>Trim</Label><Input name="trim" placeholder="e.g. Sport" /></div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Vehicle Specs */}
                    <Card>
                        <div className="bg-muted/50 p-4 border-b"><h3 className="font-bold">Vehicle Specifications</h3></div>
                        <CardContent className="pt-6 space-y-4">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2"><Label>Mileage</Label><Input name="mileage" type="number" defaultValue={0} /></div>
                                <div className="space-y-2"><Label>Title Status</Label>
                                    <select name="title_status" defaultValue="SALVAGE" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                        <option value="SALVAGE">Salvage</option><option value="CLEAN">Clean</option><option value="REBUILT">Rebuilt</option><option value="JUNK">Junk</option>
                                    </select>
                                </div>
                                <div className="space-y-2"><Label>Damage</Label><Input name="damage_type" placeholder="e.g. Front End" /></div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2"><Label>Engine</Label><Input name="engine" placeholder="e.g. 2.7L V6" /></div>
                                <div className="space-y-2"><Label>Transmission</Label>
                                    <select name="transmission" defaultValue="AUTO" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                        <option value="AUTO">Auto</option><option value="MANUAL">Manual</option><option value="CVT">CVT</option>
                                    </select>
                                </div>
                                <div className="space-y-2"><Label>Drivetrain</Label>
                                    <select name="drivetrain" defaultValue="FWD" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                        <option value="FWD">FWD</option><option value="RWD">RWD</option><option value="AWD">AWD</option><option value="4WD">4WD</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2"><Label>Fuel Type</Label>
                                    <select name="fuel_type" defaultValue="GAS" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                        <option value="GAS">Gas</option><option value="DIESEL">Diesel</option><option value="ELECTRIC">Electric</option><option value="HYBRID">Hybrid</option>
                                    </select>
                                </div>
                                <div className="space-y-2"><Label>Keys</Label>
                                    <select name="keys" defaultValue="true" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                        <option value="true">Yes</option><option value="false">No</option>
                                    </select>
                                </div>
                                <div className="space-y-2"><Label>Running</Label>
                                    <select name="running_condition" defaultValue="N/A" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                        <option value="YES">Yes</option><option value="NO">No</option><option value="N/A">N/A</option>
                                    </select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Auction Info */}
                    <Card>
                        <div className="bg-muted/50 p-4 border-b"><h3 className="font-bold">Auction Information</h3></div>
                        <CardContent className="pt-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2"><Label>House</Label>
                                    <select name="auction_house" defaultValue="Copart" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                        <option value="Copart">Copart</option><option value="IAAI">IAAI</option><option value="Manheim">Manheim</option><option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="space-y-2"><Label>Lot #</Label><Input name="lot_number" placeholder="e.g. LOT-FBR004" /></div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2"><Label>Auction Date</Label><Input name="auction_date" type="date" /></div>
                                <div className="space-y-2"><Label>Location</Label><Input name="location" placeholder="e.g. Houston, TX" required /></div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Pricing */}
                    <Card>
                        <div className="bg-muted/50 p-4 border-b"><h3 className="font-bold">Pricing & Export Analysis</h3></div>
                        <CardContent className="pt-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2"><Label>Current Bid ($)</Label><Input name="current_bid" type="number" step="0.01" defaultValue="0" /></div>
                                <div className="space-y-2"><Label>Final Price ($)</Label><Input name="final_price" type="number" step="0.01" placeholder="If bought" /></div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2"><Label>Est. Repair ($)</Label><Input name="est_repair_cost" type="number" step="0.01" /></div>
                                <div className="space-y-2"><Label>Market Value ($)</Label><Input name="est_market_value" type="number" step="0.01" /></div>
                                <div className="space-y-2"><Label>Shipping Est. ($)</Label><Input name="shipping_estimate" type="number" step="0.01" /></div>
                            </div>
                            <div className="space-y-2"><Label>Shipping Destination</Label><Input name="destination" placeholder="e.g. Santo Domingo, DR" /></div>
                        </CardContent>
                    </Card>

                    <Button type="submit" className="w-full h-14 text-lg font-bold gap-2" disabled={loading}>
                        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
                        Create Vehicle
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
                                                alt="Vehicle preview"
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
