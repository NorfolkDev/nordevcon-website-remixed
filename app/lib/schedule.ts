import type { SerializeFrom } from "@remix-run/server-runtime";
import type { Schedule, Session, Talk } from "./schedule.server";

export const deserializeSchedule = (data: SerializeFrom<Schedule>): Schedule =>
  data.map((day) => ({
    ...day,
    datetime: new Date(day.datetime),
    sessions: day.sessions.map((session) => ({
      ...session,
      datetime: new Date(session.datetime),
    })),
  }));

export const getSessionById = (schedule: Schedule, id: string) => {
  return schedule
    .reduce(
      (sessions: Array<Session>, day) => [...day.sessions, ...sessions],
      []
    )
    .reduce((talks: Array<Talk>, sessions) => [...sessions.talks, ...talks], [])
    .find((talk) => talk.id.toString() === id);
};
