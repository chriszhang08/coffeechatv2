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

function getEndTime(date: string, sessionDetails: string) : string {
  const dateObj = new Date(date);
  let duration;
  if (sessionDetails === 'resume') {
    duration = 30;
  } else if (sessionDetails === 'interview') {
    duration = 45;
  } else {
    duration = 60;
  }
  dateObj.setMinutes(dateObj.getMinutes() + duration);
  return dateObj.toISOString();
}

async function createCalendarAppointment(sessionObj: SessionObjectProps) {
  const event = {
    'summary': `MentorMeets | 1-on-1 Session with ${sessionObj.menteeName} & ${sessionObj.coachName}`,
    'location': sessionObj.link,
    'description': sessionObj.message,
    'start': {
      'dateTime': sessionObj.date,
    },
    'end': {
      'dateTime': getEndTime(sessionObj.date, sessionObj.sessionDetails),
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

  return await fetch(apiUrl, {
    cache: "no-cache",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionObj.accessToken}`,
    },
    body: JSON.stringify(event),
  })
}


export async function POST(req: Request) {
  const accessToken = await req.json();

  const response = await createCalendarAppointment(accessToken);

  if (response.ok) {
    return Response.json({status: "success"});
  } else {
    return Response.json({status: "error"}, {status: response.status, statusText: response.statusText})
  }
}
