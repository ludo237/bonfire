import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { router, useForm } from '@inertiajs/react';

export default function EditRoom({ room }: { room: EloquentResource<Room> }) {
    const roomData = room.data;
    const { data, setData, patch, processing, errors } = useForm({
        name: roomData.name,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(`/rooms/${roomData.id}`);
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this room?')) {
            router.delete(`/rooms/${roomData.id}`);
        }
    };

    return (
        <AppLayout title="Edit Room">
            <div className="flex flex-1 items-center justify-center p-6">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Edit Room</CardTitle>
                        <CardDescription>Update room settings</CardDescription>
                    </CardHeader>
                    <form onSubmit={submit}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Room Name</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    autoFocus
                                    required
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-600">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div className="flex gap-2">
                                <Button
                                    type="submit"
                                    className="flex-1"
                                    disabled={processing}
                                >
                                    Save Changes
                                </Button>
                                <Button
                                    type="button"
                                    variant="destructive"
                                    onClick={handleDelete}
                                    disabled={processing}
                                >
                                    Delete
                                </Button>
                            </div>
                        </CardContent>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}
