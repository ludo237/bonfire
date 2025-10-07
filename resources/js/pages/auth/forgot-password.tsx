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

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <>
            <Head title="Forgot Password" />
            <Card>
                <CardHeader>
                    <CardTitle>Forgot Password</CardTitle>
                    <CardDescription>
                        Enter your email address and we'll send you a password
                        reset link
                    </CardDescription>
                </CardHeader>
                <Form
                    action="/forgot-password"
                    method="post"
                    disableWhileProcessing
                >
                    {({ processing, errors }) => (
                        <>
                            <CardContent className="space-y-4">
                                {status && (
                                    <div className="rounded-lg bg-green-50 p-4 text-sm text-green-600">
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
                            </CardContent>
                            <CardFooter>
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={processing}
                                >
                                    Send Reset Link
                                </Button>
                            </CardFooter>
                        </>
                    )}
                </Form>
            </Card>
        </>
    );
}
