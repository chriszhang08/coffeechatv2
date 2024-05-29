// app/success/page.tsx

import React from 'react';
import {Button, Title, Text, Container, Group, Center} from '@mantine/core';
import Link from "next/link";
import {HeaderSearch} from "@/components/Navbar/Header";

export default function SuccessPage() {

  return (
    <div>
      <HeaderSearch />
      <Container>
        <Title order={1} style={{marginTop: '50px', textAlign: 'center'}}>
          Success!
        </Title>
        <Text size="lg" style={{margin: '20px 0', textAlign: 'center'}}>
          Your request has been successfully processed. Please check your email for further
          instructions. If you don&apos;t receive an email, remember to check your spam folder.
          If it&apos;s not there, please email {' '}
          <Link href='mailto:czhang2003@gmail.com'>czhang2003@gmail.com</Link>.
        </Text>
        <Center>
          <Link href="/">
            <Button variant="filled">
              Go to Home Page
            </Button>
          </Link>
        </Center>
      </Container>
    </div>
  );
}
