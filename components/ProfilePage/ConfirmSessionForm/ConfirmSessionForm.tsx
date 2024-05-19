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
import {useForm} from '@mantine/form';
import {
  collection,
  addDoc,
} from 'firebase/firestore';
import {useRouter} from 'next/navigation';
import React, {useEffect, useState} from 'react';
import {IconInfoCircle} from '@tabler/icons-react';
import {usePublicCoachData} from '@/hooks/useCoachData';
import {Coach} from '@/types/firestore/coaches/coach';

interface ConfirmSessionFormProps {
  coachId: string | null;
  time: string | null;
  type: string | null;
}

function isoStringToDate(isoString: string | null): Date {
  if (isoString === null) {
    return new Date();
  }
  return new Date(isoString);
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

const ConfirmSessionForm: React.FC<ConfirmSessionFormProps> = ({
                                                                 coachId,
                                                                 time,
                                                                 type
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
        // TODO make the json object more dynamic
        body: JSON.stringify({
          coachName: coach?.name,
          date: date.toISOString(),
          time: date.toLocaleTimeString(),
          link: 'https://meet.google.com/abc-123-def',
          sessionDetails: `This is a ${type} session`,
          price: getPrice(type, coach),
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
          {/*TODO change the time to add the time zone and make it more readable*/}
          <Text size="lg">{date.toLocaleTimeString()}</Text>
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
            The Google Meet link will be generated after the coach confirms the session.
          </Alert>
        </Card>

        <Container style={{width: 300}}>
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
