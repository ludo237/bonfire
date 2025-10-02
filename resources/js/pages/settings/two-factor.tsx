import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SettingsLayout from '@/layouts/settings-layout';
import { router, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function TwoFactorSettings({
    twoFactorEnabled,
    qrCodeSvg,
    recoveryCodes,
}: {
    twoFactorEnabled: boolean;
    qrCodeSvg?: string;
    recoveryCodes?: string[];
}) {
    const [enabling, setEnabling] = useState(false);
    const { data, setData, post, processing } = useForm({
        code: '',
    });

    const enable2FA = () => {
        router.post('/user/two-factor-authentication', undefined, {
            onSuccess: () => setEnabling(true),
        });
    };

    const disable2FA = () => {
        if (
            confirm(
                'Are you sure you want to disable two-factor authentication?',
            )
        ) {
            router.delete('/user/two-factor-authentication');
        }
    };

    const confirmEnabling = (e: React.FormEvent) => {
        e.preventDefault();
        post('/user/confirmed-two-factor-authentication');
    };

    return (
        <SettingsLayout title="Two-Factor Authentication">
            <Card>
                <CardHeader>
                    <CardTitle>Two-Factor Authentication</CardTitle>
                    <CardDescription>
                        Add an extra layer of security to your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {!twoFactorEnabled && !enabling && (
                        <div>
                            <p className="mb-4 text-sm text-muted-foreground">
                                Two-factor authentication is not enabled. Enable
                                it to add an extra layer of security to your
                                account.
                            </p>
                            <Button onClick={enable2FA}>Enable 2FA</Button>
                        </div>
                    )}

                    {!twoFactorEnabled && enabling && qrCodeSvg && (
                        <div className="space-y-4">
                            <p className="text-sm">
                                Scan this QR code with your authenticator app
                                and enter the code below to complete setup.
                            </p>
                            <div
                                dangerouslySetInnerHTML={{ __html: qrCodeSvg }}
                            />
                            <form
                                onSubmit={confirmEnabling}
                                className="space-y-4"
                            >
                                <div className="space-y-2">
                                    <Label htmlFor="code">
                                        Authentication Code
                                    </Label>
                                    <Input
                                        id="code"
                                        value={data.code}
                                        onChange={(e) =>
                                            setData('code', e.target.value)
                                        }
                                        placeholder="000000"
                                        required
                                    />
                                </div>
                                <Button type="submit" disabled={processing}>
                                    Confirm 2FA
                                </Button>
                            </form>
                        </div>
                    )}

                    {twoFactorEnabled && (
                        <div className="space-y-4">
                            <p className="text-sm text-green-600">
                                Two-factor authentication is enabled.
                            </p>
                            {recoveryCodes && recoveryCodes.length > 0 && (
                                <div className="rounded-lg bg-muted p-4">
                                    <h3 className="mb-2 font-semibold">
                                        Recovery Codes
                                    </h3>
                                    <p className="mb-2 text-sm text-muted-foreground">
                                        Store these recovery codes in a safe
                                        place. They can be used to access your
                                        account if you lose access to your
                                        authenticator.
                                    </p>
                                    <div className="grid grid-cols-2 gap-2 font-mono text-sm">
                                        {recoveryCodes.map((code) => (
                                            <div key={code}>{code}</div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <Button variant="destructive" onClick={disable2FA}>
                                Disable 2FA
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </SettingsLayout>
    );
}
