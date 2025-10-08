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
import PasswordResetLinkController from '@/wayfinder/actions/App/Http/Controllers/Auth/PasswordResetLinkController';
import RegisteredUserController from '@/wayfinder/actions/App/Http/Controllers/Auth/RegisteredUserController';
import { Form, Link } from '@inertiajs/react';
import { ComponentProps, FC } from 'react';

const LoginForm: FC<ComponentProps<'div'>> = ({ className, ...props }) => {
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
                        action={AuthenticatedSessionController.store()}
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
                                    <FieldLabel htmlFor="email">
                                        Email
                                    </FieldLabel>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus={true}
                                        placeholder="ludo@bonfire.com"
                                        required
                                    />
                                    {errors.email && (
                                        <FieldError>{errors.email}</FieldError>
                                    )}
                                </Field>
                                <Field>
                                    <div className="flex items-center">
                                        <FieldLabel htmlFor="password">
                                            Password
                                        </FieldLabel>
                                        <Link
                                            href={PasswordResetLinkController.create()}
                                            className="ml-auto text-sm underline-offset-4 hover:underline"
                                        >
                                            Forgot your password?
                                        </Link>
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        autoComplete="current-password"
                                        placeholder="**********"
                                        required
                                    />
                                </Field>
                                <Field>
                                    <Button type="submit">Login</Button>
                                    <FieldDescription className="text-center">
                                        Don&apos;t have an account?{' '}
                                        <Link
                                            href={RegisteredUserController.create()}
                                        >
                                            Sign up
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

export default LoginForm;
