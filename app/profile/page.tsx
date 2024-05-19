'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import ProfileBadge from '@/components/ProfilePage/ProfileBadge/ProfileBadge';
import { CommentStack } from '@/components/Comments/CommentStack';
import { AvailabilityCalendar } from '@/components/ProfilePage/AvailabilityCalendar/AvailabilityCalendar';
import { HeaderSearch } from '@/components/Navbar/Header';
import { usePublicCoachData } from '@/hooks/useCoachData';
import { Coach } from '@/types/firestore/coaches/coach';

function CoachProfileSearch() {
  const searchParams = useSearchParams();

  const [selectedButton, setSelectedButton] = useState<string | null>('resume');
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [coach, setCoach] = useState<Coach | null>(null);

  const coachId = searchParams.get('coachId');

  const coachData = usePublicCoachData(coachId);

  useEffect(() => {
    setCoach(coachData);
    setIsDataLoaded(true);
  }, [coachData]);

  if (!isDataLoaded) {
    // TODO fix this loading spinner
    return <div>Loading...</div>;
  }

  if (!coachId) {
    return <div>CoachId is invalid</div>;
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'center',
      padding: 10,
    }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      }}
      >
        <ProfileBadge
          coachObj={coach}
          selectedButtonState={selectedButton}
          onClickHandler={setSelectedButton}
        />
        <AvailabilityCalendar
          coachObj={coach}
          selectedButtonState={selectedButton}
        />
      </div>
      <CommentStack coachId={coachId} />
    </div>
  );
}

function Page() {
  return (
    <>
      <HeaderSearch />
      <Suspense>
        <CoachProfileSearch />
      </Suspense>
    </>
  );
}

export default Page;
