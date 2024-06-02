'use client';

import React, { useState } from 'react';
import { Grid, Select, Table, TagsInput } from '@mantine/core';
import fakePeople from '@/data/mock-data/fakePeople';
import { ProfileBadgeSnapshot } from '@/components/ProfilePage/ProfileBadge/ProfileBadgeSnapshot';
import { useGetFiveCoaches } from '@/hooks/useCoachData';

export function CoachesUserStack() {
  const [sortBy, setSortBy] = useState('default');
  const [tagsShown, setTagsShow] = useState<string[]>([]);
  const filterTabs = [
    'Junior',
    'Consulting',
    'LGBTQ',
    'Latinx',
    'Business',
    'Available Weekly',
    'Available Today',
    'New York',
  ];

  //Add or remove tag from list of tags to filter by
  const toggleTag = (tags: string[]) => {
    setTagsShow(tags);
  };

  const coaches = useGetFiveCoaches();

  const filteredCoaches = 
      !coaches 
        ? [] 
        : (tagsShown.length === 0 
            ? coaches 
            : coaches.filter((person) => 
                tagsShown.every((tag) => person.subjects.includes(tag))
            )
          );
 
  const sortedPeople = [...filteredCoaches]; // Make a copy of the array to avoid mutating the original
  // Function to sort the people array based on different criteria
  const sortPeople = (sortByCriteria: string) => {
    if (sortByCriteria === 'default') {
      // Default sorting logic (if needed)

    } else if (sortByCriteria === 'name') {
      sortedPeople.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortByCriteria === 'age') {
      sortedPeople.sort((a, b) => a.rating - b.rating);
    }
  };

  // Call the sorting function when sortBy changes
  sortPeople(sortBy);

  const rows = sortedPeople.map((person) => (
    <Grid.Col span={4} key={person.cidAuth}>
      <ProfileBadgeSnapshot person={person} />
    </Grid.Col>
  ));

  const options = [
    {
      label: 'Default Sort',
      value: 'default',
    },
    {
      label: 'Sort by Name',
      value: 'name',
    },
    {
      label: 'Sort by Age',
      value: 'age',
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <TagsInput
          label="Press Enter to submit a tag"
          description="Add up to 3 tags"
          placeholder="Enter tag"
          maxTags={3}
          limit={5}
          data={filterTabs}
          onChange={toggleTag}
          style={{ width: 400 }}
        />
        <Select
          label="Filter"
          data={options}
          value={sortBy}
          onChange={(value) => setSortBy(value as string)}
          style={{ width: 200 }}
        />
      </div>
      <Table.ScrollContainer minWidth={800}>
        <Grid style={{ paddingTop: 20 }}>
          {rows}
        </Grid>
      </Table.ScrollContainer>
    </div>
  );
}

export default CoachesUserStack;
