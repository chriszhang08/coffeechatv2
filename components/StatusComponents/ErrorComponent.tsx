import {Button, Center, Container, Text, Title} from "@mantine/core";
import Link from "next/link";
import React from "react";


export function ErrorComponent() {
  return (
    <Container>
      <Title order={1} style={{marginTop: '50px', textAlign: 'center'}}>
        Uh oh
      </Title>
      <Text size="lg" style={{margin: '20px 0', textAlign: 'center'}}>
        Something went wrong. Please try again later. If the problem persists, please email {' '}
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
  )
}
