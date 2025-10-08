interface PresenceUser {
    id: string;
    name: string;
    initials: string;
}

interface MessageSentEvent {
    id: string;
    clientMessageId: string;
    roomId: string;
    body: string;
    createdAt: string;
    updatedAt: string;
    sender: {
        id: string;
        name: string;
        initials: string;
    };
}

interface UserTypingEvent {
    id: string;
    name: string;
    initials: string;
}

interface MessageBoostedEvent {
    id: string;
    messageId: string;
    user: {
        id: string;
        name: string;
        initials: string;
    };
    createdAt: string;
}
