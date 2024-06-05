'use client';

import CoachesFeed from '@/components/CoachesFeed/CoachesUserStack';
import NavbarSearch from '@/components/Navbar/Navbar';
import styles from './Home.module.css';
import {Center} from "@mantine/core";
import {FooterSimple} from "@/components/Navbar/FooterSimple";
import {Suspense} from "react";
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';

export default function HomePage() {
  return (
    <>
    {/* <header>
      <ColorSchemeToggle/>
    </header> */}
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div className={styles.stack}>
          <Center>
            <img src="/logoname.svg" alt="Logo" style={{ width: '100%', maxWidth: '600px', height: 'auto' }} />
          </Center>
          <Suspense fallback={<div>loading...</div>}>
            <CoachesFeed />
          </Suspense>
          <FooterSimple />
        </div>
      </div>
    </>
  );
}
