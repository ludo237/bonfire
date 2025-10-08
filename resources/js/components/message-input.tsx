import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { IconSend } from '@tabler/icons-react';
import { FormEvent, KeyboardEvent, useEffect, useRef } from 'react';

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
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-resize textarea
    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
        }
    }, [value]);

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        // Submit on Enter, new line on Shift+Enter
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSubmit(e as unknown as FormEvent);
        }
    };

    return (
        <div className="border-t bg-background p-4">
            <form onSubmit={onSubmit} className="flex items-end gap-3">
                <Textarea
                    ref={textareaRef}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="max-h-[200px] min-h-[44px] flex-1 resize-none"
                    rows={1}
                />
                <Button
                    type="submit"
                    size="icon"
                    disabled={!value.trim()}
                    className="shrink-0"
                >
                    <IconSend className="size-4" />
                </Button>
            </form>
        </div>
    );
}
