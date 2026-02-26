"use client";

export default function RootError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div style={{ padding: '2rem', border: '5px solid red', borderRadius: '8px', margin: '1rem' }}>
            <h2 style={{ color: 'red' }}>App Error Boundary</h2>
            <p style={{ fontWeight: 'bold' }}>{error?.message || "An unexpected error occurred."}</p>
            <button
                onClick={() => reset()}
                style={{ padding: '0.5rem 1rem', background: '#000', color: '#fff', border: 'none', cursor: 'pointer' }}
            >
                Try Again
            </button>
        </div>
    );
}
