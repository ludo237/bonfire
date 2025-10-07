import { DangerZone } from '@/components/danger-zone';
import { InputField, TextareaField } from '@/components/form-field';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { useConfirmAction } from '@/hooks/use-confirm-action';
import SettingsLayout from '@/layouts/settings-layout';
import { SharedPageProps } from '@/types/inertia';
import { Form, Head, router, usePage } from '@inertiajs/react';
import { ReactElement } from 'react';

interface PageProps extends SharedPageProps {}

const ProfileSettingsPage = () => {
    const user: User = usePage<SharedPageProps>().props.auth.user!.data;
    const { confirm } = useConfirmAction();

    const handleDelete = () => {
        confirm(
            'Are you sure you want to delete your account? This action cannot be undone and will remove all your data.',
            () => {
                router.delete('/user');
            },
        );
    };

    return (
        <>
            <Head title="Profile Settings" />
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>
                            Update your account's profile information
                        </CardDescription>
                    </CardHeader>
                    <Form
                        action="/users/me"
                        method="patch"
                        disableWhileProcessing
                    >
                        {({ processing, errors }) => (
                            <CardContent className="space-y-4">
                                <InputField
                                    label="Name"
                                    name="name"
                                    defaultValue={user.name}
                                    required
                                    error={errors.name}
                                />

                                <InputField
                                    label="Email"
                                    name="email"
                                    type="email"
                                    defaultValue={user.email}
                                    required
                                    error={errors.email}
                                />

                                <TextareaField
                                    label="Bio"
                                    name="bio"
                                    defaultValue={user.biography || ''}
                                    placeholder="Tell us about yourself..."
                                    rows={3}
                                    error={errors.bio}
                                />

                                <Button type="submit" disabled={processing}>
                                    Save Changes
                                </Button>
                            </CardContent>
                        )}
                    </Form>
                </Card>

                <DangerZone
                    description="Permanently delete your account and all associated data"
                    actionLabel="Delete Account"
                    onAction={handleDelete}
                />
            </div>
        </>
    );
};

ProfileSettingsPage.layout = (page: ReactElement<PageProps>) => {
    return <SettingsLayout>{page}</SettingsLayout>;
};

export default ProfileSettingsPage;
