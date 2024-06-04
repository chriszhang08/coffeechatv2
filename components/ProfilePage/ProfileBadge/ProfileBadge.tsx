'use client';

import { Badge, Box, Button, Card, Group, Image, List, Text, Tooltip} from '@mantine/core';
import React, {useEffect, useState} from 'react';
import classes from './ProfileBadge.module.css';
import {Coach} from '@/types/firestore/coaches/coach';
import {getResumeFromStorage} from "@/utils/coachMethods";
import { useGetImageUrl } from '@/hooks/useCoachData';


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

    const imgPath = `${coachObj.cidAuth}_avatar.jpg`;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const imageUrl = useGetImageUrl(imgPath);

    const subjectTags = coachObj.subjects.map((subject, index) => (
      <Badge variant="light" key={index}>
        {subject}
      </Badge>
    ));

    return (
      <Card p="md" className={classes.card}>
        <Card.Section>
          <Image src={imageUrl} height={180}/>
        </Card.Section>

        <Card.Section className={classes.section} mt="md">
          <Group justify="apart">
            <Text fz="lg" fw={500}>
              {coachObj.name}
            </Text>
            <Tooltip label="50+ sessions coached" position="top">
              <Badge size="sm" variant="light">
                Expert Mentor
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
          {/* <Group gap={7} mt={5}>
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
          </Group> */}
          <Group mt={5}>
            <Tooltip label="1:1 Coaching session with the mentor" position="top">
              <Button
                variant={selectedButtonState === 'resume' ? 'filled' : 'light'}
                onClick={() => onClickHandler('resume')}
              >
                1:1 Mentorship | Free
              </Button>
            </Tooltip>
          </Group>

        </Card.Section>

        <Card.Section className={classes.section}>
          <Text mt="md" className={classes.label} c="dimmed">
            Expertise
          </Text>
          <List>
            {/*TODO - Add expertise from firestore*/}
          </List>
        </Card.Section>
        <Group mt="xs">
          <ResumeButton coachId={coachObj.cidAuth}/>
        </Group>
      </Card>
    );
  };

export default ProfileBadge;
