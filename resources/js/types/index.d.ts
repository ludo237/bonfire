type UserRole = 'admin' | 'member' | 'bot';

type RoomType = 'public' | 'private' | 'direct';

type InvolvementLevel = 'all' | 'mentions' | 'none';

interface ApiResponse<T extends IModel> {
    message: string;
    details: string;
    data: T;
    errors?: Record<string, string[]>;
    meta?: MetaResource;
    links?: LinkResource;
}

interface EloquentResource<T> extends Response {
    data: T;
    meta?: MetaResource;
    links?: LinkResource;
}

interface LinkResource {
    first?: string;
    last?: string;
    prev?: string;
    next?: string;
}

interface MetaLinkResource {
    url: string;
    label: string;
    active: boolean;
}

interface MetaResource {
    current_page: number;
    from: number;
    last_page: number;
    links: MetaLinkResource[];
    path: string;
    per_page: number;
    to: number;
    total: number;
}
