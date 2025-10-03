import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface MessageProps {
    message: Message;
}

export function Message({ message }: MessageProps) {
    return (
        <div className="flex items-center gap-3">
            <Avatar>
                <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="grow">
                <div className="flex items-baseline gap-1.5">
                    <div className="font-semibold">{message.sender.name}</div>
                    <div className="text-xs text-muted-foreground">
                        {new Date(message.createdAt).toLocaleTimeString()}
                    </div>
                </div>
                <div>{message.body}</div>
            </div>
        </div>
    );
}
