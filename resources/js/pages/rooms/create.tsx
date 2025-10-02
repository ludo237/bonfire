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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import AppLayout from '@/layouts/app-layout';
import { useForm } from '@inertiajs/react';

export default function CreateRoom() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        type: 'public',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/rooms');
    };

    return (
        <AppLayout title="Create Room">
            <div className="flex flex-1 items-center justify-center p-6">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Create Room</CardTitle>
                        <CardDescription>
                            Create a new chat room for your team
                        </CardDescription>
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
                                    placeholder="General Chat"
                                    autoFocus
                                    required
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-600">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label>Room Type</Label>
                                <RadioGroup
                                    value={data.type}
                                    onValueChange={(value) =>
                                        setData('type', value)
                                    }
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value="public"
                                            id="public"
                                        />
                                        <Label
                                            htmlFor="public"
                                            className="font-normal"
                                        >
                                            Public - Everyone can join
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value="closed"
                                            id="closed"
                                        />
                                        <Label
                                            htmlFor="closed"
                                            className="font-normal"
                                        >
                                            Private - Invite only
                                        </Label>
                                    </div>
                                </RadioGroup>
                                {errors.type && (
                                    <p className="text-sm text-red-600">
                                        {errors.type}
                                    </p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={processing}
                            >
                                Create Room
                            </Button>
                        </CardContent>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}
