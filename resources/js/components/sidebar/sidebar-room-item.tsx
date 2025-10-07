import {
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useRoomIcon } from '@/hooks/use-room-icon';
import RoomController from '@/wayfinder/actions/App/Http/Controllers/RoomController';
import { Link } from '@inertiajs/react';

interface SidebarRoomItemProps {
    room: Room;
}

export function SidebarRoomItem({
    room,
}: SidebarRoomItemProps) {
    const Icon = useRoomIcon(room.type);
    const memberCount = room.counts?.users ?? 0;
    const messageCount = room.counts?.messages ?? 0;

    return (
        <SidebarMenuItem>
            <SidebarMenuButton asChild>
                <Link
                    href={RoomController.show(room.id)}
                >
                    <Icon className="size-4" />
                    <div className="flex flex-1 flex-col gap-0.5">
                        <span className="font-medium">{room.name}</span>
                        <span className="text-xs text-muted-foreground">
                            {memberCount} {memberCount === 1 ? 'member' : 'members'} • {messageCount} {messageCount === 1 ? 'message' : 'messages'}
                        </span>
                    </div>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
}
