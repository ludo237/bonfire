import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Link } from '@inertiajs/react';

export default function RoomsIndex({
    rooms,
}: {
    rooms: EloquentResource<Room[]>;
}) {
    return (
        <AppLayout title="Rooms">
            <div className="flex flex-1 flex-col overflow-hidden">
                <div className="flex items-center justify-between border-b p-6">
                    <h1 className="text-2xl font-bold">Rooms</h1>
                    <Link href="/rooms/create">
                        <Button>Create Room</Button>
                    </Link>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {rooms.data.map((room) => (
                            <Link key={room.id} href={`/rooms/${room.id}`}>
                                <Card className="transition-all hover:shadow-md">
                                    <CardHeader>
                                        <CardTitle>{room.name}</CardTitle>
                                        <CardDescription>
                                            {room.type === 'public'
                                                ? '🌍 Public'
                                                : '🔒 Private'}{' '}
                                            • {room.counts.messages} messages
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">
                                            Created by{' '}
                                            {room.owner?.name || 'Unknown'}
                                        </p>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}

                        {rooms.data.length === 0 && (
                            <div className="col-span-full text-center text-muted-foreground">
                                No rooms yet. Create one to get started!
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
