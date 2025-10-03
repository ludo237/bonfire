import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SendHorizontal } from 'lucide-react';
import { FormEvent } from 'react';

interface MessageInputProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: (e: FormEvent) => void;
    placeholder?: string;
}

export function MessageInput({
    value,
    onChange,
    onSubmit,
    placeholder = 'Type a message...',
}: MessageInputProps) {
    return (
        <div className="border-t p-4">
            <form onSubmit={onSubmit} className="flex gap-3">
                <Input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="flex-1"
                />
                <Button type="submit" size="icon">
                    <SendHorizontal className="size-4" />
                </Button>
            </form>
        </div>
    );
}
