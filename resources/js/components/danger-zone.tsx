import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { ReactNode } from 'react';

interface DangerZoneProps {
    title?: string;
    description?: string;
    actionLabel: string;
    onAction: () => void;
    children?: ReactNode;
}

export function DangerZone({
    title = 'Danger Zone',
    description,
    actionLabel,
    onAction,
    children,
}: DangerZoneProps) {
    return (
        <Card className="border-red-200">
            <CardHeader>
                <CardTitle className="text-red-600">{title}</CardTitle>
                {description && (
                    <CardDescription>{description}</CardDescription>
                )}
            </CardHeader>
            <CardContent>
                {children}
                <Button variant="destructive" onClick={onAction}>
                    {actionLabel}
                </Button>
            </CardContent>
        </Card>
    );
}
