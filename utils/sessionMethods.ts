import {addDoc, collection, doc, getDocs, setDoc} from 'firebase/firestore';
import { Session } from '@/types/firestore/sessions/session';
import { db } from '@/firebase.config';
import { getFirestoreDoc } from '@/utils/firestoreAnalytics';

export async function createSession (data: Partial<Session>): Promise<string> {
  const sessionRef = await addDoc(collection(db, 'sessions'), data);
  return sessionRef.id;
}
