'use client';

import {useSearchParams} from 'next/navigation';
import {Suspense, useEffect, useState} from 'react';
import {HeaderSearch} from '@/components/Navbar/Header';
import SessionDetails from "@/components/ProfilePage/ConfirmSessionForm/SessionDetails";
import {Coach} from "@/types/firestore/coaches/coach";
import {usePublicCoachData} from "@/hooks/useCoachData";
import CoachProfileCard from "@/components/CoachesFeed/CoachProfileCard";
import {ProfileBadgeSnapshot} from "@/components/ProfilePage/ProfileBadge/ProfileBadgeSnapshot";
import ProfileBadge from "@/components/ProfilePage/ProfileBadge/ProfileBadge";

function SessionDetailsParams() {
  const searchParams = useSearchParams();

  const sessionId = searchParams.get('sessionId');
  const coachId = searchParams.get('coachId');

  const [coach, setCoach] = useState<Coach | null>(null);

  const coachData = usePublicCoachData(coachId);

  useEffect(() => {
    setCoach(coachData);
  }, [coachData]);

  return (
    <div>
      <ProfileBadgeSnapshot person={coach} />
      <SessionDetails sessionId={sessionId} coachObj={coachData}/>
    </div>
  );
}

function Page() {
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
          <SessionDetailsParams/>
        </Suspense>
      </div>
    </>
  );
}

export default Page;
