import { Resend } from 'resend';
import ConfirmSeshEmail from '@/react-email/emails/confirmed-session';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const res = await req.json();

    const emailContent = ConfirmSeshEmail(res);

    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'czhang2003@gmail.com',
      subject: 'Hello world',
      react: emailContent,
      text: 'Hello world',
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
