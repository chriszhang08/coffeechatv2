'use client';

import CoachesFeed from '@/components/CoachesFeed/CoachesUserStack';
import NavbarSearch from '@/components/Navbar/Navbar';
import styles from './Home.module.css';
import {Center} from "@mantine/core";

export default function HomePage() {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div className={styles.stack}>
          <Center>
            <img src="/logoname.svg" alt="Logo" style={{ width: '100%', maxWidth: '600px', height: 'auto' }} />
          </Center>
          <CoachesFeed />
        </div>
      </div>
    </>
  );
}
