import { apiRequest } from '@/lib/api';
import { useCallback, useRef } from 'react';

export function useTypingIndicator(roomId: string) {
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const isTypingRef = useRef(false);

    const broadcastTyping = useCallback(() => {
        // Clear existing timeout
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        // Only broadcast if not already typing
        if (!isTypingRef.current) {
            apiRequest(`/api/rooms/${roomId}/typing`, {
                method: 'POST',
            }).catch(console.error);
            isTypingRef.current = true;
        }

        // Reset after 3 seconds
        typingTimeoutRef.current = setTimeout(() => {
            isTypingRef.current = false;
        }, 3000);
    }, [roomId]);

    return { broadcastTyping };
}
