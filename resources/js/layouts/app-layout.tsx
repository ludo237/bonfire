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
                <SidebarInset>
                    <header className="flex shrink-0 items-center py-1.5">
                        <div className="grow px-3">
                            <AppBreadcrumb segments={breadcrumbs} />
                        </div>
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <SidebarTrigger className="-ml-1" />
                    </header>
                    <div className="flex flex-1 flex-col px-4">
                        <div className="w-full py-1.5">
                            <h1 className="text-2xl font-bold">{title}</h1>
                        </div>

                        {children}
                    </div>
                </SidebarInset>
                <AppSidebar
                    collapsible="icon"
                    variant="floating"
                    side="right"
                />
            </SidebarProvider>
        </>
    );
}
