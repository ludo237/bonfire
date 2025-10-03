import { Message } from '@/components/message';
import { ReactNode, useEffect, useRef } from 'react';

interface MessageListProps {
    messages: Message[];
    typingIndicator?: ReactNode;
    autoScroll?: boolean;
}

export function MessageList({
    messages,
    typingIndicator,
    autoScroll = true,
}: MessageListProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (autoScroll) {
            scrollToBottom();
        }
    }, [messages, autoScroll]);

    return (
        <div className="relative flex-1 overflow-y-scroll">
            <div className="flex-column space-y-3 p-3">
                {messages.map((message) => (
                    <Message key={message.id} message={message} />
                ))}
            </div>

            {typingIndicator && (
                <div className="absolute bottom-0">{typingIndicator}</div>
            )}

            <div ref={messagesEndRef} />
        </div>
    );
}
