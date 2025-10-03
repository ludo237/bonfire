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
import { Form } from '@inertiajs/react';

export default function FirstRun() {
    return (
        <GuestLayout title="Welcome to Bonefire">
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
        </GuestLayout>
    );
}
