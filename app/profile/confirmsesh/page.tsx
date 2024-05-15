'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import ConfirmSessionForm from '@/components/ProfilePage/ConfirmSessionForm/ConfirmSessionForm';
import { HeaderSearch } from '@/components/Navbar/Header';

function ConfirmSessionParams() {
  const searchParams = useSearchParams();

  const coachId = searchParams.get('coachId');
  const time = searchParams.get('time');

  return <ConfirmSessionForm coachId={coachId} time={time} />;
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
          <ConfirmSessionParams />
        </Suspense>
      </div>
    </>
  );
}

export default Page;
