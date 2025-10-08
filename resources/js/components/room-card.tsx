import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import RoomController from '@/wayfinder/actions/App/Http/Controllers/RoomController';
import { Link } from '@inertiajs/react';
import { IconHash, IconLock, IconUser } from '@tabler/icons-react';

interface RoomCardProps {
    room: Room;
}

const getRoomIcon = (roomType: string) => {
    switch (roomType) {
        case 'public':
            return IconHash;
        case 'private':
            return IconLock;
        case 'direct':
            return IconUser;
        default:
            return IconHash;
    }
};

const getRoomTypeLabel = (roomType: string) => {
    switch (roomType) {
        case 'public':
            return 'Public';
        case 'private':
            return 'Private';
        case 'direct':
            return 'Direct';
        default:
            return roomType;
    }
};

export function RoomCard({ room }: RoomCardProps) {
    const Icon = getRoomIcon(room.type);
    const roomTypeLabel = getRoomTypeLabel(room.type);
    const messageCount = room.counts?.messages ?? 0;

    return (
        <Link
            href={RoomController.show({
                room: room.id,
            })}
        >
            <Card className="rounded-lg border transition-all hover:border-primary hover:shadow-md">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Icon className="size-5 text-muted-foreground" />
                        <CardTitle>{room.name}</CardTitle>
                    </div>
                    <CardDescription>
                        {roomTypeLabel} • {messageCount} messages
                    </CardDescription>
                </CardHeader>
            </Card>
        </Link>
    );
}
