import SettingsForm from "./settings-form"

export default function AdminSettingsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Configuration</h1>
                <p className="text-muted-foreground">Manage your site settings and global attributes.</p>
            </div>

            <SettingsForm />
        </div>
    )
}
