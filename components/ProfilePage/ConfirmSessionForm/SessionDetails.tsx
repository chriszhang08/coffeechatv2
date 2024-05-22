import {Alert, Button, Card, Container, Group, SimpleGrid, Text, Textarea, TextInput, Title,} from '@mantine/core';
import {useForm} from '@mantine/form';
import {useRouter} from 'next/navigation';
import React, {useEffect, useState} from 'react';
import {IconInfoCircle} from '@tabler/icons-react';
import {usePublicCoachData} from '@/hooks/useCoachData';
import {Coach} from '@/types/firestore/coaches/coach';
import {formatTimeStringLocal, isoStringToDate} from "@/utils/dateMethods";

interface SessionDetailsProps {
  coachId: string | null;
  time: string | null;
  type: string | null;
}

function getPrice(type: string | null, coach: Coach | null) {
  if (type === null) {
    return '0';
  } else if (type === 'interview') {
    return '$50';
  } else {
    return '$30'
  }
}

const SessionDetails: React.FC<SessionDetailsProps> = ({
                                                                 coachId,
                                                                 time,
                                                                 type
                                                               }) => {
  const [coach, setCoach] = useState<Coach | null>(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const icon = <IconInfoCircle/>;

  const router = useRouter();

  const coachData = usePublicCoachData(coachId);

  useEffect(() => {
    setCoach(coachData);
    setIsDataLoaded(true);
  }, [coachData]);

  if (!isDataLoaded) {
    // TODO fix this loading spinner
    return <div>Loading...</div>;
  }

  const date = isoStringToDate(time);

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          coachName: coach?.name,
          date: date,
          link: 'https://meet.google.com/abc-123-def',
          sessionDetails: type,
          price: getPrice(type, coach),
        }),
      });

      if (response.ok) {
        console.log('Email sent successfully');
        // TODO figure out what screen to show after the email is sent
        router.push('/success');
        // Handle success
      } else {
        console.error('Failed to send email:', response.statusText);
        // Handle error
      }
    } catch (e) {
      console.log('Error adding document: ', e);
    }
  };

  return (
    <div>
      <Title
        order={2}
        size="h1"
        style={{fontFamily: 'Greycliff CF, var(--mantine-font-family)'}}
        fw={900}
        ta="center"
      >
        Confirm Session
      </Title>
      <SimpleGrid cols={2} style={{ paddingTop: 50 }}>
        <Card withBorder radius="md" style={{width: 400}}>
          <Title order={2}>
            Session Information
          </Title>
          <Title order={5}>Date:</Title>
          <Text size="lg">{date.toDateString()}</Text>
          <Title order={5}>Time:</Title>
          <Text size="lg">{formatTimeStringLocal(date)}</Text>
          <Title order={5}>Coach:</Title>
          <Text size="lg">{coach?.name}</Text>
          <Title order={5}>Session Type:</Title>
          <Text size="lg">{type}</Text>
          <Title order={5}>Price:</Title>
          <Text size="lg">
            {getPrice(type, coach)}
          </Text>
          <Title order={5}>Meeting Link:</Title>
          <Alert variant="light" color="blue" icon={icon}>
            https://meet.google.com/abc-123-def
          </Alert>
        </Card>
      </SimpleGrid>
      <Button
        onClick={handleSubmit}
        style={{marginTop: 20}}
      >
        Click here to confirm the session with the mentee
      </Button>
    </div>
  );
};

export default SessionDetails;
