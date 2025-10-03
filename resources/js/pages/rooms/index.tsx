import { PageHeader } from '@/components/page-header';
import { RoomCard } from '@/components/room-card';
import { Button } from '@/components/ui/button';
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
                <PageHeader
                    title="Rooms"
                    actions={
                        <Link href="/rooms/create">
                            <Button>Create Room</Button>
                        </Link>
                    }
                />

                <div className="flex-1 overflow-y-auto p-6">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {rooms.data.map((room) => (
                            <RoomCard key={room.id} room={room} />
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
