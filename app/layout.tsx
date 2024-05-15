import '@mantine/core/styles.css';
import React, { Suspense } from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import Script from 'next/script';
import { theme } from '@/theme';
import Providers from './providers';
import '@mantine/dates/styles.css';
// import InitAppCheck from '@/app/InitAppCheck';

export const metadata = {
  title: 'Mantine Next.js template',
  description: 'I am using Mantine with Next.js!',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
    <head>
      <Script src="https://www.google.com/recaptcha/enterprise.js?render=6LeW3NkpAAAAAOudrw8NGsZRg59v5SMSabR51EwV" />
      <ColorSchemeScript />
      <link rel="shortcut icon" href="/favicon.svg" />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
      />
    </head>
    <body>
    <Providers>
      <MantineProvider theme={theme}>
        {children}
        {/*<Suspense fallback={null}>*/}
        {/*  <InitAppCheck />*/}
        {/*</Suspense>*/}
      </MantineProvider>
    </Providers>
    </body>
    </html>
  );
}
