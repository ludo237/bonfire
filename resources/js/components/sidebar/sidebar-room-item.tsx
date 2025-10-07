import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { useRoomIcon } from '@/hooks/use-room-icon';
import RoomController from '@/wayfinder/actions/App/Http/Controllers/RoomController';
import { Link } from '@inertiajs/react';

interface SidebarRoomItemProps {
    room: Room;
}

export function SidebarRoomItem({ room }: SidebarRoomItemProps) {
    const Icon = useRoomIcon(room.type);

    return (
        <SidebarMenuItem>
            <SidebarMenuButton asChild>
                <Link href={RoomController.show(room.id)}>
                    <Icon className="size-4" />
                    <span className="font-medium">{room.name}</span>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
}
