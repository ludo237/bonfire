import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AuthenticatedSessionController from '@/wayfinder/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import RegisteredUserController from '@/wayfinder/actions/App/Http/Controllers/Auth/RegisteredUserController';
import { Head, Link } from '@inertiajs/react';

export default function Home() {
    return (
        <>
            <Head title="Home to Bonefire" />
            <div className="flex min-h-screen items-center justify-center bg-background p-4">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <CardTitle className="text-4xl">Bonefire</CardTitle>
                        <CardDescription className="text-base">
                            Real-time team collaboration
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-center text-sm text-muted-foreground">
                            Connect with your team instantly. Share ideas,
                            collaborate, and stay in sync.
                        </p>
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
            </div>
        </>
    );
}
