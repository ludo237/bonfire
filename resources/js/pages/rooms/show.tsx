import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRoomPresence } from '@/hooks/use-room-presence';
import { useTypingIndicator } from '@/hooks/use-typing-indicator';
import AppLayout from '@/layouts/app-layout';
import { apiRequest } from '@/lib/api';
import { SharedPageProps } from '@/types/inertia';
import { Link } from '@inertiajs/react';
import { useEcho } from '@laravel/echo-react';
import { SendHorizontal } from 'lucide-react';
import { FC, FormEvent, useRef, useState } from 'react';

interface PageProps extends SharedPageProps {
    room: EloquentResource<Room>;
}

const TypingPresence: FC<{ users: User[] }> = ({ users }) => {
    if (users.length <= 0) {
        return <></>;
    }

    if (users.length === 1) {
        return (
            <div className="text-sm text-white italic">
                {users[0].name} is typing...
            </div>
        );
    }

    if (users.length > 1 && users.length <= 3) {
        return (
            <div className="text-sm text-white italic">
                {users.length} user(s) typing...
            </div>
        );
    }

    return (
        <div className="text-sm text-white italic">
            Several people are typing...
        </div>
    );
};

const Message: FC<{ message: Message }> = ({ message }) => {
    return (
        <div className="flex items-center space-x-3">
            <Avatar>
                <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="grow">
                <div className="flex items-baseline space-x-1.5">
                    <div className="font-semibold">{message.sender.name}</div>
                    <div className="text-xs text-muted-foreground">
                        {new Date(message.createdAt).toLocaleTimeString()}
                    </div>
                </div>
                <div>{message.body}</div>
            </div>
        </div>
    );
};

export default function ShowRoom(props: PageProps) {
    const room = props.room.data;
    useEcho(`room.${room.id}`, 'MessageSent', (event: MessageSentEvent) => {
        if (event.sender.id === props.auth.user?.data.id) {
            return;
        }

        const optimisticMessage: Message = {
            id: event.id,
            clientMessageId: event.clientMessageId,
            body: event.body,
            createdAt: event.createdAt,
            updatedAt: event.updatedAt,
            sender: {
                id: event.sender.id,
                name: event.sender.name,
            } as User,
            room: {
                id: room.id,
            } as Room,
            boosts: [],
            counts: {
                boosts: 0,
            },
        };

        setMessages((prev) => [...prev, optimisticMessage]);
        setTimeout(scrollToBottom, 100);
    });

    const [messages, setMessages] = useState<Message[]>(room.messages);
    const [messageBody, setMessageBody] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { onlineUsers, typingUsers } = useRoomPresence(room.id);
    const { broadcastTyping } = useTypingIndicator(room.id);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const sendMessage = async (e: FormEvent) => {
        e.preventDefault();
        if (!messageBody.trim()) return;

        const clientMessageId = crypto.randomUUID();
        const messageText = messageBody;

        // Add message optimistically to UI
        const currentUser = props.auth.user?.data ?? props.auth.user;
        if (!currentUser) {
            console.error('No authenticated user found');
            return;
        }

        const optimisticMessage: Message = {
            id: clientMessageId, // Use clientMessageId as temporary id
            clientMessageId: clientMessageId,
            body: messageText,
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString(),
            sender: currentUser as User,
            room: {
                id: room.id,
            } as Room,
            boosts: [],
            counts: {
                boosts: 0,
            },
        };

        setMessages((prev) => [...prev, optimisticMessage]);
        setMessageBody('');
        setTimeout(scrollToBottom, 100);

        try {
            await apiRequest(`/api/rooms/${room.id}/messages`, {
                method: 'POST',
                body: JSON.stringify({
                    body: messageText,
                    client_message_id: clientMessageId,
                }),
            });
        } catch (error) {
            console.error('Failed to send message:', error);
            // TODO: Handle error - maybe remove optimistic message or show error state
        }
    };

    return (
        <AppLayout title={room.name}>
            <div className="flex flex-1 flex-col overflow-hidden">
                <div className="flex items-center justify-between border-b p-4">
                    <div>
                        <h1 className="text-xl font-bold">{room.name}</h1>
                        <p className="text-sm text-muted-foreground">
                            {onlineUsers.length} online • {room.messages.length}{' '}
                            messages
                        </p>
                    </div>
                    <Link href={`/rooms/${room.id}/edit`}>
                        <Button variant="outline">Settings</Button>
                    </Link>
                </div>

                <div className="relative flex-1 overflow-y-scroll">
                    <div className="flex-column space-y-3 p-3">
                        {messages.map((message) => (
                            <Message key={message.id} message={message} />
                        ))}
                    </div>

                    <div className="absolute bottom-0">
                        <TypingPresence users={typingUsers} />
                    </div>

                    <div ref={messagesEndRef} />
                </div>

                <div className="border-t p-4">
                    <form onSubmit={sendMessage} className="flex gap-3">
                        <Input
                            value={messageBody}
                            onChange={(e) => {
                                setMessageBody(e.target.value);
                                broadcastTyping();
                            }}
                            placeholder="Type a message..."
                            className="flex-1"
                        />
                        <Button type="submit" size="icon">
                            <SendHorizontal className="size-4" />
                        </Button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
