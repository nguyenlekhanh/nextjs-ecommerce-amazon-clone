'use client'; // Error components must be Client components

import Link from 'next/link';

export default function ErrorContainer() {
    return (
        <main className="text-center mx-auto py-1 px-4 min-h-screen">
            <h2 className="my-4 text-2xl font-bold">Something went wrong!</h2>
            <p className="text-xl">
                Go back to <Link href="/" className="underline">Home 🏠</Link> or try again
            </p>
        </main>
    );
}