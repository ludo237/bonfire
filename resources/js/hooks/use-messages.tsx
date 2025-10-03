import { apiRequest } from '@/lib/api';
import { SharedPageProps } from '@/types/inertia';
import { usePage } from '@inertiajs/react';
import { useEcho } from '@laravel/echo-react';
import { FormEvent, useState } from 'react';

export function useMessages(room: Room, initialMessages: Message[] = []) {
    const { auth } = usePage<SharedPageProps>().props;
    const [messages, setMessages] = useState<Message[]>(
        initialMessages.length > 0 ? initialMessages : room.messages || [],
    );
    const [messageBody, setMessageBody] = useState('');

    useEcho(`room.${room.id}`, 'MessageSent', (event: MessageSentEvent) => {
        if (event.sender.id === auth.user?.data.id) {
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
    });

    const sendMessage = async (e: FormEvent) => {
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

        const optimisticMessage: Message = {
            id: clientMessageId,
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
        }
    };

    return {
        messages,
        messageBody,
        setMessageBody,
        sendMessage,
    };
}
