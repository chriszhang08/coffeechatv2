import {
  Avatar,
  Group,
  Rating,
  rem,
  Table,
  Text,
  Badge, Button, Collapse,
} from '@mantine/core';
import {
  IconMessages,
  IconLocation,
} from '@tabler/icons-react';
import { useState } from 'react';

function CoachProfileCard({
                            person,
                          }: {
  person: {
    avatar: string,
    name: string,
    job: string,
    email: string,
    rate: number,
    rating: number,
    numReviews: number,
    location: string,
  };
}) {
  const icon = <IconLocation style={{
    width: rem(12),
    height: rem(12),
  }}
  />;

  const [expanded, setExpanded] = useState(false);

  //
  return (
    <>
      <Table.Tr key={person.name} onClick={() => setExpanded(!expanded)} style={{ cursor: 'pointer' }}>
        <Table.Td>
          <Group gap="sm">
            <Avatar size={40} src={person.avatar} radius={40} />
            <div>
              <Text fz="sm" fw={500}>
                {person.name}
              </Text>
              <Text c="dimmed" fz="xs">
                {person.job}
              </Text>
            </div>
          </Group>
        </Table.Td>
        <Table.Td>
          <Rating fractions={2} value={person.rating} readOnly />
          <Text fz="xs" c="dimmed">
            {person.numReviews} reviews
          </Text>
        </Table.Td>
        <Table.Td>
          <Badge leftSection={icon}>{person.location}</Badge>
        </Table.Td>
        <Table.Td>
          <Group gap={0} justify="flex-end">
            {/*TODO Edit profile screen should be implemented*/}
            {/*<ActionIcon variant="subtle" color="gray">*/}
            {/*  <IconPencil*/}
            {/*    style={{*/}
            {/*      width: rem(16),*/}
            {/*      height: rem(16),*/}
            {/*    }}*/}
            {/*    stroke={1.5}*/}
            {/*  />*/}
            {/*</ActionIcon>*/}
            <Button
              leftSection={
                <IconMessages
                  style={{
                    width: rem(16),
                    height: rem(16),
                  }}
                  stroke={1.5}
                />
              }
            >
              Send message
            </Button>
          </Group>
        </Table.Td>
      </Table.Tr>
      <Collapse in={expanded}>
        Availability: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday
      </Collapse>
    </>
  );
}

export default CoachProfileCard;
