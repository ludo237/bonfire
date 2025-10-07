import { MessageInput } from '@/components/message-input';
import { MessageList } from '@/components/message-list';
import { TypingIndicator } from '@/components/typing-indicator';
import { useMessages } from '@/hooks/use-messages';
import { useRoomPresence } from '@/hooks/use-room-presence';
import { useTypingIndicator } from '@/hooks/use-typing-indicator';
import AppLayout from '@/layouts/app-layout';
import { SharedPageProps } from '@/types/inertia';
import { Head } from '@inertiajs/react';
import { ReactElement } from 'react';

interface PageProps extends SharedPageProps {
    room: EloquentResource<Room>;
}

const RoomShowPage = ({ room: roomResource }: PageProps) => {
    const room = roomResource.data;
    const { messages, messageBody, setMessageBody, sendMessage } =
        useMessages(room);
    const { typingUsers } = useRoomPresence(room.id);
    const { broadcastTyping } = useTypingIndicator(room.id);

    const handleMessageChange = (value: string) => {
        setMessageBody(value);
        broadcastTyping();
    };

    return (
        <>
            <Head title={room.name} />
            <div className="flex flex-1 flex-col overflow-hidden">
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
        </>
    );
};

RoomShowPage.layout = (page: ReactElement<PageProps>) => {
    return <AppLayout title="Your room">{page}</AppLayout>;
};

export default RoomShowPage;
