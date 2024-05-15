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

  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [coach, setCoach] = useState<Coach | null>(null);

  const coachId = searchParams.get('coachId');

  if (!coachId) {
    return null;
  }

  // Fetch coach data
  const coachQuery = usePublicCoachData(coachId);

  // Update name when data is loaded successfully
  useEffect(() => {
    if (coachQuery.data) {
      setCoach(coachQuery.data);
      setIsDataLoaded(true);
    }
  }, [coachQuery.data]);

  if (!isDataLoaded) {
    // TODO fix this loading spinner
    return <div>Loading...</div>;
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
