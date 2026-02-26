"use client";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html>
            <body style={{ padding: '2rem', background: '#fee', color: '#991b1b', fontFamily: 'sans-serif' }}>
                <h2>Something went wrong! (Global)</h2>
                <p>{error?.message || "An unexpected error occurred at the root level."}</p>
                <button
                    onClick={() => reset()}
                    style={{ padding: '0.8rem 1.5rem', background: '#991b1b', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Try again
                </button>
            </body>
        </html>
    );
}
// Renamed and standard tags.
