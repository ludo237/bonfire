import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ReactNode } from 'react';

interface BaseFieldProps {
    label: string;
    name: string;
    error?: string;
    required?: boolean;
    helperText?: ReactNode;
}

interface InputFieldProps extends BaseFieldProps {
    type?: 'text' | 'email' | 'password' | 'number';
    placeholder?: string;
    autoFocus?: boolean;
    defaultValue?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface TextareaFieldProps extends BaseFieldProps {
    placeholder?: string;
    rows?: number;
    defaultValue?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function InputField({
    label,
    name,
    type = 'text',
    error,
    required,
    helperText,
    ...inputProps
}: InputFieldProps) {
    return (
        <div className="space-y-2">
            <Label htmlFor={name}>
                {label}
                {required && <span className="text-red-600">*</span>}
            </Label>
            <Input
                id={name}
                name={name}
                type={type}
                required={required}
                {...inputProps}
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            {helperText && (
                <p className="text-sm text-muted-foreground">{helperText}</p>
            )}
        </div>
    );
}

export function TextareaField({
    label,
    name,
    error,
    required,
    helperText,
    ...textareaProps
}: TextareaFieldProps) {
    return (
        <div className="space-y-2">
            <Label htmlFor={name}>
                {label}
                {required && <span className="text-red-600">*</span>}
            </Label>
            <Textarea
                id={name}
                name={name}
                required={required}
                {...textareaProps}
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            {helperText && (
                <p className="text-sm text-muted-foreground">{helperText}</p>
            )}
        </div>
    );
}
