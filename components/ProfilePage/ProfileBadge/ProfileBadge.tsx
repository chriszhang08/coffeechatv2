'use client';

import {IconBookmark} from '@tabler/icons-react';
import {ActionIcon, Badge, Box, Button, Card, Group, Image, List, Text, Tooltip} from '@mantine/core';
import React, {useEffect, useState} from 'react';
import classes from './ProfileBadge.module.css';
import {Coach} from '@/types/firestore/coaches/coach';
import {getResumeFromStorage} from "@/utils/coachMethods";
import Link from 'next/link';

const mockdata = {
  image:
    'https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
  title: 'Chris Zhang',
  status: 'Expert Coach',
  description:
    'Former Oracle, Google, Meta | Incoming at CCI.  Energy Trading, Quantitative Analyst, Data Science.  Recipient of Presidential Scholar Award',
  badges: [
    {
      emoji: '☀️',
      label: 'Astrology',
    },
    {
      emoji: '🦓',
      label: 'Zoology',
    },
    {
      emoji: '🤽',
      label: 'Physics',
    },
  ],
};

interface ProfileBadgeProps {
  coachObj: Coach | null;
  selectedButtonState: string | null;
  onClickHandler: (value: string) => void;
}

function ResumeButton({coachId}: { coachId: string }) {
  const [link, setLink] = useState<string | null>(null);

  useEffect(() => {
    const generateLinkAsync = async () => {
      const generatedLink = await getResumeFromStorage(coachId);
      setLink(generatedLink);
    };

    generateLinkAsync();
  }, []);

  return (
    <Box style={{width: '100%'}}>
      {
        link ? (
          <a href={link} target="_blank" rel="noopener noreferrer">
            <Button radius="md" style={{flex: 1, width: '100%'}} component="a">
              See Resume
            </Button>
          </a>
        ) : (
          <Tooltip label={'Resume not available'} position="top">
            <Button radius="md" style={{flex: 1, width: '100%'}} disabled={true} component="a">
              See Resume
            </Button>
          </Tooltip>
        )
      }
    </Box>
  )
}

const ProfileBadge: React.FC<ProfileBadgeProps> =
  ({
     coachObj,
     selectedButtonState,
     onClickHandler,
   }) => {
    if (!coachObj) {
      return null;
    }

    const {
      image,
    } = mockdata;

    const subjectTags = coachObj.subjects.map((subject, index) => (
      <Badge variant="light" key={index}>
        {subject}
      </Badge>
    ));

    return (
      <Card p="md" className={classes.card}>
        <Card.Section>
          <Image src={image} height={180}/>
        </Card.Section>

        <Card.Section className={classes.section} mt="md">
          <Group justify="apart">
            <Text fz="lg" fw={500}>
              {coachObj.name}
            </Text>
            <Tooltip label="50+ sessions coached" position="top">
              <Badge size="sm" variant="light">
                Expert Coach
              </Badge>
            </Tooltip>
          </Group>
          <Text fz="sm" mt="xs">
            {coachObj.bio}
          </Text>
          <Group gap={7} mt={5}>
            {subjectTags}
          </Group>
        </Card.Section>

        <Card.Section className={classes.section}>
          <Text mt="md" className={classes.label} c="dimmed">
            Sessions Offered
          </Text>
          <Group gap={7} mt={5}>
            <Tooltip label="15 minute session where we review your resume" position="top">
              <Button
                variant={selectedButtonState === 'resume' ? 'filled' : 'light'}
                onClick={() => onClickHandler('resume')}
              >
                Resume Review | $30
              </Button>
            </Tooltip>
            <Tooltip label="45 minute mock interview and feedback" position="top">
              <Button
                variant={selectedButtonState === 'interview' ? 'filled' : 'light'}
                onClick={() => onClickHandler('interview')}
              >
                Mock Interview | $50
              </Button>
            </Tooltip>
          </Group>

        </Card.Section>

        <Card.Section className={classes.section}>
          <Text mt="md" className={classes.label} c="dimmed">
            Materials
          </Text>
          <List>
            <List.Item>AI Resume Parser</List.Item>
            <List.Item>FantasyFootballAnalyst</List.Item>
            <List.Item>Google 2024 Interview Questions</List.Item>
            <List.Item>McKinsey Practice Cases</List.Item>
          </List>
        </Card.Section>
        <Group mt="xs">
          <ResumeButton coachId={coachObj.cidAuth}/>
        </Group>
      </Card>
    );
  };

export default ProfileBadge;
