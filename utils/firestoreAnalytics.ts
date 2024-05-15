import {
  CollectionReference,
  DocumentReference,
  getDoc,
  getDocs,
  Query,
} from 'firebase/firestore';
import { logAnalyticsEvent } from '@/hooks/log-event';

// TODO fix the logging of firestore reads
export async function getFirestoreDoc(docRef: DocumentReference) {
  // await logAnalyticsEvent('firestore_read', {
  //   value: docRef.parent.id,
  //   ...(docRef.id?.length !== 28 && { id: docRef.id }),
  //   path: window?.location?.pathname ?? '',
  // });
  return getDoc(docRef);
}

export async function getFirestoreDocs(collRef: Query | CollectionReference) {
  const docs = await getDocs(collRef);
  for (let i = 0; i < docs.size; i++) {
    logAnalyticsEvent('firestore_read', {
      value: docs.docs[i].ref.parent.id,
      ...(docs.docs[i].ref.id?.length !== 28 && { id: docs.docs[i].ref.id }),
      path: window?.location?.pathname ?? '',
    });
  }
  return docs;
}
