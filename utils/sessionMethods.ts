import {addDoc, collection, doc, getDocs, setDoc} from 'firebase/firestore';
import { Session } from '@/types/firestore/sessions/session';
import { db } from '@/firebase.config';
import { getFirestoreDoc } from '@/utils/firestoreAnalytics';

export async function createSession (data: Partial<Session>): Promise<string> {
  const sessionRef = await addDoc(collection(db, 'sessions'), data);
  return sessionRef.id;
}

export async function getPublicSessionData(
  sessionId: string | null,
): Promise<Session> {
  if (!sessionId) {
    return {} as Session;
  }
  const docRef = doc(db, 'sessions', sessionId);
  const docSnap = await getFirestoreDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    return data as Session;
  }
  return {} as Session;
}
