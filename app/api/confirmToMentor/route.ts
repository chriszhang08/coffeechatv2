import { Resend } from 'resend';
import SessionRequestedEmail from "@/react-email/emails/session-requested";
import {isoStringToDate} from "@/utils/dateMethods";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const res = await req.json();

    const date = isoStringToDate(res.date);

    const emailContent = SessionRequestedEmail({...res, date});

    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'czhang2003@gmail.com',
      subject: 'Hello world',
      react: emailContent,
      text: 'Hello world',
    });
    console.log("GREAT SUCCESS")
    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
