import { apiRequest } from '@/lib/api';
import { SharedPageProps } from '@/types/inertia';
import { usePage } from '@inertiajs/react';
import { useEcho } from '@laravel/echo-react';
import { FormEvent, useCallback, useState } from 'react';

interface UseMessagesProps {
    room: Room;
    initialMessages?: Message[];
}

export function useMessages({ room, initialMessages = [] }: UseMessagesProps) {
    const { auth } = usePage<SharedPageProps>().props;
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [messageBody, setMessageBody] = useState('');

    useEcho(`room.${room.id}`, 'MessageSent', (event: MessageSentEvent) => {
        // Skip if it's our own message
        if (event.sender.id === auth.user?.data.id) {
            return;
        }

        const newMessage: Message = {
            id: event.id,
            clientMessageId: event.clientMessageId,
            body: event.body,
            createdAt: event.createdAt,
            updatedAt: event.updatedAt,
            sender: {
                id: event.sender.id,
                name: event.sender.name,
                initials: event.sender.initials,
            } as User,
            room: {
                id: room.id,
            } as Room,
            boosts: [],
            counts: {
                boosts: 0,
            },
        };

        setMessages((prev) => [...prev, newMessage]);
    });

    const sendMessage = useCallback(
        async (e: FormEvent) => {
            e.preventDefault();
            if (!messageBody.trim()) {
                return;
            }

            const clientMessageId = crypto.randomUUID();
            const messageText = messageBody;

            const currentUser = auth.user?.data ?? auth.user;
            if (!currentUser) {
                console.error('No authenticated user found');
                return;
            }

            // Optimistic update
            const optimisticMessage: Message = {
                id: clientMessageId,
                clientMessageId: clientMessageId,
                body: messageText,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
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
                // Remove optimistic message on error
                setMessages((prev) =>
                    prev.filter((m) => m.id !== clientMessageId),
                );
            }
        },
        [messageBody, room.id, auth.user],
    );

    return {
        messages,
        messageBody,
        setMessageBody,
        sendMessage,
        setMessages,
    };
}
