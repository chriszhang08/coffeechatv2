'use client';

import {useSearchParams} from 'next/navigation';
import {Button, Group} from '@mantine/core';
import {Suspense, useEffect, useState} from 'react';
import {HeaderSearch} from '@/components/Navbar/Header';
import {usePublicCoachData} from '@/hooks/useCoachData';
import {Coach} from '@/types/firestore/coaches/coach';
import {EditAvailabilityCalendar} from "@/components/ProfilePage/AvailabilityCalendar/EditAvailabilityCal";
import {EditProfileBadgeForm} from "@/components/ProfilePage/ProfileBadge/EditProfileBadgeForm";

function UpdateAvailabilityParams() {
  const searchParams = useSearchParams();
  const coachId = searchParams.get('coachId');

  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [coach, setCoach] = useState<Coach | null>(null);

  const coachData = usePublicCoachData(coachId);

  useEffect(() => {
    setCoach(coachData);
    setIsDataLoaded(true);
  }, [coachData]);

  return (
    <>
      <Group>
        <EditProfileBadgeForm coachId={coachId}/>
        {coach && <EditAvailabilityCalendar coachObj={coach}></EditAvailabilityCalendar>}
      </Group>
    </>
  );
}

function Page() {
  // TODO push 12 months of availiability
  // TODO create a form that allows the user to select the availability
  return (
    <>
      <HeaderSearch/>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 10,
      }}
      >
        <Suspense>
          <UpdateAvailabilityParams/>
        </Suspense>
      </div>
    </>
  )
}

export default Page;
