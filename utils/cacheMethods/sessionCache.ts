// Save data to localStorage
import {Session} from "@/types/firestore/sessions/session";

export function cacheSessionData(sessionData : Partial<Session>, availability: string[] | undefined) {
  try {
    const serializedData = JSON.stringify({...sessionData, availability});
    localStorage.setItem('sessionData', serializedData);
  } catch (error) {
    console.error("Failed to cache session data:", error);
  }
}

// Load data from localStorage
export function loadCachedSessionData() {
  try {
    const serializedData = localStorage.getItem('sessionData');
    if (serializedData === null) {
      return undefined;
    }
    return JSON.parse(serializedData);
  } catch (error) {
    console.error("Failed to load cached session data:", error);
    return undefined;
  }
}

export function clearCachedSessionData() {
  localStorage.removeItem('sessionData');
}
