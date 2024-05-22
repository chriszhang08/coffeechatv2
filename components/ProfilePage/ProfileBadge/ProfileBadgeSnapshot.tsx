'use client';

import { IconBookmark } from '@tabler/icons-react';
import { Card, Image, Text, Group, Badge, Button, ActionIcon, Rating } from '@mantine/core';
import Link from 'next/link';
import classes from './ProfileBadge.module.css';
import {Coach} from "@/types/firestore/coaches/coach";

export function ProfileBadgeSnapshot({
                                       person,
                                     }: {
  person: Coach | null;
}) {

  return (
    <Card p="md" className={classes.cardsnap}>
      <Card.Section>
        {/*<Image src={avatar} alt={name} height={180} />*/}
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group justify="apart">
          <Text fz="lg" fw={500}>
            {person?.name}
          </Text>
          <Rating fractions={2} value={person?.rating} readOnly />
          <Text fz="xs" c="dimmed">
            {person?.numSessions} reviews
          </Text>
        </Group>
        <Text fz="sm" mt="xs">
          {person?.bio}
        </Text>
      </Card.Section>

      <Card.Section className={classes.section}>
        {/*<Group gap={7} mt={5}>*/}
        {/*  {features}*/}
        {/*</Group>*/}
      </Card.Section>

      <Group mt="xs">
        {/*TODO change the coachId to be dynamic*/}
        <Link href="/profile?coachId=OeSeaw9yVEEFmMtqkxFZ" passHref style={{ flex: 1 }}>
          <Button radius="md">
            Book Session
          </Button>
        </Link>
        <ActionIcon variant="default" radius="md" size={36}>
          <IconBookmark className={classes.like} stroke={1.5} />
        </ActionIcon>
      </Group>
    </Card>
  );
}
