import {DatePicker, DatePickerProps, DatesProvider} from '@mantine/dates';
import React, {useState} from 'react';
import {AvailabilityModal} from '@/components/ProfilePage/AvailabilityCalendar/AvailabilityModal';
import {Coach} from '@/types/firestore/coaches/coach';
import {datetimeToIndex} from "@/utils/dateMethods";

interface CalendarProps {
  coachObj: Coach | null;
  selectedButtonState: string | null;
}

export function AvailabilityCalendar({
                                       coachObj,
                                       selectedButtonState,
                                     }: CalendarProps) {
  const [selected, setSelected] = useState<Date | null>(null);

  if (!coachObj) {
    return null;
  }

  const getThreeDayAvailability = (date: Date): string => {
    const availability = coachObj.availability;
    const index = datetimeToIndex(date);
    return availability[index - 1].concat(availability[index], availability[index + 1]);
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
      timezone: undefined,
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
          minDate={new Date()}
          allowDeselect
          hideOutsideDates
        />
        {selected && (
          <AvailabilityModal
            date={selected}
            coachId={coachObj.cidAuth}
            threedayAvailability={getThreeDayAvailability(selected)}
            typeofSession={selectedButtonState}
          />
        )}
      </div>
    </DatesProvider>
  );
}
