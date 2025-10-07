import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Link, usePage } from '@inertiajs/react';
import { Hash, Lock, User } from 'lucide-react';
import { SharedPageProps } from '@/types/inertia';
import RoomController from '@/wayfinder/actions/App/Http/Controllers/RoomController';

interface RoomCardProps {
    room: Room;
}

const getRoomIcon = (roomType: string) => {
    switch (roomType) {
        case 'public':
            return Hash;
        case 'private':
            return Lock;
        case 'direct':
            return User;
        default:
            return Hash;
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
    const { auth } = usePage<SharedPageProps>().props;
    const organization = auth.currentOrganization?.data;
    const Icon = getRoomIcon(room.type);
    const roomTypeLabel = getRoomTypeLabel(room.type);
    const messageCount = room.counts?.messages ?? 0;

    return (
        <Link
            href={RoomController.show({
                organization: organization?.id,
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
