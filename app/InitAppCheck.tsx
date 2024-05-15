'use client';

import { useEffect } from 'react';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { app } from '@/firebase.config';

function InitAppCheck() {
  useEffect(() => {
    // if (
    //   process.env.NEXT_PUBLIC_ENV === 'dev' ||
    //   process.env.NEXT_PUBLIC_ENV === 'staging'
    // ) {
    //   (self as any).FIREBASE_APPCHECK_DEBUG_TOKEN = true;
    // }
    // eslint-disable-next-line no-restricted-globals
    (self as any).FIREBASE_APPCHECK_DEBUG_TOKEN = true;
    const appCheck = initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider('6Lebz90pAAAAAP7OMrPjZUPJHMJMYFpZFHGBhhP2'),
      isTokenAutoRefreshEnabled: true,
    });
  }, []);
  return <></>;
}

export default InitAppCheck;
