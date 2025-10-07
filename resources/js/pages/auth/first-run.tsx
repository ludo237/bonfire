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

const FirstRunPage = () => {
    return (
        <>
            <Head title="Welcome to Bonefire" />
            <Card>
                <CardHeader>
                    <CardTitle>Welcome to Bonefire</CardTitle>
                    <CardDescription>
                        Let's set up your admin account
                    </CardDescription>
                </CardHeader>
                <Form action="/first-run" method="post" disableWhileProcessing>
                    {({ processing, errors }) => (
                        <>
                            <CardContent className="space-y-4">
                                <InputField
                                    label="Your Name"
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
                            </CardContent>
                            <CardFooter>
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={processing}
                                >
                                    Complete Setup
                                </Button>
                            </CardFooter>
                        </>
                    )}
                </Form>
            </Card>
        </>
    );
};

FirstRunPage.layout = (page: ReactElement<PageProps>) => {
    return <GuestLayout>{page}</GuestLayout>;
};

export default FirstRunPage;
