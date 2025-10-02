import { User } from '@/types/models';
import { PageProps } from '@inertiajs/core';

export interface SharedPageProps extends PageProps {
    csrf_token: string;
    auth: {
        user: EloquentResource<User> | null;
    };
    flash: {
        message: string | null;
        error: string | null;
    };
    sidebarIsOpen: boolean;
    meta: {
        title: string;
        description: string;
        og: {
            title: string;
            description: string;
            type: string;
            url: string;
            image: string;
        };
        twitter: {
            card: string;
            title: string;
            description: string;
            image: string;
            alt: string;
        };
    };
}
