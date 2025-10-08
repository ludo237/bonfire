import DataPagination from '@/components/tables/data-table-pagination';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import {
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    type SortingState,
    useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';

interface DataTableProps<TData, TValue> {
    id: string;
    columns: ColumnDef<TData, TValue>[];
    resource: EloquentResource<TData[]>;
}

export const DataTable = <TData, TValue>({
    id,
    columns,
    resource,
}: DataTableProps<TData, TValue>) => {
    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        data: resource.data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
        },
    });

    return (
        <>
            <Table className="rounded-md border bg-background">
                <TableHeader id={`${id}-table-header`}>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                const columnMeta = header.column.columnDef
                                    .meta as { className?: string } | undefined;
                                return (
                                    <TableHead
                                        key={header.id}
                                        className={cn(columnMeta?.className)}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext(),
                                              )}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody id={`${id}-table`}>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && 'selected'}
                            >
                                {row.getVisibleCells().map((cell) => {
                                    const columnMeta = cell.column.columnDef
                                        .meta as
                                        | { className?: string }
                                        | undefined;
                                    return (
                                        <TableCell
                                            key={cell.id}
                                            className={cn(
                                                columnMeta?.className,
                                            )}
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center"
                            >
                                No results found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {resource.meta && resource.links && (
                <div className="w-full py-1.5">
                    <DataPagination
                        links={resource.links}
                        meta={resource.meta}
                    />
                </div>
            )}
        </>
    );
};
