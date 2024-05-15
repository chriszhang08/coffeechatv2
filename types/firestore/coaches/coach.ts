export interface Coach {
  cidAuth: string;
  cid: string;
  email: string;
  name: string;
  phoneNumber: number;
  subjects: string[];
  // Update the availability each year
  // Each month will have an array of dates
  // Strings are hex-string representations of the daily availability
  availability: string[];
  bio: string;
  rating: number;
  numSessions: number;
}
