import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { useOrganizationMessages } from '@/hooks/use-organization-messages';
import { IconMessages } from '@tabler/icons-react';

function formatTimeAgo(date: Date): string {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) {
        return 'just now';
    }

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
        return `${minutes}m ago`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return `${hours}h ago`;
    }

    const days = Math.floor(hours / 24);
    if (days < 7) {
        return `${days}d ago`;
    }

    return date.toLocaleDateString();
}

interface LatestMessagesCardProps {
    messages: Message[];
}

export function LatestMessagesCard({ messages }: LatestMessagesCardProps) {
    const latestMessages = useOrganizationMessages(messages);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Latest Activity</CardTitle>
                <CardDescription>
                    Recent messages across your organization
                </CardDescription>
            </CardHeader>
            <CardContent>
                {latestMessages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-2 py-8 text-center text-muted-foreground">
                        <IconMessages className="size-8 opacity-50" />
                        <p className="text-sm">No messages yet</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {latestMessages.map((message) => (
                            <div
                                key={message.id}
                                className="flex flex-col gap-1 border-b border-border pb-4 last:border-b-0 last:pb-0"
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">
                                            {message.sender.name}
                                        </p>
                                        {message.room && (
                                            <p className="text-xs text-muted-foreground">
                                                in {message.room.name}
                                            </p>
                                        )}
                                    </div>
                                    <time className="text-xs text-muted-foreground">
                                        {formatTimeAgo(
                                            new Date(message.createdAt),
                                        )}
                                    </time>
                                </div>
                                <p className="line-clamp-2 text-sm text-muted-foreground">
                                    {message.body.replace(/<[^>]*>/g, '')}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
