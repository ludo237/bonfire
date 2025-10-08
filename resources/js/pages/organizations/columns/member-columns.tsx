import { ColumnDef } from '@tanstack/react-table';

export const memberColumns: ColumnDef<User>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => (
            <div className="flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-full bg-muted text-xs font-medium">
                    {row.original.initials}
                </div>
                <span>{row.original.name}</span>
            </div>
        ),
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'role',
        header: 'Role',
        cell: ({ row }) => (
            <span
                className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium capitalize ${
                    row.original.role === 'admin'
                        ? 'bg-primary/10 text-primary'
                        : 'bg-muted text-muted-foreground'
                }`}
            >
                {row.original.role || 'member'}
            </span>
        ),
    },
    {
        accessorKey: 'messagesCount',
        header: 'Messages',
        cell: ({ row }) => (
            <span className="text-muted-foreground">
                {row.original.messagesCount?.toLocaleString() || 0}
            </span>
        ),
    },
    {
        accessorKey: 'joinedAt',
        header: 'Joined',
        cell: ({ row }) => {
            const date = row.original.joinedAt || row.original.createdAt;
            return new Date(date).toLocaleDateString();
        },
    },
];
