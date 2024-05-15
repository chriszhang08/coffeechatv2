import {
  TextInput,
  Textarea,
  SimpleGrid,
  Group,
  Title,
  Text,
  Button,
  Card,
  Alert,
  Container,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  collection,
  addDoc,
} from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { IconInfoCircle } from '@tabler/icons-react';
import { usePublicCoachData } from '@/hooks/useCoachData';
import { Coach } from '@/types/firestore/coaches/coach';

interface ConfirmSessionFormProps {
  coachId: string | null;
  time: string | null;
}

const ConfirmSessionForm: React.FC<ConfirmSessionFormProps> = ({
                                                                 coachId,
                                                                 time,
                                                               }) => {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validate: {
      name: (value) => value.trim().length < 2,
      email: (value) => !/^\S+@\S+$/.test(value),
      subject: (value) => value.trim().length === 0,
    },
  });

  const [coachData, setCoachData] = useState<Coach | null>(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const icon = <IconInfoCircle />;

  const router = useRouter();

  if (!coachId || !time) {
    return <div>Loading..</div>;
  }

  // Fetch coach data
  const coachQuery = usePublicCoachData(coachId);

  // Update name when data is loaded successfully
  useEffect(() => {
    if (coachQuery.data) {
      setCoachData(coachQuery.data);
      setIsDataLoaded(true);
    }
  }, [coachQuery.data]);

  if (!isDataLoaded) {
    // TODO fix this loading spinner
    return <div>Loading...</div>;
  }

  const handleSubmit = async () => {
    // TODO sanitize input
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // TODO make the json object more dynamic
        body: JSON.stringify({
          coachName: coachData?.name,
          date: 'Wednesday, April 10',
          time,
          link: 'https://meet.google.com/abc-123-def',
          sessionDetails: 'This is a test session',
          price: 100,
        }),
      });

      if (response.ok) {
        console.log('Email sent successfully');
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
    <form onSubmit={(e) => {
      e.preventDefault();
      // Call the external handleSubmit function
      handleSubmit();
    }}
    >
      <Title
        order={2}
        size="h1"
        style={{ fontFamily: 'Greycliff CF, var(--mantine-font-family)' }}
        fw={900}
        ta="center"
      >
        Confirm Session
      </Title>
      <SimpleGrid cols={2}>
        <Card withBorder radius="md" style={{ width: 400 }}>
          <Title order={3} c="dimmed">
            Session Information
          </Title>
          <Title order={5}>Date:</Title>
          <Text size="xs">Wednesday, April 10</Text>
          <Text size="xs">{time}</Text>
          <Title order={5}>Coach:</Title>
          <Text size="xl">{coachData?.name}</Text>
          <Title order={5}>Email:</Title>
          <Text size="xl">{coachData?.email}</Text>
          <Title order={5}>Time:</Title>
          <Text size="xl">{time}</Text>
          <Title order={5}>Price:</Title>
          <Text size="xl" />
          <Alert variant="light" color="blue" icon={icon}>
            The Google Meet link will be generated after the coach confirms the session.
          </Alert>
        </Card>

        <Container style={{ width: 300 }}>
          <TextInput
            label="Name"
            placeholder="Your name"
            name="name"
            variant="filled"
            {...form.getInputProps('name')}
          />
          <TextInput
            label="Email"
            placeholder="Your email"
            name="email"
            variant="filled"
            {...form.getInputProps('email')}
          />

          <TextInput
            label="Phone Number"
            placeholder="+1 (999) 999 9999"
            mt="md"
            name="number"
            variant="filled"
            {...form.getInputProps('subject')}
          />
          <Textarea
            mt="md"
            label="Message"
            placeholder="Your message"
            maxRows={10}
            minRows={5}
            autosize
            name="message"
            variant="filled"
            {...form.getInputProps('message')}
          />

          <Group justify="center" mt="xl">
            <Button type="submit" size="md">
              Send message
            </Button>
          </Group>
        </Container>
      </SimpleGrid>
    </form>
  );
};

export default ConfirmSessionForm;
