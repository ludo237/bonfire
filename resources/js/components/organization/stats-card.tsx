import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

interface StatsCardProps {
    stats: {
        totalMessages: number;
        totalMembers: number;
        totalRooms: number;
    };
}

export function StatsCard({ stats }: StatsCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Overview</CardTitle>
                <CardDescription>
                    Organization activity and metrics
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                            Total Members
                        </span>
                        <span className="text-2xl font-bold">
                            {stats.totalMembers}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                            Total Rooms
                        </span>
                        <span className="text-2xl font-bold">
                            {stats.totalRooms}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                            Total Messages
                        </span>
                        <span className="text-2xl font-bold">
                            {stats.totalMessages.toLocaleString()}
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
