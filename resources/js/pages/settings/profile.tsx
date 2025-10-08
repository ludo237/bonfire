import { DangerZone } from '@/components/danger-zone';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useConfirmAction } from '@/hooks/use-confirm-action';
import SettingsLayout from '@/layouts/settings-layout';
import { SharedPageProps } from '@/types/inertia';
import ProfileController from '@/wayfinder/actions/App/Http/Controllers/Settings/ProfileController';
import { Form, Head, router, usePage } from '@inertiajs/react';
import { ReactElement, useState } from 'react';

const ProfileSettingsPage = () => {
    const user: User = usePage<SharedPageProps>().props.auth.user!.data;
    const { confirm } = useConfirmAction();
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    const handleDelete = () => {
        confirm(
            'Are you sure you want to delete your account? This action cannot be undone and will remove all your data.',
            () => {
                router.delete('/user');
            },
        );
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setAvatarPreview(null);
        }
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
                    <CardContent>
                        <Form
                            action={ProfileController.update()}
                            method="put"
                            disableWhileProcessing
                        >
                            {({ processing, errors }) => (
                                <FieldGroup>
                                    <Field>
                                        <FieldLabel htmlFor="avatar">
                                            Avatar
                                        </FieldLabel>
                                        <div className="flex items-center gap-4">
                                            <Avatar className="size-16">
                                                <AvatarImage
                                                    src={
                                                        avatarPreview ||
                                                        user.avatar?.url
                                                    }
                                                    alt={user.name}
                                                />
                                                <AvatarFallback>
                                                    {user.initials}
                                                </AvatarFallback>
                                            </Avatar>
                                            <Input
                                                id="avatar"
                                                type="file"
                                                name="avatar"
                                                accept="image/jpeg,image/jpg,image/png,image/gif"
                                                onChange={handleAvatarChange}
                                                className="flex-1"
                                            />
                                        </div>
                                        {errors.avatar && (
                                            <FieldError>
                                                {errors.avatar}
                                            </FieldError>
                                        )}
                                        <FieldDescription>
                                            JPG, PNG or GIF. Max size 2MB
                                        </FieldDescription>
                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="name">
                                            Name
                                        </FieldLabel>
                                        <Input
                                            id="name"
                                            type="text"
                                            name="name"
                                            defaultValue={user.name}
                                            required
                                        />
                                        {errors.name && (
                                            <FieldError>
                                                {errors.name}
                                            </FieldError>
                                        )}
                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="email">
                                            Email
                                        </FieldLabel>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            defaultValue={user.email}
                                            required
                                        />
                                        {errors.email && (
                                            <FieldError>
                                                {errors.email}
                                            </FieldError>
                                        )}
                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="biography">
                                            Biography
                                        </FieldLabel>
                                        <Textarea
                                            id="biography"
                                            name="biography"
                                            defaultValue={user.biography || ''}
                                            placeholder="Tell us about yourself..."
                                            rows={3}
                                        />
                                        {errors.biography && (
                                            <FieldError>
                                                {errors.biography}
                                            </FieldError>
                                        )}
                                    </Field>

                                    <Field>
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                        >
                                            Save Changes
                                        </Button>
                                    </Field>
                                </FieldGroup>
                            )}
                        </Form>
                    </CardContent>
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

ProfileSettingsPage.layout = (page: ReactElement) => {
    return <SettingsLayout title="Your profile">{page}</SettingsLayout>;
};

export default ProfileSettingsPage;
