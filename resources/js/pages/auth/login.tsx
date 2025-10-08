import LoginForm from '@/components/forms/login';
import GuestLayout from '@/layouts/guest-layout';
import { Head } from '@inertiajs/react';
import { ReactElement } from 'react';

const LoginPage = () => {
    return (
        <>
            <Head title="Login" />
            <LoginForm />
        </>
    );
};

LoginPage.layout = (page: ReactElement) => {
    return <GuestLayout>{page}</GuestLayout>;
};

export default LoginPage;
