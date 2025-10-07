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
import SettingsLayout from '@/layouts/settings-layout';
import { Form, Head } from '@inertiajs/react';
import { ReactElement } from 'react';

const PasswordSettingsPage = () => {
    return (
        <>
            <Head title="Change Password" />
            <Card>
                <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>
                        Update your password to keep your account secure
                    </CardDescription>
                </CardHeader>
                <Form
                    action="/user/security/password"
                    method="put"
                    resetOnSuccess
                    disableWhileProcessing
                >
                    {({ processing, errors }) => (
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="current_password">
                                    Current Password
                                </Label>
                                <Input
                                    id="current_password"
                                    type="password"
                                    name="current_password"
                                    required
                                />
                                {errors.current_password && (
                                    <p className="text-sm text-red-600">
                                        {errors.current_password}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">New Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                />
                                {errors.password && (
                                    <p className="text-sm text-red-600">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password_confirmation">
                                    Confirm New Password
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    required
                                />
                            </div>

                            <Button type="submit" disabled={processing}>
                                Update Password
                            </Button>
                        </CardContent>
                    )}
                </Form>
            </Card>
        </>
    );
};

PasswordSettingsPage.layout = (page: ReactElement) => {
    return <SettingsLayout title="Security">{page}</SettingsLayout>;
};

export default PasswordSettingsPage;
