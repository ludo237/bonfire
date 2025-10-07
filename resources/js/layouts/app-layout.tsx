import { AppBreadcrumb, BreadcrumbSegment } from '@/components/app-breadcrumb';
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { Separator } from '@/components/ui/separator';
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import { Head, router } from '@inertiajs/react';
import { ReactNode } from 'react';

export default function AppLayout({
    children,
    title,
    breadcrumbs,
}: {
    children: ReactNode;
    title?: string;
    breadcrumbs?: BreadcrumbSegment[];
}) {
    const handleLogout = () => {
        router.delete('/logout');
    };

    return (
        <>
            {title && <Head title={title} />}
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-6">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <AppBreadcrumb segments={breadcrumbs} />
                    </header>
                    <div className="flex flex-1 flex-col gap-6 p-6">
                        {children}
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}
