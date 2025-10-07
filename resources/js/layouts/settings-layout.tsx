import { Link } from '@inertiajs/react';
import { ReactNode } from 'react';
import AppLayout from './app-layout';

export default function SettingsLayout({
    children,
    title,
}: {
    children: ReactNode;
    title?: string;
}) {
    return (
        <AppLayout title={title}>
            <div className="flex flex-1 flex-col overflow-hidden">
                <div className="border-b bg-background p-6">
                    <h1 className="text-2xl font-bold">Settings</h1>
                </div>

                <div className="flex flex-1 overflow-hidden">
                    <nav className="w-56 space-y-1 border-r p-4">
                        <Link
                            href="/users/me"
                            className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
                        >
                            Profile
                        </Link>
                        <Link
                            href="/users/me/security/password"
                            className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
                        >
                            Password
                        </Link>
                        <Link
                            href="/users/me/security/two-factor-authentication"
                            className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
                        >
                            Two-Factor Auth
                        </Link>

                        <Link
                            href="/users/me/settings/appearance"
                            className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
                        >
                            Settings
                        </Link>
                    </nav>
                    <div className="flex-1 overflow-y-auto p-6">{children}</div>
                </div>
            </div>
        </AppLayout>
    );
}
