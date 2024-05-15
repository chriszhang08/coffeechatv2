'use client';

import CoachesFeed from '@/components/CoachesFeed/CoachesUserStack';
import NavbarSearch from '@/components/Navbar/Navbar';
import styles from './Home.module.css';

export default function HomePage() {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <NavbarSearch />
        <div className={styles.stack}>
          <h1>Find Mentors For You</h1>
          <CoachesFeed />
        </div>
      </div>
    </>
  );
}
