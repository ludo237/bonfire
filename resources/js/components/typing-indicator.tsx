interface TypingIndicatorProps {
    users: User[];
}

export function TypingIndicator({ users }: TypingIndicatorProps) {
    if (users.length === 0) {
        return null;
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
}
