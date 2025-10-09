import {
    Icon,
    IconHash,
    IconLock,
    IconMessage,
    IconUser,
} from '@tabler/icons-react';

export function useRoomIcon(roomType: string): Icon {
    switch (roomType) {
        case 'public':
            return IconHash;
        case 'private':
            return IconLock;
        case 'direct':
            return IconUser;
        default:
            return IconMessage;
    }
}
