import { Button, Grid } from '@mantine/core';
import React from 'react';
import Link from 'next/link';

function convertToDate(year: number, month: number, day: number, index: number): string {
  const date = new Date(year, month, day);
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

// Filter the availability based on the type of session
function filterAvailability(availability: number[], typeofSession: string | null): number[] {
  let lengthOfSession = 1;
  // resume session is 15 min long, interview session is 45 min long, and the default session is 15 min long
  if (typeofSession === 'resume') {
    lengthOfSession = 1;
  } else if (typeofSession === 'interview') {
    lengthOfSession = 3;
  }

  return availability.map((time, index) => {
    if (time === 1) { // If the current slot is available
      // eslint-disable-next-line no-plusplus
      for (let i = 1; i < lengthOfSession; i++) { // Check the next lengthOfSession - 1 slots
        if (availability[index + i] === 0) { // If any of these slots is not available
          return 0; // Mark the current slot as unavailable
        }
      }
      return 1; // Otherwise, the slot is available
    }
    return 0; // If the current slot is unavailable, return 0
  });
}

// dailyAvailability is a 12 byte representation of the availability of a coach in a day
export function AvailabilityModal({
                                    date,
                                    coachId,
                                    dailyAvailability,
                                    typeofSession,
                                  }: {
  date: Date;
  coachId: string
  dailyAvailability: string
  typeofSession: string | null
}) {
  function convertHextoAvailArray(hexstr: string): number[] {
    const hex = hexstr.split('');
    const availability = hex.map((char) => parseInt(char, 16)
      .toString(2)
      .padStart(4, '0'));
    const availabilityArray = availability.join('')
      .split('')
      .map((char) => parseInt(char, 10));
    return filterAvailability(availabilityArray, typeofSession);
  }

  const availability = convertHextoAvailArray(dailyAvailability);

  const rows = availability.map((time, index) => (
    time === 1 && (
      <Grid.Col span={4} key={index}>
        {/*TODO right now pass the time and coachId as query params, but this should be changed to a POST request*/}
        <Link
          href={`/profile/confirmsesh?coachId=${coachId}&time=${convertToDate(date.getFullYear(), date.getMonth(), date.getDate(), index)}&type=${typeofSession}`}
          passHref
        >
          <Button
            fullWidth
            style={{
              paddingLeft: 'unset',
              paddingRight: 'unset',
            }}
          >
            {convertToDate(date.getFullYear(), date.getMonth(), date.getDate(), index)}
          </Button>
        </Link>
      </Grid.Col>
    )
  ));

  const rowsHeight = availability.filter(time => time === 1).length * 50; // Assuming each button has a height of 50px

  return (
    <div style={{
      maxHeight: '400px',
      overflowY: 'auto',
    }}
    > {/* Change the maxHeight to your desired value */}
      <Grid style={{
        paddingTop: 20,
        height: rowsHeight > 400 ? '100%' : 'auto',
      }}
      >
        {rows}
      </Grid>
    </div>
  );
}
