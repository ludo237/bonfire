import { DataTable } from '@/components/tables/data-table';
import DataPagination from '@/components/tables/data-table-pagination';
import { router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';

interface DataTableSectionProps<TData> {
    title: string;
    columns: ColumnDef<TData>[];
    data: EloquentResource<TData[]>;
}

export function DataTableSection<TData>({
    title,
    columns,
    data,
}: DataTableSectionProps<TData>) {
    const handlePageChange = (url: string) => {
        router.visit(url, {
            preserveScroll: true,
        });
    };

    return (
        <div>
            <h2 className="mb-4 text-lg font-semibold">{title}</h2>
            <DataTable columns={columns} data={data.data} />
            {data.meta && data.links && (
                <DataPagination
                    links={data.links}
                    meta={data.meta}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
}
