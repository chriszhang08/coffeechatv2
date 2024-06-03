'use client';

import {useSearchParams} from 'next/navigation';
import React, {Suspense, useEffect, useState} from 'react';
import {HeaderSearch} from '@/components/Navbar/Header';
import SessionDetails from "@/components/ProfilePage/ConfirmSessionForm/SessionDetails";
import {Coach} from "@/types/firestore/coaches/coach";
import {usePublicCoachData} from "@/hooks/useCoachData";
import CoachProfileCard from "@/components/CoachesFeed/CoachProfileCard";
import {ProfileBadgeSnapshot} from "@/components/ProfilePage/ProfileBadge/ProfileBadgeSnapshot";
import ProfileBadge from "@/components/ProfilePage/ProfileBadge/ProfileBadge";
import {useHash} from "@mantine/hooks";
import {useRouter} from "next/navigation";
import {clearCachedSessionData, loadCachedSessionData} from "@/utils/cacheMethods/sessionCache";
import {Session} from "@/types/firestore/sessions/session";
import {SuccessComponent} from "@/components/StatusComponents/SuccessComponent";
import {ErrorComponent} from "@/components/StatusComponents/ErrorComponent";
import Link from "next/link";

// Whoever authenticates the google account is the organizer, need to pass the session object details into the authentication page
const passToken = async (accessToken: string, sessionObj: Partial<Session>) => {
  return await fetch('/api/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({...sessionObj, accessToken}),
  });
}

async function SessionDetailsParams() {
  const [hash, setHash] = useHash();
  const [isLoading, setIsLoading] = useState(true);
  const [apiStatus, setApiStatus] = useState<String | null>(null); // null | 'success' | 'error'

  const params = new URLSearchParams(hash);
  const accessToken = params.get('access_token');
  const tokenType = params.get('token_type');
  const expiresIn = params.get('expires_in');

  useEffect(() => {
    setIsLoading(true);
    if (!accessToken) {
      return
    }
    try {
      const sessionData = loadCachedSessionData();
      passToken(accessToken, sessionData).then((response) => {
        if (response.ok) {
          setApiStatus('success');
        } else {
          console.log('Error in sending email', response.status, response.statusText)
          setApiStatus('error');
        }
      });
    } catch (e) {
      console.log('Error in sending email reached catch block')
    } finally {
      setIsLoading(false);
      clearCachedSessionData();
    }
  }, [accessToken]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (apiStatus === 'success') {
    return <SuccessComponent/>;
  } else if (apiStatus === 'error') {
    return <ErrorComponent/>;
  }

  return <div>Oop, easter egg! Hopefully this message goes away in a sec. If not, please email {' '}
    <Link
    href='mailto:czhang2003@gmail.com'>czhang2003@gmail.com
    </Link>
  </div>
}

function Page() {
  return (
    <>
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
