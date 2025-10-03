import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Link } from '@inertiajs/react';

interface RoomCardProps {
    room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
    const roomType = room.type === 'public' ? 'Public' : 'Private';
    const messageCount = room.counts?.messages ?? 0;

    return (
        <Link href={`/rooms/${room.id}`}>
            <Card className="transition-all hover:shadow-md">
                <CardHeader>
                    <CardTitle>{room.name}</CardTitle>
                    <CardDescription>
                        {roomType} • {messageCount} messages
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        Created by {room.owner?.name || 'Unknown'}
                    </p>
                </CardContent>
            </Card>
        </Link>
    );
}
