'use client';

import './style.css';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import ProfileBadge from '@/components/ProfilePage/ProfileBadge/ProfileBadge';
import { CommentStack } from '@/components/Comments/CommentStack';
import { AvailabilityCalendar } from '@/components/ProfilePage/AvailabilityCalendar/AvailabilityCalendar';
import { HeaderSearch } from '@/components/Navbar/Header';
import { usePublicCoachData } from '@/hooks/useCoachData';
import { Coach } from '@/types/firestore/coaches/coach';
import Link from "next/link";
import {FooterSimple} from "@/components/Navbar/FooterSimple";

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
    <div id='column'>
      <div id='row'>
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
      {/*<div id="mobile-comments">*/}
      {/*  <CommentStack coachId={coachId} />*/}
      {/*</div>*/}
    </div>
  );
}

function Page() {
  return (
    <div className='paddingContainer'>
      {/*<Link href={'/'}>*/}
      {/*  <img src="/logo.svg" alt="Logo" className="logo" />*/}
      {/*</Link>*/}
      <Suspense fallback={<div>Loading...</div>}>
        <CoachProfileSearch />
      </Suspense>
      <FooterSimple />
    </div>
  );
}

export default Page;
