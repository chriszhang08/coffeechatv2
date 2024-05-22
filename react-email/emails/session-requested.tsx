import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import {Tailwind} from "@react-email/tailwind";
import * as React from "react";
import {formatTimeStringLocal} from "../../utils/dateMethods";

interface SessionDetailsProps {
  menteeName?: string;
  menteeEmail?: string;
  menteePhone?: string;
  coachName?: string;
  sessionType?: string;
  date: Date,
  message?: string;
  price?: string;
  sessionId: string;
}

// const baseUrl = process.env.VERCEL_URL
//   ? `https://${process.env.VERCEL_URL}`
//   : "";
const baseUrl = "https://coffeechat-nine.vercel.app";

export const SessionRequestedEmail = ({
                                        menteeName,
                                        menteeEmail,
                                        menteePhone,
                                        coachName,
                                        sessionType,
                                        date,
                                        message,
                                        price,
                                        sessionId,
                                      }: SessionDetailsProps) => {
  const previewText = `${menteeName} has requested a ${sessionType} session with you.`;

  const confirmSessionUrl = `${baseUrl}/confirmsession?sessionId=${sessionId}`;

  return (
    <Html>
      <Head/>
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              <strong>{menteeName}</strong> has requested a <strong>{sessionType}</strong> session with you
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello {coachName},
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              <strong>{menteeName}</strong> (
              <Link
                href={`mailto:${menteeEmail}`}
                className="text-blue-600 no-underline"
              >
                {menteeEmail}
              </Link>
              ) has requested a <strong>{sessionType}</strong> session with you.
            </Text>
            <Section className="my-[20px] mx-0 p-0">
              <Heading className="text-black text-[18px] font-semibold text-center p-0 my-[10px] mx-0">
                Session Details
              </Heading>
              <Text>
                <strong>Session ID:</strong> {sessionId}
              </Text>
              <Text>
                <strong>Date:</strong> {date?.toUTCString()}
              </Text>
              <Text>
                <strong>Time:</strong> {formatTimeStringLocal(date)}
              </Text>
              <Text>
                <strong>Type:</strong> {sessionType}
              </Text>
              {price && (
                <Text>
                  <strong>Price:</strong> {price}
                </Text>
              )}
              <Text>
                <strong>Message:</strong> {message}
              </Text>
            </Section>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
              >
                <Link href={confirmSessionUrl}>
                  Clicking this button will confirm your session
                </Link>
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

SessionRequestedEmail.PreviewProps = {
  menteeName: 'Chris Zhang',
  menteeEmail: 'czhang2003@gmail.com',
  menteePhone: '(123) 456-7890',
  coachName: 'Leo Lindemberg',
  sessionType: 'Mock Interview',
  date: new Date(),
  message: 'I am currently coding this react email message. I hope it works.',
  price: '$50.00',
  sessionId: 'KNc8cPDQijcAmamV9E6n',
} as SessionDetailsProps;

export default SessionRequestedEmail;
