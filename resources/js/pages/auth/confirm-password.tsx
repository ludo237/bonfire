import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import GuestLayout from '@/layouts/guest-layout';
import ConfirmablePasswordController from '@/wayfinder/actions/Laravel/Fortify/Http/Controllers/ConfirmablePasswordController';
import { Form, Head } from '@inertiajs/react';
import { IconLoader2 } from '@tabler/icons-react';
import { ReactElement } from 'react';

const ConfirmPasswordPage = () => {
    return (
        <>
            <Head title="Confirm Password" />
            <Form
                action={ConfirmablePasswordController.store()}
                disableWhileProcessing
                resetOnSuccess={['password']}
            >
                {({ processing, errors }) => (
                    <div className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Password"
                                autoComplete="current-password"
                                autoFocus
                            />

                            {errors.password && (
                                <p className="text-sm text-red-600">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center">
                            <Button
                                className="w-full"
                                disabled={processing}
                                data-test="confirm-password-button"
                            >
                                {processing && (
                                    <IconLoader2 className="h-4 w-4 animate-spin" />
                                )}
                                Confirm password
                            </Button>
                        </div>
                    </div>
                )}
            </Form>
        </>
    );
};

ConfirmPasswordPage.layout = (page: ReactElement) => {
    return <GuestLayout>{page}</GuestLayout>;
};

export default ConfirmPasswordPage;
