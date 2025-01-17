'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import ConfirmSessionForm from '@/components/ProfilePage/ConfirmSessionForm/ConfirmSessionForm';
import { HeaderSearch } from '@/components/Navbar/Header';
import {Center} from "@mantine/core";

function ConfirmSessionParams() {
  const searchParams = useSearchParams();

  const coachId = searchParams.get('coachId');
  const time = searchParams.get('time');
  const type = searchParams.get('type');

  return <ConfirmSessionForm coachId={coachId} time={time} type={type} />;
}

function Page() {
  return (
    <>
      <Center>
        <img src="/logoname.svg" alt="Logo" style={{ width: '100%', maxWidth: '600px', height: 'auto' }} />
      </Center>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 10,
        overflow: 'hidden',
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

