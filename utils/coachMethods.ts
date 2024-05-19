import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { Coach } from '@/types/firestore/coaches/coach';
import { Comment } from '@/types/firestore/coaches/comments/comment';
import { db } from '@/firebase.config';
import { getFirestoreDoc } from '@/utils/firestoreAnalytics';

export async function getPublicCoachData(
  coachId: string | null,
): Promise<Coach> {
  if (!coachId) {
    return {} as Coach;
  }
  const docRef = doc(db, 'coaches', coachId);
  const docSnap = await getFirestoreDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    return data as Coach;
  }
  return {} as Coach;
}

export async function getComments(coachId: string): Promise<Comment[]> {
  
  // For comment debugging -> adds delay for fetching the comments
  // await new Promise(resolve => setTimeout(resolve, 5000));
  
  const collectionRef = collection(db, `coaches/${coachId}/comments`);
  const snapshot = await getDocs(collectionRef);
  if (!snapshot.empty) {
    return snapshot.docs.map((comm) => comm.data() as Comment);
  }
  return [];
}

export async function updateCoachAvailability(
  coachId: string | null,
  availability: string[],
): Promise<void> {
  if (!coachId) {
    return;
  }
  return setDoc(doc(db, 'coaches', coachId), { availability }, { merge: true });
}
