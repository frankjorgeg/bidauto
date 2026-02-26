import { getSession } from "@/lib/auth-service"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SettingsForm } from "./settings-form"

export default async function SettingsPage() {
    const user = await getSession()

    if (!user) {
        redirect("/login")
    }

    return (
        <div className="container max-w-2xl py-10">
            <div className="flex flex-col gap-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                    <p className="text-muted-foreground">Manage your account and security.</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Change Password</CardTitle>
                        <CardDescription>
                            Update your password to keep your account secure.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <SettingsForm />
                    </CardContent>
                </Card>

                <Card className="border-muted/50 bg-muted/20">
                    <CardHeader>
                        <CardTitle className="text-lg">Account Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-center py-2 border-b border-muted">
                            <span className="text-sm font-medium">Name</span>
                            <span className="text-sm text-muted-foreground">{user.name}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-muted">
                            <span className="text-sm font-medium">Email</span>
                            <span className="text-sm text-muted-foreground">{user.email}</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                            <span className="text-sm font-medium">Role</span>
                            <span className="text-sm capitalize text-muted-foreground">{user.role}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
