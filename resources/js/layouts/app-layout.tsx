import { Button } from '@/components/ui/button';
import { Head, Link, router } from '@inertiajs/react';
import { ReactNode } from 'react';

export default function AppLayout({
    children,
    title,
}: {
    children: ReactNode;
    title?: string;
}) {
    const handleLogout = () => {
        router.delete('/logout');
    };

    return (
        <>
            {title && <Head title={title} />}
            <div className="flex h-screen bg-background">
                {/* Sidebar */}
                <div className="flex w-64 flex-col border-r bg-muted/40">
                    <div className="border-b p-4">
                        <h1 className="text-xl font-bold">Bonefire</h1>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4">
                        <nav className="space-y-1">
                            <Link
                                href="/rooms"
                                className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
                            >
                                Rooms
                            </Link>
                            <Link
                                href="/users/me"
                                className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
                            >
                                Profile
                            </Link>
                        </nav>
                    </div>

                    <div className="border-t p-4">
                        <Button
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </div>
                </div>

                {/* Main content */}
                <div className="flex flex-1 flex-col overflow-hidden">
                    {children}
                </div>
            </div>
        </>
    );
}
