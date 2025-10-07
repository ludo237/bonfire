import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { SharedPageProps } from '@/types/inertia';
import CheckInController from '@/wayfinder/actions/App/Http/Controllers/CheckInController';
import { Form, Head } from '@inertiajs/react';
import { MessageSquare, Users } from 'lucide-react';

interface PageProps extends SharedPageProps {
    organizations: EloquentResource<Organization[]>;
}

const CheckInPage = ({ organizations }: PageProps) => {
    return (
        <>
            <Head title="Select Organization" />
            <div className="flex min-h-screen items-center justify-center bg-background p-6">
                <div className="w-full max-w-6xl">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Welcome back!
                        </h1>
                        <p className="mt-2 text-muted-foreground">
                            Select an organization to continue
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {organizations.data.map((organization) => (
                            <Card
                                key={organization.id}
                                className="transition-colors hover:border-primary"
                            >
                                <CardHeader>
                                    <CardTitle>{organization.name}</CardTitle>
                                    <CardDescription>
                                        Organization workspace
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex gap-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Users className="h-4 w-4" />
                                            <span>
                                                {organization.counts.members}{' '}
                                                members
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <MessageSquare className="h-4 w-4" />
                                            <span>
                                                {organization.counts.rooms}{' '}
                                                rooms
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Form
                                        action={CheckInController.store()}
                                        disableWhileProcessing
                                    >
                                        {({ processing }) => (
                                            <>
                                                <input
                                                    type="hidden"
                                                    className="hidden opacity-0"
                                                    name="organization_id"
                                                    id="organization_id"
                                                    defaultValue={
                                                        organization.id
                                                    }
                                                    readOnly
                                                />
                                                <Button
                                                    type="submit"
                                                    className="w-full"
                                                >
                                                    {processing
                                                        ? 'Entering...'
                                                        : 'Enter Organization'}
                                                </Button>
                                            </>
                                        )}
                                    </Form>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>

                    {organizations.data.length === 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>No Organizations</CardTitle>
                                <CardDescription>
                                    You're not a member of any organizations
                                    yet.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    )}
                </div>
            </div>
        </>
    );
};

export default CheckInPage;
