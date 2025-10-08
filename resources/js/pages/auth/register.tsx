import RegisterForm from '@/components/forms/register';
import GuestLayout from '@/layouts/guest-layout';
import { Head } from '@inertiajs/react';
import { ReactElement } from 'react';

const RegisterPage = () => {
    return (
        <>
            <Head title="Register" />
            <RegisterForm />
        </>
    );
};

RegisterPage.layout = (page: ReactElement) => {
    return <GuestLayout>{page}</GuestLayout>;
};

export default RegisterPage;
