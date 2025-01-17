import {addDoc, collection, doc, getDocs, setDoc, query, limit} from 'firebase/firestore';
import {Coach} from '@/types/firestore/coaches/coach';
import {Comment} from '@/types/firestore/coaches/comments/comment';
import {db, storage} from '@/firebase.config';
import {getFirestoreDoc} from '@/utils/firestoreAnalytics';
import {getDownloadURL, ref} from "@firebase/storage";
import {bitStringToHexStr, datetimeToIndex, hexStrToBitString} from "@/utils/dateMethods";

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

export async function blockCoachAvailability(
  coachId: string | null,
  date: Date,
  availability: string[],
): Promise<void> {
  if (!coachId) {
    return;
  }
  const localeHour = date.getHours();
  const localeIndex = 96 + localeHour * 4 + Math.floor(date.getMinutes() / 15);
  // shift the index by the timezone offest
  const strIndex = localeIndex + Math.floor(date.getTimezoneOffset() / 15);
  const dayIndex = datetimeToIndex(date);

  let threedayStrAvailability = availability[dayIndex - 1].concat(availability[dayIndex], availability[dayIndex + 1]);
  // convert hourStrAvailability from a hex char to a bit str
  let hourAvailability = hexStrToBitString(threedayStrAvailability);
  // flip the bit at the index
  // TODO make it so that the bit flip is dynamic based on length of session
  hourAvailability = hourAvailability.substring(0, strIndex - 1) + '000' + hourAvailability.substring(strIndex + 2);
  // convert back to hex
  threedayStrAvailability = bitStringToHexStr(hourAvailability);


  // split the dayStrAvailability back into 3 days
  availability[dayIndex - 1] = threedayStrAvailability.substring(0, 24);
  availability[dayIndex] = threedayStrAvailability.substring(24, 48);
  availability[dayIndex + 1] = threedayStrAvailability.substring(48, 72);

  return setDoc(doc(db, 'coaches', coachId), { availability }, { merge: true });
}

export async function getResumeFromStorage(coachId : string): Promise<string | null> {
  try {
    return await getDownloadURL(ref(storage, `/${coachId}.pdf`));
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getCoaches(): Promise<Coach[]> {
  const coaches: Coach[] = [];
  const collectionRef = collection(db, 'coaches');
  const q = query(collectionRef, limit(10));
  const snapshot = await getDocs(q);

  snapshot.forEach(doc => {
    if (doc.exists()){
      coaches.push(doc.data() as Coach)
    }
  });
  return coaches;
}

export async function getImageUrl(imagePath: string): Promise<string> {
  try {
    const url = await getDownloadURL(ref(storage, imagePath));
    return url;
  } catch (error) {
    console.error('Failed to fetch image URL:', error);
    throw error;
  }
}
