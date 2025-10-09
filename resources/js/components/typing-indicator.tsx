interface TypingIndicatorProps {
    users: User[];
}

export function TypingIndicator({ users }: TypingIndicatorProps) {
    if (users.length === 0) {
        return null;
    }

    const getTypingText = () => {
        if (users.length === 1) {
            return `${users[0].name} is typing`;
        }

        if (users.length === 2) {
            return `${users[0].name} and ${users[1].name} are typing`;
        }

        return `${users.length} people are typing`;
    };

    return (
        <div className="px-4 pb-2">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <span>{getTypingText()}</span>
                <div className="flex gap-0.5">
                    <span className="animate-[bounce_1s_ease-in-out_0s_infinite]">
                        .
                    </span>
                    <span className="animate-[bounce_1s_ease-in-out_0.15s_infinite]">
                        .
                    </span>
                    <span className="animate-[bounce_1s_ease-in-out_0.3s_infinite]">
                        .
                    </span>
                </div>
            </div>
        </div>
    );
}
