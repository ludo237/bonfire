import { useEchoPresence } from '@laravel/echo-react';
import { useEffect, useMemo, useState } from 'react';

export function useRoomPresence(roomId: string) {
    const [onlineUsers, setOnlineUsers] = useState<PresenceUser[]>([]);
    const [typingUsers, setTypingUsers] = useState<User[]>([]);

    const { channel, leave } = useEchoPresence(
        `room.${roomId}.presence`,
        'UserTyping',
    );

    // Set up channel and listeners once using useMemo
    useMemo(() => {
        const presenceChannel = channel();

        presenceChannel
            .here((users: PresenceUser[]) => {
                setOnlineUsers(users);
            })
            .joining((user: PresenceUser) => {
                setOnlineUsers((prev) => [...prev, user]);
            })
            .leaving((user: PresenceUser) => {
                setOnlineUsers((prev) => prev.filter((u) => u.id !== user.id));
            })
            .listen('UserTyping', (event: UserTypingEvent) => {
                const user = {
                    id: event.id,
                    name: event.name,
                } as User;

                setTypingUsers((prev) => [...prev, user]);

                setTimeout(() => {
                    setTypingUsers((prev) =>
                        prev.filter((p) => p.id !== user.id),
                    );
                }, 3000);
            });

        return presenceChannel;
    }, [roomId]);

    // Only cleanup on unmount
    useEffect(() => {
        return () => {
            leave();
        };
    }, [leave]);

    return { onlineUsers, typingUsers };
}
