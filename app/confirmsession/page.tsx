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
import {useHash} from "@mantine/hooks";
import {useRouter} from "next/navigation";
import {loadCachedSessionData} from "@/utils/cacheMethods/sessionCache";
import {Session} from "@/types/firestore/sessions/session";

// Whoever authenticates the google account is the organizer, need to pass the session object details into the authentication page
const passToken = async (accessToken: string, sessionObj: Partial<Session>) => {
  const res = await fetch('/api/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({...sessionObj, accessToken}),
  });

  if (res.ok) {
    // TODO add a success alert box
    console.log('Email sent successfully', res.status);
  } else {
    // TODO add an error alert box
    console.error('Failed to send email: Error(', res.status, ') ', res.statusText);
    // Handle error
  }

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
      passToken(accessToken, sessionData);
      setApiStatus('success');
    } catch (e) {
      console.error(e);
      setApiStatus('error')
    } finally {
      setIsLoading(false);
    }
  }, [accessToken]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (apiStatus === 'success') {
    return <div>Success</div>;
  } else if (apiStatus === 'error') {
    return <div>Session Failed to Create</div>;
  }

  return <div>Nothing page</div>
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
