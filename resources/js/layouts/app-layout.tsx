import { AppBreadcrumb, BreadcrumbSegment } from '@/components/app-breadcrumb';
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { Separator } from '@/components/ui/separator';
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import { Head } from '@inertiajs/react';
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
    return (
        <>
            {title && <Head title={title} />}
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset className="px-6">
                    <header className="flex h-16 shrink-0 items-center">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <AppBreadcrumb segments={breadcrumbs} />
                    </header>
                    <div className="flex flex-1 flex-col">
                        <div className="border-b bg-background py-6">
                            <h1 className="text-2xl font-bold">{title}</h1>
                        </div>

                        {children}
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}
