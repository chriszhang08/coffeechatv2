import { DatePicker, DatePickerProps, DatesProvider } from '@mantine/dates';
import React, { useState } from 'react';
import { AvailabilityModal } from '@/components/ProfilePage/AvailabilityCalendar/AvailabilityModal';
import { Coach } from '@/types/firestore/coaches/coach';

interface CalendarProps {
  coachObj: Coach | null;
  selectedButtonState: string | null;
}

// EFFECT: Converts a Date object to an index in the availability array
// For example, January 1 will be converted to 0, while February 1 will be converted to 31
function datetimeToIndex(date: Date): number {
  const month = date.getMonth();
  const day = date.getDate();

  let index = 0;
  for (let i = 0; i < month; i++) {
    index += new Date(date.getFullYear(), i + 1, 0).getDate(); // Add the days of each previous month
  }

  return index + day - 1;
}

// TODO implement time zone conversion
export function AvailabilityCalendar({
                                       coachObj,
                                       selectedButtonState,
                                     }: CalendarProps) {
  const [selected, setSelected] = useState<Date | null>(null);

  if (!coachObj) {
    return null;
  }

  // function for the getDayProps prop of a certain date of the DatePicker
  const getDayProps: DatePickerProps['getDayProps'] = (date) => {
    // checks if the dateAvailability hex string is all zeros
    if (/^0+$/.test(coachObj.availability[datetimeToIndex(date)])) {
      return {
        style: {
          backgroundColor: 'var(--mantine-color-gray-filled)',
          color: 'var(--mantine-color-light-gray)',
        },
      };
    }

    return {};
  };

  return (
    <DatesProvider settings={{
      locale: 'ru',
      firstDayOfWeek: 0,
      weekendDays: [0],
      timezone: 'UTC',
    }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '400px',
      }}
      >
        <h1 style={{ textAlign: 'center' }}>Book a Session</h1>
        <DatePicker
          weekendDays={[]}
          value={selected}
          onChange={setSelected}
          getDayProps={getDayProps}
          allowDeselect
          hideOutsideDates
        />
        {selected && (
          <AvailabilityModal
            date={selected}
            coachId={coachObj.cidAuth}
            dailyAvailability={coachObj.availability[datetimeToIndex(selected)]}
            typeofSession={selectedButtonState}
          />
        )}
      </div>
    </DatesProvider>
  );
}
