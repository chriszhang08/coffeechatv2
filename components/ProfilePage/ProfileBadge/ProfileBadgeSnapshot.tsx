'use client';

import { IconBookmark } from '@tabler/icons-react';
import { Card, Image, Text, Group, Badge, Button, ActionIcon, Rating, Paper } from '@mantine/core';
import Link from 'next/link';
import classes from './ProfileBadge.module.css';
import {Coach} from "@/types/firestore/coaches/coach";
import { useGetImageUrl } from '@/hooks/useCoachData';

export function ProfileBadgeSnapshot({
                                       person,
                                     }: {
  person: Partial<Coach>;
}) {

  const imgPath = `${person.cidAuth}_avatar.png`;
  console.log(imgPath)
  const imageUrl = useGetImageUrl(imgPath);
  return (
    <Card p="md" className={classes.cardsnap}>
      <Card.Section>
        {imageUrl ? (
          <Image src={imageUrl} alt={person.name} height={180} />
        ) : (
          <p>Loading image...</p>
        )}
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group justify="apart">
          <Text fz="lg" fw={500}>
            {person?.name}
          </Text>
          <Rating fractions={2} value={person?.rating} readOnly />
          {/* <Text fz="xs" c="dimmed">
            {person?.numSessions} reviews
          </Text> */}
        </Group>
        <Text fz="sm" mt="xs">
          {person?.bio}
        </Text>
      </Card.Section>

      {/* <Card.Section className={classes.section}>
        <Group gap={7} mt={5}>
          {person.subjects && person.subjects.length > 0 && (
            person.subjects.map((subject, index) => (
              <Paper shadow="sm" p="m" key={index}>
                <Text>{subject}</Text>
              </Paper>
            ))
          )}
        </Group>
      </Card.Section> */}

      <Group mt="xs">
        <Link href={`/profile?coachId=${person.cidAuth}`} passHref style={{ flex: 1 }}>
          <Button radius="md">
            Book Session
          </Button>
        </Link>
        {/* <ActionIcon variant="default" radius="md" size={36}>
          <IconBookmark className={classes.like} stroke={1.5} />
        </ActionIcon> */}
      </Group>
    </Card>
  );
}
