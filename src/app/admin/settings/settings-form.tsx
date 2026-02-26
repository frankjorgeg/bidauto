"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { toast } from "sonner"
import { Save, Loader2, Building2, MapPin, Phone, Mail, Lock, User } from "lucide-react"
import { getSettingsAction, updateSettingsAction, CompanySettings } from "./actions"
import { updateCredentialsAction } from "./credential-actions"

export default function SettingsForm() {
    const [settings, setSettings] = useState<CompanySettings | null>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [savingCreds, setSavingCreds] = useState(false)

    useEffect(() => {
        const fetchSettings = async () => {
            const data = await getSettingsAction()
            setSettings(data)
            setLoading(false)
        }
        fetchSettings()
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSaving(true)
        const formData = new FormData(e.currentTarget)
        const result = await updateSettingsAction(formData)

        if (result.success) {
            toast.success("Settings updated!")
        } else {
            toast.error(result.error || "Failed to update settings")
        }
        setSaving(false)
    }

    const handleCredentials = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSavingCreds(true)
        const formData = new FormData(e.currentTarget)
        const newEmail = formData.get("new_email") as string
        const currentPassword = formData.get("current_password") as string
        const newPassword = formData.get("new_password") as string
        const confirmPassword = formData.get("confirm_password") as string

        if (newPassword && newPassword !== confirmPassword) {
            toast.error("New passwords don't match")
            setSavingCreds(false)
            return
        }

        const result = await updateCredentialsAction(currentPassword, newEmail || undefined, newPassword || undefined)

        if (result.success) {
            toast.success("Credentials updated!")
                ; (e.target as HTMLFormElement).reset()
        } else {
            toast.error(result.error || "Failed to update credentials")
        }
        setSavingCreds(false)
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="space-y-8 max-w-2xl mx-auto">
            {/* Company Settings */}
            <Card className="border-muted/50">
                <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                        <Building2 className="h-5 w-5" /> Company Settings
                    </CardTitle>
                    <CardDescription>
                        Update the contact information and branding for the platform.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="company_name" className="flex items-center gap-2">
                                <Building2 className="h-4 w-4 text-muted-foreground" /> Company Name
                            </Label>
                            <Input id="company_name" name="company_name" defaultValue={settings?.company_name} required className="h-11" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address" className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-muted-foreground" /> Address
                            </Label>
                            <Input id="address" name="address" defaultValue={settings?.address} required className="h-11" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="phone" className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-muted-foreground" /> Phone
                                </Label>
                                <Input id="phone" name="phone" defaultValue={settings?.phone} required className="h-11" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-muted-foreground" /> Email
                                </Label>
                                <Input id="email" name="email" type="email" defaultValue={settings?.email} required className="h-11" />
                            </div>
                        </div>

                        <Button type="submit" className="w-full h-11 font-bold" disabled={saving}>
                            {saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : <><Save className="mr-2 h-4 w-4" /> Save Settings</>}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Admin Credentials */}
            <Card className="border-muted/50">
                <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                        <Lock className="h-5 w-5" /> Admin Credentials
                    </CardTitle>
                    <CardDescription>
                        Change your login email and/or password. You must enter your current password to make changes.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleCredentials} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="new_email" className="flex items-center gap-2">
                                <User className="h-4 w-4 text-muted-foreground" /> New Email (optional)
                            </Label>
                            <Input id="new_email" name="new_email" type="email" placeholder="Leave blank to keep current" className="h-11" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="current_password" className="flex items-center gap-2">
                                <Lock className="h-4 w-4 text-muted-foreground" /> Current Password
                            </Label>
                            <Input id="current_password" name="current_password" type="password" required className="h-11" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="new_password">New Password (optional)</Label>
                                <Input id="new_password" name="new_password" type="password" placeholder="Leave blank to keep current" className="h-11" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirm_password">Confirm New Password</Label>
                                <Input id="confirm_password" name="confirm_password" type="password" placeholder="Repeat new password" className="h-11" />
                            </div>
                        </div>

                        <Button type="submit" className="w-full h-11 font-bold" disabled={savingCreds}>
                            {savingCreds ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...</> : <><Lock className="mr-2 h-4 w-4" /> Update Credentials</>}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
