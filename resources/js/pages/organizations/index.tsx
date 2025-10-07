import { DataTableSection } from '@/components/organization/data-table-section';
import { InviteMemberCard } from '@/components/organization/invite-member-card';
import { LatestMessagesCard } from '@/components/organization/latest-messages-card';
import { StatsCard } from '@/components/organization/stats-card';
import { PageHeader } from '@/components/page-header';
import AppLayout from '@/layouts/app-layout';
import { SharedPageProps } from '@/types/inertia';
import { Head } from '@inertiajs/react';
import { ReactElement } from 'react';
import { memberColumns } from './columns/member-columns';
import { roomColumns } from './columns/room-columns';

interface PageProps extends SharedPageProps {
    organization: EloquentResource<Organization>;
    latestMessages: EloquentResource<Message[]>;
    stats: {
        totalMessages: number;
        totalMembers: number;
        totalRooms: number;
    };
    members: EloquentResource<User[]>;
    rooms: EloquentResource<Room[]>;
}

const OrganizationIndexPage = ({
    organization,
    latestMessages,
    stats,
    members,
    rooms,
}: PageProps) => {
    return (
        <>
            <Head title={organization.data.name} />
            <div className="flex-1 overflow-y-auto">
                    <div className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-3">
                            <LatestMessagesCard
                                messages={latestMessages.data}
                            />
                            <StatsCard stats={stats} />
                            <InviteMemberCard />
                        </div>

                        <div className="grid gap-6 lg:grid-cols-2">
                            <DataTableSection
                                title="Members"
                                columns={memberColumns}
                                data={members}
                            />

                            <DataTableSection
                                title="Rooms"
                                columns={roomColumns}
                                data={rooms}
                            />
                        </div>
                    </div>
                </div>
        </>
    );
};

OrganizationIndexPage.layout = (page: ReactElement<PageProps>) => {
    return <AppLayout title="Your organization">{page}</AppLayout>;
};

export default OrganizationIndexPage;
