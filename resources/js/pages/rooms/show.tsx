import { Message } from '@/components/message';
import { MessageInput } from '@/components/message-input';
import { TypingIndicator } from '@/components/typing-indicator';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useMessages } from '@/hooks/use-messages';
import { useRoomPresence } from '@/hooks/use-room-presence';
import { useTypingIndicator } from '@/hooks/use-typing-indicator';
import AppLayout from '@/layouts/app-layout';
import { SharedPageProps } from '@/types/inertia';
import { Head, InfiniteScroll, usePage } from '@inertiajs/react';
import { IconArrowDown } from '@tabler/icons-react';
import { ReactElement, useEffect, useRef, useState } from 'react';

interface PageProps extends SharedPageProps {
    room: EloquentResource<Room>;
    messages: {
        data: Message[];
    };
}

const RoomShowPage = ({
    room: roomResource,
    messages: messagesData,
}: PageProps) => {
    const room = roomResource.data;
    const { messages, messageBody, setMessageBody, sendMessage, setMessages } =
        useMessages({ room, initialMessages: messagesData.data });
    const { typingUsers } = useRoomPresence(room.id);
    const { broadcastTyping } = useTypingIndicator(room.id);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const { url } = usePage();

    const handleMessageChange = (value: string) => {
        setMessageBody(value);
        broadcastTyping();
    };

    const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
        messagesEndRef.current?.scrollIntoView({ behavior });
    };

    // Track scroll position to show/hide scroll button
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) {
            return;
        }

        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = container;
            const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
            setShowScrollButton(!isNearBottom);
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

    // Scroll to bottom on initial load and when new messages arrive
    useEffect(() => {
        if (!showScrollButton) {
            scrollToBottom('smooth');
        }
    }, [messages.length, showScrollButton]);

    // Sync paginated messages with local state
    useEffect(() => {
        if (messagesData.data.length > 0) {
            setMessages(messagesData.data);
        }
    }, [url, messagesData.data, setMessages]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        }
        if (date.toDateString() === yesterday.toDateString()) {
            return 'Yesterday';
        }
        return date.toLocaleDateString([], {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const shouldShowDateSeparator = (
        currentMessage: Message,
        previousMessage: Message | null,
    ): boolean => {
        if (!previousMessage) return true;

        const currentDate = new Date(currentMessage.createdAt).toDateString();
        const previousDate = new Date(previousMessage.createdAt).toDateString();

        return currentDate !== previousDate;
    };

    return (
        <>
            <Head title={room.name} />
            <div className="flex flex-1 flex-col">
                <div
                    ref={scrollContainerRef}
                    className="relative grow overflow-y-auto"
                >
                    <InfiniteScroll data="messages" only-previous>
                        <div className="flex flex-col gap-1 p-4">
                            {messages.length === 0 ? (
                                <div className="flex flex-1 items-center justify-center py-12">
                                    <div className="text-center">
                                        <p className="text-sm text-muted-foreground">
                                            No messages yet
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Be the first to send a message!
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                messages.map((message, index) => (
                                    <div key={message.id}>
                                        {shouldShowDateSeparator(
                                            message,
                                            index > 0
                                                ? messages[index - 1]
                                                : null,
                                        ) && (
                                            <div className="relative my-6">
                                                <Separator className="bg-border/50" />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <span className="rounded-full border bg-background px-3 py-1 text-xs font-semibold text-muted-foreground">
                                                        {formatDate(
                                                            message.createdAt,
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                        <Message
                                            message={message}
                                            isGrouped={true}
                                            previousMessage={
                                                index > 0
                                                    ? messages[index - 1]
                                                    : null
                                            }
                                        />
                                    </div>
                                ))
                            )}
                        </div>
                    </InfiniteScroll>

                    <div ref={messagesEndRef} />

                    {showScrollButton && (
                        <div className="absolute right-4 bottom-4">
                            <Button
                                variant="secondary"
                                size="icon"
                                className="rounded-full shadow-lg"
                                onClick={() => scrollToBottom('smooth')}
                            >
                                <IconArrowDown className="size-4" />
                            </Button>
                        </div>
                    )}
                </div>

                {typingUsers.length > 0 && (
                    <TypingIndicator users={typingUsers} />
                )}

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
    return <AppLayout title={page.props.room.data.name}>{page}</AppLayout>;
};

export default RoomShowPage;
