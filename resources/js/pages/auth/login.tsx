import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import GuestLayout from '@/layouts/guest-layout';
import { Form, Link } from '@inertiajs/react';

export default function Login({
    canResetPassword,
    status,
}: {
    canResetPassword: boolean;
    status?: string;
}) {
    return (
        <GuestLayout title="Login">
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

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        autoFocus
                                        required
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-red-600">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
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
        </GuestLayout>
    );
}
