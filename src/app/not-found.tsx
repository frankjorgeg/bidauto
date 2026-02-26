import Link from "next/link"

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
            <h2 className="text-2xl font-bold font-sans">404 - Page Not Found</h2>
            <p className="text-muted-foreground">The resource you are looking for does not exist.</p>
            <Link
                href="/"
                className="px-4 py-2 bg-primary text-white rounded-md hover:opacity-90 transition-opacity"
            >
                Go Home
            </Link>
        </div>
    );
}
// Simplified and standard NotFound.
