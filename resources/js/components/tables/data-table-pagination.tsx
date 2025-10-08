import {
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    Pagination as RootPagination,
} from '@/components/ui/pagination';

type DataPaginationProps = {
    links: LinkResource;
    meta: MetaResource;
};

const DataPagination = (props: DataPaginationProps) => {
    const { meta } = props;

    return (
        <RootPagination>
            <PaginationContent>
                {meta.links.map((i) => (
                    <PaginationItem key={i.label}>
                        {i.label === '...' ? (
                            <PaginationEllipsis />
                        ) : (
                            <PaginationLink
                                prefetch
                                href={i.url || '#'}
                                isActive={i.active}
                                preserveScroll
                                size="sm"
                            >
                                {i.label}
                            </PaginationLink>
                        )}
                    </PaginationItem>
                ))}
            </PaginationContent>
        </RootPagination>
    );
};

export default DataPagination;
