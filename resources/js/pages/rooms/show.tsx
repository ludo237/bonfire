import { MessageInput } from '@/components/message-input';
import { MessageList } from '@/components/message-list';
import { PageHeader } from '@/components/page-header';
import { TypingIndicator } from '@/components/typing-indicator';
import { Button } from '@/components/ui/button';
import { useMessages } from '@/hooks/use-messages';
import { useRoomPresence } from '@/hooks/use-room-presence';
import { useTypingIndicator } from '@/hooks/use-typing-indicator';
import AppLayout from '@/layouts/app-layout';
import { SharedPageProps } from '@/types/inertia';
import { Link } from '@inertiajs/react';

interface PageProps extends SharedPageProps {
    room: EloquentResource<Room>;
}

export default function ShowRoom({ room: roomResource }: PageProps) {
    const room = roomResource.data;
    const { messages, messageBody, setMessageBody, sendMessage } =
        useMessages(room);
    const { onlineUsers, typingUsers } = useRoomPresence(room.id);
    const { broadcastTyping } = useTypingIndicator(room.id);

    const handleMessageChange = (value: string) => {
        setMessageBody(value);
        broadcastTyping();
    };

    return (
        <AppLayout title={room.name}>
            <div className="flex flex-1 flex-col overflow-hidden">
                <PageHeader
                    title={room.name}
                    description={`${onlineUsers.length} online • ${room.messages.length} messages`}
                    actions={
                        <Link href={`/rooms/${room.id}/edit`}>
                            <Button variant="outline">Settings</Button>
                        </Link>
                    }
                />

                <MessageList
                    messages={messages}
                    typingIndicator={<TypingIndicator users={typingUsers} />}
                />

                <MessageInput
                    value={messageBody}
                    onChange={handleMessageChange}
                    onSubmit={sendMessage}
                />
            </div>
        </AppLayout>
    );
}
