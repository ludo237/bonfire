import { ColumnDef } from '@tanstack/react-table';

export const memberColumns: ColumnDef<User>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'createdAt',
        header: 'Joined',
        cell: ({ row }) =>
            new Date(row.original.createdAt).toLocaleDateString(),
    },
];
