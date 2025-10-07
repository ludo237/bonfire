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
import { Form, Head } from '@inertiajs/react';

export default function ResetPassword({
    token,
    email,
}: {
    token: string;
    email: string;
}) {
    return (
        <>
            <Head title="Reset Password" />
            <Card>
                <CardHeader>
                    <CardTitle>Reset Password</CardTitle>
                    <CardDescription>Enter your new password</CardDescription>
                </CardHeader>
                <Form
                    action="/reset-password"
                    method="post"
                    disableWhileProcessing
                >
                    {({ processing, errors }) => (
                        <>
                            <input type="hidden" name="token" value={token} />
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        defaultValue={email}
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
                                    <Label htmlFor="password">
                                        New Password
                                    </Label>
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
                                        Confirm Password
                                    </Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        required
                                    />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={processing}
                                >
                                    Reset Password
                                </Button>
                            </CardFooter>
                        </>
                    )}
                </Form>
            </Card>
        </>
    );
}
