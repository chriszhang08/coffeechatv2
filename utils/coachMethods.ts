import {addDoc, collection, doc, getDocs, setDoc, query, limit} from 'firebase/firestore';
import {Coach} from '@/types/firestore/coaches/coach';
import {Comment} from '@/types/firestore/coaches/comments/comment';
import {db, storage} from '@/firebase.config';
import {getFirestoreDoc} from '@/utils/firestoreAnalytics';
import {getDownloadURL, ref} from "@firebase/storage";
import {convertBinaryAvailtoHex, convertHextoAvailArray, datetimeToIndex} from "@/utils/dateMethods";

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

// ORIGINAL FUNCTION, UNCOMMENT WHEN READY TO USE
// export async function updateCoachAvailability(
//   coachId: string | null,
//   availability: string[],
// ): Promise<void> {
//   if (!coachId) {
//     return;
//   }
//   return setDoc(doc(db, 'coaches', coachId), { availability }, { merge: true });
// }

// NEW FUNCTION TO INJECT AVAILABILITY INTO A SPECIFIC DATE IN THE AVAILABILITY ARRAY
export async function updateCoachAvailability(
  coachId: string | null,
  availability: string[],
): Promise<void> {
  if (!coachId) {
    return;
  }

  const startIndex = datetimeToIndex(new Date(2024, 5, 7));
  const endIndex = datetimeToIndex(new Date(2024, 5, 17)); // + 1 day because of utc overflow

  // Goal is to overwrite the availability array in between the start and end date

  // first, create a new array with the new availability
  //     1. turn the 1x480 array into a 10x48 array
  // TODO change firstarr to be your when2meet availability array
  let firstarr = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  let newarr = [];
  let utcchar = null;
  for (let i = 0; i < 10; i++) {
    console.log(i);
    const cstbinaryavail = firstarr.slice(i * 48, (i + 1) * 48);
    // convert the binary availability to hex
    const csthexstr = convertBinaryAvailtoHex(cstbinaryavail);
    console.log(csthexstr);
    // combine '0000000000000' with the first 11 characters of the hex string
    let injectionstr = '0000000000000' + csthexstr.slice(0, 11);
    if (utcchar) {
      // if there is a utc shift character, add it to the injection string
      injectionstr = utcchar + injectionstr.slice(1);
    }
    // save the last character of the hex string as the utc shift character
    utcchar = csthexstr[11];
    // add the injection to the new array
    newarr.push(injectionstr);
  }
  // add the utc shift character to the new array
  newarr.push(utcchar + '00000000000000000000000');
  // then overwrite the availability array passed in with the new availability array
  for (let i = startIndex; i < endIndex + 1; i++) {
    availability[i] = newarr[i - startIndex];
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

export async function getResumeFromStorage(coachId : string): Promise<string | null> {
  try {
    return await getDownloadURL(ref(storage, `/${coachId}.pdf`));
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getFiveCoaches(): Promise<Coach[]> {
  const coaches: Coach[] = [];
  const collectionRef = collection(db, 'coaches');
  const q = query(collectionRef, limit(5));
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
