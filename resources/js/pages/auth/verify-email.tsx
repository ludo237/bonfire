import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import GuestLayout from '@/layouts/guest-layout';
import { SharedPageProps } from '@/types/inertia';
import { Form, Head, Link } from '@inertiajs/react';
import { ReactElement } from 'react';

interface PageProps extends SharedPageProps {
    status?: string;
}

const VerifyEmailPage = ({ status }: PageProps) => {
    return (
        <>
            <Head title="Verify Email" />
            <Card>
                <CardHeader>
                    <CardTitle>Verify Email</CardTitle>
                    <CardDescription>
                        Thanks for signing up! Before getting started, please
                        verify your email address by clicking the link we just
                        emailed to you.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {status === 'verification-link-sent' && (
                        <div className="rounded-lg bg-green-50 p-4 text-sm text-green-600">
                            A new verification link has been sent to your email
                            address.
                        </div>
                    )}

                    <Form
                        action="/verification-notification"
                        method="post"
                        disableWhileProcessing
                    >
                        {({ processing }) => (
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={processing}
                            >
                                Resend Verification Email
                            </Button>
                        )}
                    </Form>

                    <Link
                        href="/logout"
                        method="delete"
                        as="button"
                        className="text-sm text-muted-foreground hover:underline"
                    >
                        Log Out
                    </Link>
                </CardContent>
            </Card>
        </>
    );
};

VerifyEmailPage.layout = (page: ReactElement<PageProps>) => {
    return <GuestLayout>{page}</GuestLayout>;
};

export default VerifyEmailPage;
