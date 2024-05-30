import {addDoc, collection, doc, getDocs, setDoc} from 'firebase/firestore';
import { Coach } from '@/types/firestore/coaches/coach';
import { Comment } from '@/types/firestore/coaches/comments/comment';
import { db, storage } from '@/firebase.config';
import { getFirestoreDoc } from '@/utils/firestoreAnalytics';
import {getDownloadURL, ref} from "@firebase/storage";

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

export async function updateCoachProfileValues(
  coachId: string | null,
  profileValues: Partial<Coach>,
): Promise<void> {
  if (!coachId) {
    const coachRef = await addDoc(collection(db, 'coaches'), profileValues);
    // Add the 'cidAuth' field with the coachRef.id
    const updatedProfileValues = {
      ...profileValues,
      cidAuth: coachRef.id
    };

    // Update the newly created document with 'cidAuth' field
    return setDoc(coachRef, updatedProfileValues, { merge: true });
  }
  return setDoc(doc(db, 'coaches', coachId), profileValues, { merge: true });
}

export async function getResumeFromStorage(coachId: string): Promise<string> {
  getDownloadURL(ref(storage, '/Chris_Zhang_UMSI_Resume.pdf'))
    .then((url) => {
      // `url` is the download URL for 'images/stars.jpg'

      // This can be downloaded directly:
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = (event) => {
        const blob = xhr.response;
      };
      xhr.open('GET', url);
      xhr.send();

      // Or inserted into an <img> element
      const img = document.getElementById('myimg');
      // img.setAttribute('src', url);
      return url;
    })
    .catch((error) => {
      // Handle any errors
    });
  return "didnt work";
}
