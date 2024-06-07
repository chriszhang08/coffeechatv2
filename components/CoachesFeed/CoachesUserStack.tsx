'use client';

import React, {useState} from 'react';
import {Center, Flex, SimpleGrid, Table} from '@mantine/core';
import fakePeople from '@/data/mock-data/fakePeople';
import {ProfileBadgeSnapshot} from '@/components/ProfilePage/ProfileBadge/ProfileBadgeSnapshot';
import {useGetCoaches} from '@/hooks/useCoachData';

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

  const coaches = useGetCoaches();

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
    <ProfileBadgeSnapshot person={person} key={person.cidAuth}/>
  ));

  return (
    <Center>
      <SimpleGrid cols={3} style={{paddingTop: 20}} spacing={"xl"}>
        {/* <Flex style={{paddingTop: 20}} justify={"space-around"}> */}
          {rows}
        {/* </Flex> */}
      </SimpleGrid>
    </Center>
  );
}

export default CoachesUserStack;
