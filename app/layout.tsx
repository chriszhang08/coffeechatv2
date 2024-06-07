import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import React, { Suspense } from "react";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import Script from "next/script";
import { theme } from "@/theme";
import Providers from "./providers";
import InitAppCheck from "@/app/InitAppCheck";

export const metadata = {
  title: "MentorMeets",
  description: "Transforming mentorship by University of Michigan seniors.",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/logo.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <Providers>
          <MantineProvider theme={theme}>
            {children}
            <Suspense fallback={null}>
              <InitAppCheck />
            </Suspense>
          </MantineProvider>
        </Providers>
      </body>
    </html>
  );
}
