import { Resend } from 'resend';
import ConfirmSeshEmail from '@/react-email/emails/confirmed-session';
import { authorize, listEvents } from '../../../index';

// const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const sessionObj = await req.json();
    const auth = await authorize();
    await listEvents(auth, sessionObj);

    // const date = isoStringToDate(res.date);
    //
    // if (!res || !res.date) {
    //   return Response.json({ error: 'No data provided' });
    // }

    // const emailContent = ConfirmSeshEmail({...res, date: new Date()});
    //
    // const data = await resend.emails.send({
    //   from: 'onboarding@resend.dev',
    //   to: 'czhang2003@gmail.com',
    //   subject: 'Hello world',
    //   react: emailContent,
    //   text: 'Hello world',
    // });

    return Response.json({ data: 'Email sent' });
  } catch (error) {
    return Response.json({ error });
  }
}
