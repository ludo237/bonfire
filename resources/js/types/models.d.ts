interface IModel {
    readonly id: string;
    readonly createdAt: string;
    readonly updatedAt: string;
}

interface SoftDeleteModel {
    deletedAt: string | null;
}

interface User extends IModel, SoftDeleteModel {
    role: UserRole;
    name: string;
    bio: string;
    email: string;
    emailVerifiedAt: string | null;
    bot_token?: string | null;
}

interface Room extends IModel {
    slug: string;
    name: string;
    type: RoomType;
    owner?: User;
    users: User[];
    memberships: Membership[];
    messages: Message[];
    counts: {
        messages: number;
    };
}

interface Message extends IModel {
    clientMessageId: string;
    body: string;
    sender: User;
    room: Room;
    boosts: Boost[];
    counts: {
        boosts: number;
    };
}

interface Boost extends IModel {
    sender: User;
    message: Message;
}

interface Membership extends IModel {
    user: User;
    room: Room;
    involvement: InvolvementLevel;
    connections: number;
    connectedAt: string | null;
    unreadAt: string | null;
}
