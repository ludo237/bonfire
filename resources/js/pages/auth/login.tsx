import { InputField } from '@/components/form-field';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import GuestLayout from '@/layouts/guest-layout';
import { SharedPageProps } from '@/types/inertia';
import { Form, Head, Link } from '@inertiajs/react';
import { ReactElement } from 'react';

interface PageProps extends SharedPageProps {
    canResetPassword: boolean;
    status?: string;
}

const LoginPage = ({ canResetPassword, status }: PageProps) => {
    return (
        <>
            <Head title="Login" />
            <Card>
                <CardHeader>
                    <CardTitle>Sign In</CardTitle>
                    <CardDescription>
                        Enter your credentials to access your account
                    </CardDescription>
                </CardHeader>
                <Form action="/login" method="post" disableWhileProcessing>
                    {({ processing, errors }) => (
                        <>
                            <CardContent className="space-y-4">
                                {status && (
                                    <div className="text-sm text-green-600">
                                        {status}
                                    </div>
                                )}

                                <InputField
                                    label="Email"
                                    name="email"
                                    type="email"
                                    autoFocus
                                    required
                                    error={errors.email}
                                />

                                <InputField
                                    label="Password"
                                    name="password"
                                    type="password"
                                    required
                                    error={errors.password}
                                />

                                {canResetPassword && (
                                    <Link
                                        href="/forgot-password"
                                        className="text-sm text-muted-foreground hover:underline"
                                    >
                                        Forgot your password?
                                    </Link>
                                )}
                            </CardContent>
                            <CardFooter>
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={processing}
                                >
                                    Sign In
                                </Button>
                            </CardFooter>
                        </>
                    )}
                </Form>
            </Card>
        </>
    );
};

LoginPage.layout = (page: ReactElement<PageProps>) => {
    return <GuestLayout>{page}</GuestLayout>;
};

export default LoginPage;
