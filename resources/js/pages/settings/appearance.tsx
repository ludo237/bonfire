import AppearanceTabs from '@/components/appearance-tabs';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import SettingsLayout from '@/layouts/settings-layout';
import { Head } from '@inertiajs/react';
import { ReactElement } from 'react';

const AppearanceSettingsPage = () => {
    return (
        <>
            <Head title="Appearance" />
            <Card>
                <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                    <CardDescription>
                        Customize how the application looks
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <AppearanceTabs />
                </CardContent>
            </Card>
        </>
    );
};

AppearanceSettingsPage.layout = (page: ReactElement) => {
    return <SettingsLayout>{page}</SettingsLayout>;
};

export default AppearanceSettingsPage;
