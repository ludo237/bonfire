import { Hash, Lock, LucideIcon, MessageSquare, User } from 'lucide-react';

export function useRoomIcon(roomType: string): LucideIcon {
    switch (roomType) {
        case 'public':
            return Hash;
        case 'private':
            return Lock;
        case 'direct':
            return User;
        default:
            return MessageSquare;
    }
}
