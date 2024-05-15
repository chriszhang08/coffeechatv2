// Create a simple page that displays a success message
//
// Path: app/success/page.tsx

import { Title } from '@mantine/core';

export default function SuccessPage() {
  return (
    <div>
      <Title order={2} size="h1">
        Success!
      </Title>
    </div>
  );
}
