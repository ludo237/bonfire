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
import { Form } from '@inertiajs/react';

export default function Join({ code }: { code: string }) {
    return (
        <GuestLayout title="Join Team">
            <Card>
                <CardHeader>
                    <CardTitle>Join Team</CardTitle>
                    <CardDescription>
                        Create your account to join the team
                    </CardDescription>
                </CardHeader>
                <Form
                    action={`/join/${code}`}
                    method="post"
                    disableWhileProcessing
                >
                    {({ processing, errors }) => (
                        <>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        autoFocus
                                        required
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-red-600">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
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
                                    Join Team
                                </Button>
                            </CardFooter>
                        </>
                    )}
                </Form>
            </Card>
        </GuestLayout>
    );
}
