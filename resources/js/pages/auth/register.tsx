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
import { Form, Head } from '@inertiajs/react';
import { ReactElement } from 'react';

interface PageProps extends SharedPageProps {}

const RegisterPage = () => {
    return (
        <>
            <Head title="Register" />
            <Card>
                <CardHeader>
                    <CardTitle>Create Account</CardTitle>
                    <CardDescription>
                        Enter your information to get started
                    </CardDescription>
                </CardHeader>
                <Form action="/register" method="post" disableWhileProcessing>
                    {({ processing, errors }) => (
                        <>
                            <CardContent className="space-y-4">
                                <InputField
                                    label="Name"
                                    name="name"
                                    autoFocus
                                    required
                                    error={errors.name}
                                />

                                <InputField
                                    label="Email"
                                    name="email"
                                    type="email"
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

                                <InputField
                                    label="Confirm Password"
                                    name="password_confirmation"
                                    type="password"
                                    required
                                />
                            </CardContent>
                            <CardFooter>
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={processing}
                                >
                                    Register
                                </Button>
                            </CardFooter>
                        </>
                    )}
                </Form>
            </Card>
        </>
    );
};

RegisterPage.layout = (page: ReactElement<PageProps>) => {
    return <GuestLayout>{page}</GuestLayout>;
};

export default RegisterPage;
