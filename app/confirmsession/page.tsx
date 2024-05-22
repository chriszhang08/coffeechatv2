'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { HeaderSearch } from '@/components/Navbar/Header';
import SessionDetails from "@/components/ProfilePage/ConfirmSessionForm/SessionDetails";

function SessionDetailsParams() {
  const searchParams = useSearchParams();

  const sessionId = searchParams.get('sessionId');
  const coachId = searchParams.get('coachId');
  const time = searchParams.get('time');
  const type = searchParams.get('type');

  return <SessionDetails coachId={coachId} time={time} type={type} />;
}

function Page() {
  return (
    <>
      <HeaderSearch />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 10,
      }}
      >
        <Suspense>
          <SessionDetailsParams />
        </Suspense>
      </div>
    </>
  );
}

export default Page;
