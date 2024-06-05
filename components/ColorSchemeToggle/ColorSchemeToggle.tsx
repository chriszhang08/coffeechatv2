'use client';

import { Button, Group, useMantineColorScheme } from '@mantine/core';

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();

  return (
    <Group>
      <Button onClick={() => setColorScheme('light')}>
        <img src='/sun.svg' alt='sun'/>
      </Button>
      <Button onClick={() => setColorScheme('dark')}>
        <img src='/moon.svg' alt='sun'/>
      </Button>
    </Group>
    // <Group justify="center" mt="xl">
    //   <Button onClick={() => setColorScheme('light')}>Light</Button>
    //   <Button onClick={() => setColorScheme('dark')}>Dark</Button>
    //   <Button onClick={() => setColorScheme('auto')}>Auto</Button>
    // </Group>
  );
}
