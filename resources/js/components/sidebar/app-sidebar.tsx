import SidebarNavUser from '@/components/nav-user';
import { SidebarRoomItem } from '@/components/sidebar/sidebar-room-item';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInput,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { SharedPageProps } from '@/types/inertia';
import OrganizationController from '@/wayfinder/actions/App/Http/Controllers/OrganizationController';
import { Link, usePage } from '@inertiajs/react';
import { MessageSquare } from 'lucide-react';
import * as React from 'react';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { auth } = usePage<SharedPageProps>().props;
    const user = auth.user!.data;
    const organization = auth.currentOrganization!.data;
    const rooms = organization.rooms;

    return (
        <Sidebar collapsible="icon" variant="floating" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link
                                href={OrganizationController.show(
                                    organization.id,
                                )}
                            >
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <MessageSquare className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">
                                        {organization.name}
                                    </span>
                                    <span className="truncate text-xs">
                                        {rooms.length}{' '}
                                        {rooms.length === 1 ? 'room' : 'rooms'}
                                    </span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Search</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarInput placeholder="Search rooms..." />
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        <span>Rooms</span>
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {rooms.map((room) => (
                                <SidebarRoomItem key={room.id} room={room} />
                            ))}
                        </SidebarMenu>
                        {rooms.length === 0 && (
                            <div className="px-4 py-2 text-sm text-muted-foreground">
                                No rooms yet
                            </div>
                        )}
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarNavUser user={user} />
            </SidebarFooter>
        </Sidebar>
    );
}
