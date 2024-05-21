import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';
import {formatTimeStringLocal} from "../../utils/dateMethods";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const box = {
  padding: '0 48px',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const paragraph = {
  color: '#525f7f',

  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left' as const,
};

const anchor = {
  color: '#556cd6',
};

const button = {
  backgroundColor: '#656ee8',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '100%',
  padding: '10px',
};

const label = {
  color: '#555',
  display: 'inline-block',
  fontSize: '16px',
  fontWeight: 500,
  marginRight: '5px',
};

const value = {
  color: '#333',
  display: 'inline-block',
  fontSize: '16px',
  fontWeight: 400,
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
};

interface SessionDetailProps {
  coachName?: string;
  date: Date;
  link?: string;
  sessionDetails?: string;
  price?: number;
}

export const ConfirmSeshEmail = ({
                                     coachName,
                                     date,
                                     link,
                                     sessionDetails,
                                     price,
                                   }: SessionDetailProps) => (
  <Html>
    <Head />
    <Preview>You&apos;re now ready to make live transactions with Stripe!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Img
            src={`${baseUrl}/static/stripe-logo.png`}
            width="49"
            height="21"
            alt="Stripe"
          />
          <Hr style={hr} />
          <Text style={paragraph}>
            Your coaching session has been confirmed! See details below.
          </Text>
          <Section>
            <Text style={label}>Coach:</Text>
            <Text style={value}>{coachName}</Text>
          </Section>
          <Section>
            <Text style={label}>Date:</Text>
            <Text style={value}>{date.toDateString()}</Text>
          </Section>
          <Text style={label}>Time:</Text>
          <Text style={value}>{formatTimeStringLocal(date)}</Text>
          <Section />
          <Section>
            <Text style={label}>Location:</Text>
            <Text style={value}>{link}</Text>
          </Section>
          <Section>
            <Text style={label}>Session Details:</Text>
            <Text style={value}>{sessionDetails}</Text>
          </Section>
          <Section>
            <Text style={label}>Price:</Text>
            <Text style={value}>${price}</Text>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>
            WaterTalks, 415 Church St, Ann Arbor, MI 48104
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default ConfirmSeshEmail;
