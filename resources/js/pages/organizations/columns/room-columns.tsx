import { ColumnDef } from '@tanstack/react-table';

export const roomColumns: ColumnDef<Room>[] = [
    {
        accessorKey: 'name',
        header: 'Room Name',
    },
    {
        accessorKey: 'type',
        header: 'Type',
        cell: ({ row }) => (
            <span className="capitalize">{row.original.type}</span>
        ),
    },
    {
        accessorKey: 'counts.users',
        header: 'Members',
    },
    {
        accessorKey: 'counts.messages',
        header: 'Messages',
    },
    {
        accessorKey: 'updatedAt',
        header: 'Last Activity',
        cell: ({ row }) =>
            new Date(row.original.updatedAt).toLocaleDateString(),
    },
];
