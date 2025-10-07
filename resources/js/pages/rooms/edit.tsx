import { DangerZone } from '@/components/danger-zone';
import { InputField } from '@/components/form-field';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { useConfirmAction } from '@/hooks/use-confirm-action';
import AppLayout from '@/layouts/app-layout';
import { SharedPageProps } from '@/types/inertia';
import { Head, router, useForm } from '@inertiajs/react';
import { ReactElement } from 'react';

interface PageProps extends SharedPageProps {
    room: EloquentResource<Room>;
}

const RoomEditPage = ({ room }: PageProps) => {
    const roomData = room.data;
    const { data, setData, patch, processing, errors } = useForm({
        name: roomData.name,
    });
    const { confirm } = useConfirmAction();

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(`/rooms/${roomData.id}`);
    };

    const handleDelete = () => {
        confirm('Are you sure you want to delete this room?', () => {
            router.delete(`/rooms/${roomData.id}`);
        });
    };

    return (
        <>
            <Head title="Edit Room" />
            <div className="flex flex-1 items-center justify-center p-6">
                <div className="w-full max-w-md space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Edit Room</CardTitle>
                            <CardDescription>
                                Update room settings
                            </CardDescription>
                        </CardHeader>
                        <form onSubmit={submit}>
                            <CardContent className="space-y-4">
                                <InputField
                                    label="Room Name"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    autoFocus
                                    required
                                    error={errors.name}
                                />

                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={processing}
                                >
                                    Save Changes
                                </Button>
                            </CardContent>
                        </form>
                    </Card>

                    <DangerZone
                        description="Permanently delete this room and all its messages"
                        actionLabel="Delete Room"
                        onAction={handleDelete}
                    />
                </div>
            </div>
        </>
    );
};

RoomEditPage.layout = (page: ReactElement<PageProps>) => {
    return <AppLayout>{page}</AppLayout>;
};

export default RoomEditPage;
