import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { SharedPageProps } from '@/types/inertia';
import OrganizationController from '@/wayfinder/actions/App/Http/Controllers/OrganizationController';
import { usePage } from '@inertiajs/react';
import { Fragment } from 'react';

export interface BreadcrumbSegment {
    label: string;
    href?: string;
}

interface AppBreadcrumbProps {
    segments?: BreadcrumbSegment[];
}

export function AppBreadcrumb({ segments = [] }: AppBreadcrumbProps) {
    const { auth } = usePage<SharedPageProps>().props;
    const currentOrganization = auth.currentOrganization?.data;

    // Build breadcrumb items with organization as first item if available
    const items: BreadcrumbSegment[] = [];

    if (currentOrganization) {
        items.push({
            label: currentOrganization.name,
            href: OrganizationController.show(currentOrganization.id).url,
        });
    }

    items.push(...segments);

    // If no segments, show default home breadcrumb
    if (items.length === 0) {
        items.push({ label: 'Home' });
    }

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <Fragment key={index}>
                            <BreadcrumbItem
                                className={index > 0 ? 'hidden md:block' : ''}
                            >
                                {isLast || !item.href ? (
                                    <BreadcrumbPage>
                                        {item.label}
                                    </BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink href={item.href}>
                                        {item.label}
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                            {!isLast && (
                                <BreadcrumbSeparator className="hidden md:block" />
                            )}
                        </Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
