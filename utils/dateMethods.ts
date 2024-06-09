// All Date objects will be stored in the backend in UTC time.
// When displaying the date to the user, we will convert the date to the user's local time zone.
// This will ensure that the date and time displayed to the user is accurate.


export function bitStringToHexStr(bitString: string): string {
  // Check if bitString is empty or contains characters other than '0' or '1'
  if (bitString === "" || !/^[01]+$/.test(bitString)) {
    throw new Error("Input is not a valid bit string.");
  }
  // Check that the bit string has 3x4x24 = 96 bits
  if (bitString.length !== 288) {
    throw new Error("Input bit string is not of the correct length 288.");
  }
  // Parse the bit string to a numeric value and convert it to a hex string
  const hexString: string = parseInt(bitString, 2).toString(16);
  // Pad the hex string with leading zeros to ensure it has 24 characters
  return hexString.padStart(72, '0');
}

export function hexStrToBitString(threedayhexstr: string): string {
  // Check if hexStr is empty or contains characters other than '0' to '9' or 'a' to 'f'
  if (threedayhexstr === "" || !/^[0-9A-Fa-f]+$/.test(threedayhexstr)) {
    throw new Error("Input is not a valid hex string.");
  }
  // Parse the hex string to a numeric value and convert it to a bit string
  const bitString: string = parseInt(threedayhexstr, 16).toString(2);
  // Pad the bit string with leading zeros to ensure it has 96 bits
  return bitString.padStart(288, '0');
}

export function formatUTCDate(date: Date) {
  let str = date.toUTCString();
}


// TODO write a function that takes the clients dailyHexAvailability and writes it into UTC time
export function dailyAvailabilityToHex(dailyAvailability: number[]): string {
  return dailyAvailability.reduce((acc, val) => acc + val, '');
}

// REQUIRES: index is the index of the bit in the availability bitstring
//           the availability bitstring is a string of 0s and 1s and is in UTC time
// EFFECT: maps the availability of a coach from the bitstring format to the corresponding time in 12-hour Local time
// 0000 -> 12:00 AM
export function indexmapToLocaltime(date: Date, index: number): string {
  const hour = Math.floor(index / 4);
  const minute = (index % 4) * 15;

  date.setHours(hour, minute, 0, 0); // Set hours, minutes, and seconds, milliseconds

  // Format the date to "H:MM AM/PM" format
  return date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

// REQUIRES: index is the index of the bit in the availability bitstring
//           the selected time slot is in the client's local time zone
// EFFECT: converts the selected time slot to a datetime string, keeping it in UTC time zone
export function timeslotToUTCstr(d: Date, index: number): string {
  const hour = Math.floor(index / 4);
  const minute = (index % 4) * 15;

  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
}

// REQUIRES: hexstr is a hexstring (len 3x24) representing the availability of a coach in 3 days of UTC time
// EFFECT: converts the hexstring to a bitarray of 1 days length in the client's local time zone
export function convertHextoAvailArray(hexstr: string): number[] {
  // check that hexstr is of the correct length 72
  if (hexstr.length !== 72) {
    throw new Error('Availability string is not of the correct length 72');
  }
  const utc_hex = hexstr.split('');
  const utc_availability = utc_hex.map((char) => parseInt(char, 16)
    .toString(2)
    .padStart(4, '0'));
  let utcArr = utc_availability.join('')
    .split('')
    .map((char) => parseInt(char, 10));
  // offset the time to the client's local time zone
  const offset = new Date().getTimezoneOffset() / 15;
  return utcArr.slice(24 * 4 + offset, 48 * 4 + offset);
}

// REQUIRES: date is a Date object in the client's local time zone
// EFFECT: Converts a Date object to an index in the availability array
// For example, January 1 will be converted to 0, while February 1 will be converted to 31
export function datetimeToIndex(date: Date): number {
  const month = date.getMonth();
  const day = date.getDate();

  let index = 0;
  for (let i = 0; i < month; i++) {
    index += new Date(date.getFullYear(), i + 1, 0).getDate(); // Add the days of each previous month
  }

  return index + day - 1;
}

export function formatTimeStringLocal(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZoneName: 'short',
  });
}

export function isoStringToDate(isoString: string | null): Date {
  if (isoString === null) {
    return new Date();
  }
  return new Date(isoString);
}
