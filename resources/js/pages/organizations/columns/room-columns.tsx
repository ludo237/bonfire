import { ColumnDef } from '@tanstack/react-table';

export const roomColumns: ColumnDef<Room>[] = [
    {
        accessorKey: 'name',
        header: 'Room Name',
        cell: ({ row }) => (
            <div>
                <div className="font-medium">{row.original.name}</div>
                {row.original.lastMessage && (
                    <div className="mt-1 text-xs text-muted-foreground">
                        <span className="font-medium">
                            {row.original.lastMessage.sender.name}:
                        </span>{' '}
                        {row.original.lastMessage.body.substring(0, 50)}
                        {row.original.lastMessage.body.length > 50 && '...'}
                    </div>
                )}
            </div>
        ),
    },
    {
        accessorKey: 'type',
        header: 'Type',
        cell: ({ row }) => (
            <span
                className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium capitalize ${
                    row.original.type === 'public'
                        ? 'bg-green-500/10 text-green-700 dark:text-green-400'
                        : row.original.type === 'private'
                          ? 'bg-orange-500/10 text-orange-700 dark:text-orange-400'
                          : 'bg-blue-500/10 text-blue-700 dark:text-blue-400'
                }`}
            >
                {row.original.type}
            </span>
        ),
    },
    {
        accessorKey: 'counts.users',
        header: 'Members',
        cell: ({ row }) => (
            <span className="text-muted-foreground">
                {row.original.counts.users.toLocaleString()}
            </span>
        ),
    },
    {
        accessorKey: 'counts.messages',
        header: 'Messages',
        cell: ({ row }) => (
            <span className="text-muted-foreground">
                {row.original.counts.messages.toLocaleString()}
            </span>
        ),
    },
    {
        accessorKey: 'updatedAt',
        header: 'Last Activity',
        cell: ({ row }) => {
            const date = new Date(row.original.updatedAt);
            const now = new Date();
            const diffMs = now.getTime() - date.getTime();
            const diffMins = Math.floor(diffMs / 60000);
            const diffHours = Math.floor(diffMs / 3600000);
            const diffDays = Math.floor(diffMs / 86400000);

            if (diffMins < 60) {
                return `${diffMins}m ago`;
            }
            if (diffHours < 24) {
                return `${diffHours}h ago`;
            }
            if (diffDays < 7) {
                return `${diffDays}d ago`;
            }
            return date.toLocaleDateString();
        },
    },
];
