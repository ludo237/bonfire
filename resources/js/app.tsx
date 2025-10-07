import { createInertiaApp } from '@inertiajs/react';
import { configureEcho } from '@laravel/echo-react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import '../css/app.css';
import { initializeTheme } from './hooks/use-appearance';
import AppLayout from './layouts/app-layout';
import GuestLayout from './layouts/guest-layout';
import SettingsLayout from './layouts/settings-layout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

configureEcho({
    broadcaster: 'reverb',
});

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: async (name) => {
        const page = await resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx'),
        );

        // Auto-assign layouts based on page name
        if (!page.default.layout) {
            if (name.startsWith('auth/')) {
                page.default.layout = (page: any) => <GuestLayout>{page}</GuestLayout>;
            } else if (name.startsWith('settings/')) {
                page.default.layout = (page: any) => <SettingsLayout>{page}</SettingsLayout>;
            } else if (name === 'check-in' || name === 'home') {
                // No layout for check-in and home
                page.default.layout = undefined;
            } else {
                // Default to AppLayout for protected pages
                page.default.layout = (page: any) => <AppLayout>{page}</AppLayout>;
            }
        }

        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
