'use client'

import {
  Alert,
  Button,
  Card,
  Container,
  Group,
  Loader,
  SimpleGrid,
  Text,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import {useForm} from '@mantine/form';
import {useRouter} from 'next/navigation';
import React, {useEffect, useState} from 'react';
import {IconInfoCircle} from '@tabler/icons-react';
import {usePublicCoachData} from '@/hooks/useCoachData';
import {Coach} from '@/types/firestore/coaches/coach';
import {formatTimeStringLocal, isoStringToDate} from "@/utils/dateMethods";
import {createSession} from "@/utils/sessionMethods";
import {oauthSignIn} from "@/utils/oauth";
import {cacheSessionData} from "@/utils/cacheMethods/sessionCache";

interface ConfirmSessionFormProps {
  coachId: string | null;
  time: string | null;
  type: string | null;
}

function getPrice(type: string | null, coach: Coach | null) {
  return "Free";
  // if (type === null) {
  //   return '0';
  // } else if (type === 'interview') {
  //   return '$50';
  // } else {
  //   return '$30'
  // }
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
      phone: '',
      message: '',
    },
    validate: {
      name: (value) => value.trim().length < 2,
      email: (value) => !/^\S+@\S+$/.test(value),
      phone: (value) => value.trim().length === 0,
    },
  });

  const [coach, setCoach] = useState<Coach | null>(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoadingGcal, setIsLoadingGcal] = useState(false);

  const icon = <IconInfoCircle/>;

  const coachData = usePublicCoachData(coachId);
  useEffect(() => {

    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth <= 768);
      }
    };
    if (typeof window !== 'undefined') {
      handleResize();
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

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
    setIsLoadingGcal(true);
    let sessionData = {
      coachId: coachId,
      coachName: coach?.name,
      coachEmail: coach?.email,
      menteeName: form.values.name,
      menteeEmail: form.values.email,
      menteePhone: form.values.phone,
      message: form.values.message,
      date: date,
      link: coach?.link,
      sessionDetails: type,
      price: getPrice(type, coach),
    };

    try {
      cacheSessionData(sessionData, coachData?.availability);
      oauthSignIn();
      const sessionId = await createSession(sessionData);
    } catch (e) {
      console.log('Error adding document: ', e);
    } finally {
      setIsLoadingGcal(false);
    }
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      // Call the external handleSubmit function
      handleSubmit();
    }}
    >
      <SimpleGrid cols={isMobile ? 1 : 2} style={{paddingTop: 50}}>
        <Card withBorder radius="md" style={{width: 400}}>
          <Title order={2}>
            Session Information
          </Title>
          <Title order={5}>Date:</Title>
          <Text size="lg">{date.toDateString()}</Text>
          <Title order={5}>Time:</Title>
          <Text size="lg">{formatTimeStringLocal(date)}</Text>
          <Title order={5}>Mentor:</Title>
          <Text size="lg">{coach?.name}</Text>
          <Title order={5}>Session Type:</Title>
          <Text size="lg">1:1 Mentorship</Text>
          <Title order={5}>Price:</Title>
          <Text size="lg">
            {getPrice(type, coach)}
          </Text>
          <Title order={5}>Meeting Link:</Title>
          <a href={coach?.link}>{coach?.link}</a>
          {/*<Alert variant="light" color="blue" icon={icon}>*/}
          {/*  The Google Meet link will be generated after the coach confirms the session.*/}
          {/*</Alert>*/}
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
            {...form.getInputProps('phone')}
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
            <Button type="submit" size="md" disabled={isLoadingGcal}>
              {isLoadingGcal ? (
                // Render the spinner instead of 'Send message'
                <Loader size="sm"/>
              ) : (
                'Confirm Session'
              )}
            </Button>
          </Group>
        </Container>
      </SimpleGrid>
    </form>
  );
};

export default ConfirmSessionForm;
