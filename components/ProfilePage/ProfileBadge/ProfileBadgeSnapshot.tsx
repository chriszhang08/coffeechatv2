'use client';

import { IconBookmark } from '@tabler/icons-react';
import { Card, Image, Text, Group, Badge, Button, ActionIcon, Rating } from '@mantine/core';
import Link from 'next/link';
import classes from './ProfileBadge.module.css';

export function ProfileBadgeSnapshot({
                                       person,
                                     }: {
  person: {
    avatar: string,
    name: string,
    description: string,
    email: string,
    rate: number,
    rating: number,
    tags: string[],
    numReviews: number,
    location: string,
  };
}) {
  const { avatar, name, description, rating, tags, numReviews } = person;
  const features = tags.map((tag) => (
    <Badge variant="light" key={tag}>
      {tag}
    </Badge>
  ));

  return (
    <Card p="md" className={classes.cardsnap}>
      <Card.Section>
        <Image src={avatar} alt={name} height={180} />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group justify="apart">
          <Text fz="lg" fw={500}>
            {name}
          </Text>
          <Rating fractions={2} value={rating} readOnly />
          <Text fz="xs" c="dimmed">
            {numReviews} reviews
          </Text>
        </Group>
        <Text fz="sm" mt="xs">
          {description}
        </Text>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Group gap={7} mt={5}>
          {features}
        </Group>
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
