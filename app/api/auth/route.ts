import type { NextApiRequest, NextApiResponse } from "next"
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod"
import {redirect} from "next/navigation";
import {google} from "googleapis";
import {loadCachedSessionData} from "@/utils/cacheMethods/sessionCache";

interface SessionObjectProps {
  coachId: string;
  coachName: string;
  coachEmail: string;
  menteeName: string;
  menteeEmail: string;
  link: string;
  message: string;
  date: string;
  sessionDetails: string;
  price: string;
  duration: string; // Ensure that the duration is a valid integer in string form
  accessToken: string;
}

async function createCalendarAppointment(sessionObj : SessionObjectProps) {
  const event = {
        'summary': `MentorMeets | 1-on-1 Session with ${sessionObj.menteeName} & ${sessionObj.coachName}`,
        'location': sessionObj.link,
        'description': sessionObj.message,
        'start': {
            'dateTime': sessionObj.date,
        },
        'end': {
            'dateTime': '2024-05-28T17:00:00-07:00',
        },
        'attendees': [
            {'email': sessionObj.coachEmail},
            {'email': sessionObj.menteeEmail},
        ],
        'reminders': {
            'useDefault': false,
            'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 10},
            ],
        },
    }


  const apiUrl = new URL(
    "https://www.googleapis.com/calendar/v3/calendars/primary/events"
  )

  apiUrl.searchParams.set("sendNotifications", "true")
  apiUrl.searchParams.set("conferenceDataVersion", "1")

  const response = await fetch(apiUrl, {
    cache: "no-cache",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionObj.accessToken}`,
    },
    body: JSON.stringify(event),
  })
  console.log(response);
  return response;
}


export async function POST(req : Request) {
  console.log("API CALL POST")
  try {
    const accessToken = await req.json();

    await createCalendarAppointment(accessToken);

    return Response.json({data: 'Email sent'});
  } catch (error) {
    console.log(error)
    return Response.error();
  }
}