import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { IconHeart } from '@tabler/icons-react';
import { memo, useState } from 'react';

interface MessageProps {
    message: Message;
    isGrouped?: boolean;
    previousMessage?: Message | null;
}

export const Message = memo(function Message({
    message,
    isGrouped = false,
    previousMessage = null,
}: MessageProps) {
    const [isHovered, setIsHovered] = useState(false);

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const shouldGroup = (): boolean => {
        if (!previousMessage || !isGrouped) {
            return false;
        }

        // Group if same sender and within 5 minutes
        if (previousMessage.sender.id !== message.sender.id) {
            return false;
        }

        const timeDiff =
            new Date(message.createdAt).getTime() -
            new Date(previousMessage.createdAt).getTime();
        return timeDiff < 5 * 60 * 1000; // 5 minutes
    };

    const handleBoost = () => {
        router.post(
            `/messages/${message.id}/boost`,
            {},
            {
                preserveScroll: true,
            },
        );
    };

    const grouped = shouldGroup();
    const hasBoosts = message.counts.boosts > 0;

    return (
        <div
            className="group relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className={`flex items-start gap-3 ${grouped ? 'mt-0.5' : 'mt-2'}`}
            >
                {grouped ? (
                    <div className="flex size-8 items-center justify-center">
                        <span className="text-[10px] text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                            {formatTime(message.createdAt)}
                        </span>
                    </div>
                ) : (
                    <Avatar className="size-8">
                        <AvatarImage
                            src={message.sender.avatar?.url}
                            alt={message.sender.name}
                        />
                        <AvatarFallback>
                            {message.sender.initials}
                        </AvatarFallback>
                    </Avatar>
                )}

                <div className="min-w-0 flex-1">
                    {!grouped && (
                        <div className="flex items-baseline gap-2">
                            <span className="text-sm font-semibold">
                                {message.sender.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                                {formatTime(message.createdAt)}
                            </span>
                        </div>
                    )}

                    <div
                        className={`${grouped ? '' : 'mt-0.5'} rounded-lg bg-muted/30 px-3 py-2 text-sm break-words transition-colors hover:bg-muted/50`}
                    >
                        {message.body}

                        {hasBoosts && (
                            <div className="mt-1 flex items-center gap-1">
                                <Badge
                                    variant="secondary"
                                    className="gap-1 text-xs"
                                >
                                    <IconHeart className="size-3 fill-current" />
                                    {message.counts.boosts}
                                </Badge>
                            </div>
                        )}
                    </div>

                    {isHovered && (
                        <div className="absolute top-0 right-2 flex items-center gap-1 rounded-lg border bg-background p-1 shadow-sm">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="size-7"
                                onClick={handleBoost}
                            >
                                <IconHeart className="size-3.5" />
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});
