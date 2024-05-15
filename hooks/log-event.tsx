import { getAnalytics, logEvent, isSupported } from 'firebase/analytics';
import { app } from '@/firebase.config';

export async function logAnalyticsEvent(name: string, params?: any) {
  const analytics = await isSupported().then((yes) =>
    yes ? getAnalytics(app) : null
  );
  if (analytics) {
    logEvent(analytics, name, params);
  }
}
