import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import GuestLayout from '@/layouts/guest-layout';
import AuthenticatedSessionController from '@/wayfinder/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import RegisteredUserController from '@/wayfinder/actions/App/Http/Controllers/Auth/RegisteredUserController';
import { Link } from '@inertiajs/react';
import { ReactElement } from 'react';

const HomePage = () => {
    return (
        <>
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-4xl">Bonfire</CardTitle>
                    <CardDescription className="text-base">
                        Real-time team collaboration
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Link
                            href={AuthenticatedSessionController.create()}
                            className="block"
                        >
                            <Button className="w-full" size="lg">
                                Sign In
                            </Button>
                        </Link>
                        <p className="text-center text-xs text-muted-foreground">
                            New here?{' '}
                            <Link
                                href={RegisteredUserController.create()}
                                className="hover:underline"
                            >
                                Create an account
                            </Link>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </>
    );
};

HomePage.layout = (page: ReactElement) => {
    return <GuestLayout>{page}</GuestLayout>;
};

export default HomePage;
