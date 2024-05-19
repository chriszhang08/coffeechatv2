import {DatePicker, DatePickerProps, DatesProvider, DateValue} from '@mantine/dates';
import React, {useState} from 'react';
import {useMutation} from '@tanstack/react-query';
import {Coach} from '@/types/firestore/coaches/coach';
import {Button, Stack, Table} from "@mantine/core";
import {updateCoachAvailability} from "@/utils/coachMethods";

interface CalendarProps {
  coachObj: Coach;
}

// TODO change this to the read value from the coach's availability from the database
// TODO cache this on reload
let yearlyAvailability = Array.from({length: 365}, () => '000000000FFFFFFFFF000000');

// EFFECT: Converts a Date object to an index in the availability array
// For example, January 1 will be converted to 0, while February 1 will be converted to 31
const datetimeToIndex = (date: Date): number => {
  const month = date.getMonth();
  const day = date.getDate();

  let index = 0;
  for (let i = 0; i < month; i++) {
    index += new Date(date.getFullYear(), i + 1, 0).getDate(); // Add the days of each previous month
  }

  return index + day - 1;
};

function convertCellValuesToHexString(cellValues: number[][]): string {
  const hexDigits = '0123456789ABCDEF';

  // Ensure the cellValues array is 4x24
  if (cellValues.length !== 24 || cellValues.some(row => row.length !== 4)) {
    throw new Error('Invalid cellValues array dimensions. Expected 4x24 array.');
  }

  // Convert each row of 4 bits into a single hex digit
  const hexString = cellValues.map(row => {
    // Convert the row of bits into a binary string
    const binaryString = row.join('');
    // Convert the binary string to a decimal number
    const decimalValue = parseInt(binaryString, 2);
    // Convert the decimal number to a hex digit
    return hexDigits[decimalValue];
  }).join('');

  // Ensure the resulting hex string is of the correct length
  if (hexString.length !== 24) {
    throw new Error('The resulting hex string does not have the correct length of 24.');
  }

  return hexString;
}

// TODO implement time zone conversion
export function EditAvailabilityCalendar({
                                           coachObj,
                                         }: CalendarProps) {
  const [selected, setSelected] = useState<Date | null>(null);
  const [cellValues, setCellValues] = useState<number[][]>(
    Array.from({length: 24}, () => Array(4).fill(0))
  );
  const [isDragging, setIsDragging] = useState(false);

  function convertHextoAvailArray(hexstr: string): number[][] {
    const hex = hexstr.split('');
    const availability = hex.map((char) =>
      parseInt(char, 16)
        .toString(2)
        .padStart(4, '0')
    ).join('');

    const result: number[][] = [];

    for (let i = 0; i < availability.length; i += 4) {
      const row = availability.slice(i, i + 4).split('').map((char) => parseInt(char, 10));
      result.push(row);
    }

    return result;
  }

  const setSelectedCustom = (val: DateValue) => {
    setSelected(val);
    if (val) {
      const dateIndex = datetimeToIndex(val);
      const hexString = yearlyAvailability[dateIndex];
      setCellValues(convertHextoAvailArray(hexString));
    }
  };

  // Toggle the bit value (1 to 0, 0 to 1) when a table cell is clicked
  const columns = [':00', ':15', ':30', ':45'];
  const rows = Array.from({length: 24}, (_, i) => i);

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

  const handleMouseDown = (rowIndex: number, colIndex: number, event: any) => {
    event.preventDefault(); // Prevent text selection
    setIsDragging(true);
    handleCellClick(rowIndex, colIndex);
  };

  const handleMouseOver = (rowIndex: number, colIndex: number, event: any) => {
    if (isDragging) {
      handleCellClick(rowIndex, colIndex);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    const updatedCellValues = [...cellValues];
    updatedCellValues[rowIndex][colIndex] = cellValues[rowIndex][colIndex] ? 0 : 1;
    setCellValues(updatedCellValues);
  };

  const mutation = useMutation({
    mutationFn: (availabilityArray: string[]) =>
      updateCoachAvailability(coachObj.cidAuth, availabilityArray),
  });

  function handleSaveButton() {
    if (selected) {
      const dateIndex = datetimeToIndex(selected);
      yearlyAvailability[dateIndex] = convertCellValuesToHexString(cellValues);
    }
    console.log(yearlyAvailability);
    console.log(selected?.toISOString())
  }

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
        <h1 style={{textAlign: 'center'}}>Edit Daily Availability</h1>
        <DatePicker
          weekendDays={[]}
          value={selected}
          onChange={setSelectedCustom}
          getDayProps={getDayProps}
          allowDeselect
          hideOutsideDates
        />
        {selected && (
          <Stack>
            <Table striped highlightOnHover>
              <thead>
              <tr>
                <th></th>
                {/* Empty header for row labels */}
                {columns.map((column, index) => (
                  <th key={index}>{column}</th>
                ))}
              </tr>
              </thead>
              <tbody>
              {rows.map((rowLabel, rowIndex) => (
                <tr key={rowIndex}>
                  <td>{`${rowLabel}:00`}</td>
                  {columns.map((_, colIndex) => (
                    <td
                      key={colIndex}
                      onMouseDown={(event) => handleMouseDown(rowIndex, colIndex, event)}
                      onMouseOver={(event) => handleMouseOver(rowIndex, colIndex, event)}
                      onMouseUp={handleMouseUp}
                      style={{
                        cursor: 'pointer',
                        backgroundColor: cellValues[rowIndex][colIndex] ? 'rgba(47,255,0,0.44)' : 'rgba(0,4,255,0.15)', // Green for 1, Red for 0
                      }}
                    >
                      {cellValues[rowIndex][colIndex]}
                    </td>
                  ))}
                </tr>
              ))}
              </tbody>
            </Table>
            <Button onClick={handleSaveButton}
            >
              Save availability for {selected.toDateString()}
            </Button>
            <Button onClick={() => {
              mutation.mutate(yearlyAvailability);
            }}
            >
              Submit Availability Changes
            </Button>
          </Stack>
        )}
      </div>
    </DatesProvider>
  );
}
