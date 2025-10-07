import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { UserPlus } from 'lucide-react';

export function InviteMemberCard() {
    return (
        <Card className="flex flex-col justify-center">
            <CardHeader>
                <CardTitle>Invite Members</CardTitle>
                <CardDescription>
                    Grow your organization by inviting new members
                </CardDescription>
            </CardHeader>
            <CardContent>
                <button
                    type="button"
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled
                >
                    <UserPlus className="h-4 w-4" />
                    Invite Member (Coming Soon)
                </button>
            </CardContent>
        </Card>
    );
}
