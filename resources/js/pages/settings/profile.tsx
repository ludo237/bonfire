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
import { Textarea } from '@/components/ui/textarea';
import SettingsLayout from '@/layouts/settings-layout';
import { SharedPageProps } from '@/types/inertia';
import { Form, router, usePage } from '@inertiajs/react';

export default function ProfileSettings() {
    const user: User = usePage<SharedPageProps>().props.auth.user?.data;
    const handleDelete = () => {
        if (
            confirm(
                'Are you sure you want to delete your account? This action cannot be undone and will remove all your data.',
            )
        ) {
            router.delete('/user');
        }
    };

    return (
        <SettingsLayout title="Profile Settings">
            <Card>
                <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                        Update your account's profile information
                    </CardDescription>
                </CardHeader>
                <Form action="/users/me" method="patch" disableWhileProcessing>
                    {({ processing, errors }) => (
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    defaultValue={user.name}
                                    required
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-600">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    defaultValue={user.email}
                                    required
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-600">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bio">Bio</Label>
                                <Textarea
                                    id="bio"
                                    name="bio"
                                    defaultValue={user.bio || ''}
                                    placeholder="Tell us about yourself..."
                                    rows={3}
                                />
                                {errors.bio && (
                                    <p className="text-sm text-red-600">
                                        {errors.bio}
                                    </p>
                                )}
                            </div>

                            <Button type="submit" disabled={processing}>
                                Save Changes
                            </Button>
                        </CardContent>
                    )}
                </Form>
            </Card>

            <Card className="mt-6 border-red-200">
                <CardHeader>
                    <CardTitle className="text-red-600">Danger Zone</CardTitle>
                    <CardDescription>
                        Permanently delete your account and all associated data
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="destructive" onClick={handleDelete}>
                        Delete Account
                    </Button>
                </CardContent>
            </Card>
        </SettingsLayout>
    );
}
