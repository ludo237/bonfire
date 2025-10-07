import { PageHeader } from '@/components/page-header';
import { RoomCard } from '@/components/room-card';
import { Head } from '@inertiajs/react';

interface OrganizationsIndexProps {
    organization: EloquentResource<Organization>;
    rooms: EloquentResource<Room[]>;
}

export default function OrganizationsIndex({
    organization,
    rooms,
}: OrganizationsIndexProps) {
    return (
        <>
            <Head title={organization.data.name} />
            <div className="flex flex-1 flex-col overflow-hidden">
                <PageHeader title="Rooms" />

                <div className="flex-1 overflow-y-auto">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
        </>
    );
}
