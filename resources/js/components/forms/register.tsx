import SocialAuthButtons from '@/components/forms/social-auth-buttons';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import AuthenticatedSessionController from '@/wayfinder/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import RegisteredUserController from '@/wayfinder/actions/App/Http/Controllers/Auth/RegisteredUserController';
import { Form, Link } from '@inertiajs/react';
import { ComponentProps, FC } from 'react';

const RegisterForm: FC<ComponentProps<'div'>> = ({ className, ...props }) => {
    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Bonfire</CardTitle>
                    <CardDescription>
                        Real-time team collaboration application. Connect with
                        your team instantly. Share ideas, collaborate, and stay
                        in sync.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form
                        action={RegisteredUserController.store()}
                        method="post"
                        disableWhileProcessing
                    >
                        {({ errors }) => (
                            <FieldGroup>
                                <Field>
                                    <SocialAuthButtons />
                                </Field>
                                <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                                    Or continue with
                                </FieldSeparator>
                                <Field>
                                    <FieldLabel htmlFor="name">Name</FieldLabel>
                                    <Input
                                        id="name"
                                        type="text"
                                        name="name"
                                        autoComplete="name"
                                        autoFocus={true}
                                        placeholder="Ludo"
                                        required
                                    />
                                    {errors.name && (
                                        <FieldError>{errors.name}</FieldError>
                                    )}
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="email">
                                        Email
                                    </FieldLabel>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        autoComplete="email"
                                        placeholder="ludo@bonfire.com"
                                        required
                                    />
                                    {errors.email && (
                                        <FieldError>{errors.email}</FieldError>
                                    )}
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="password">
                                        Password
                                    </FieldLabel>
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        autoComplete="new-password"
                                        placeholder="**********"
                                        required
                                    />
                                    {errors.password && (
                                        <FieldError>
                                            {errors.password}
                                        </FieldError>
                                    )}
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="password_confirmation">
                                        Confirm Password
                                    </FieldLabel>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        autoComplete="new-password"
                                        placeholder="**********"
                                        required
                                    />
                                </Field>
                                <Field>
                                    <Button type="submit">Register</Button>
                                    <FieldDescription className="text-center">
                                        Already have an account?{' '}
                                        <Link
                                            href={AuthenticatedSessionController.create()}
                                        >
                                            Sign in
                                        </Link>
                                    </FieldDescription>
                                </Field>
                            </FieldGroup>
                        )}
                    </Form>
                </CardContent>
            </Card>
            <FieldDescription className="px-6 text-center">
                By clicking continue, you agree to our{' '}
                <a href="#">Terms of Service</a> and{' '}
                <a href="#">Privacy Policy</a>.
            </FieldDescription>
        </div>
    );
};

export default RegisterForm;
