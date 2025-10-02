import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';

export default function GuestLayout({
    children,
    title,
}: {
    children: ReactNode;
    title?: string;
}) {
    return (
        <>
            {title && <Head title={title} />}
            <div className="flex min-h-screen items-center justify-center bg-background p-4">
                <div className="w-full max-w-md">{children}</div>
            </div>
        </>
    );
}
