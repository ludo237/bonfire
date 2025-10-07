import { Button } from '@/components/ui/button';
import type { Column } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

const DataTableHeader = <T,>({
    text,
    column,
}: {
    text: string;
    column?: Column<T, unknown>;
}) => {
    if (column) {
        return (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
            >
                <span className="text-sm font-medium">{text}</span>
                <ArrowUpDown className="ml-2 size-4" />
            </Button>
        );
    }

    return <span className="text-sm font-medium">{text}</span>;
};

export default DataTableHeader;
