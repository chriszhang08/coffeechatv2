import {Button, Grid} from '@mantine/core';
import React from 'react';
import Link from 'next/link';
import {convertHextoAvailArray, indexmapToLocaltime, timeslotToUTCstr} from "@/utils/dateMethods";

// Datetime objects in the calendar will be displayed in the client's local time zone.
// The datetime objects and availability hexstrings will be stored in the backend in UTC time.

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
                                    threedayAvailability,
                                    typeofSession,
                                  }: {
  date: Date;
  coachId: string
  threedayAvailability: string
  typeofSession: string | null
}) {

  const availability = filterAvailability(convertHextoAvailArray(threedayAvailability), typeofSession);

  const rows = availability.map((time, index) => (
    time === 1 && (
      <Grid.Col span={4} key={index}>
        <Link
          href={`/profile/confirmsesh?coachId=${coachId}&time=${timeslotToUTCstr(date, index)}&type=${typeofSession}`}
          passHref
        >
          <Button
            fullWidth
            style={{
              paddingLeft: 'unset',
              paddingRight: 'unset',
            }}
          >
            {indexmapToLocaltime(date, index)}
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
      <div>
        Times are in {Intl.DateTimeFormat().resolvedOptions().timeZone} time zone
      </div>
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
