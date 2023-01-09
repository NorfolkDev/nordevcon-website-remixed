import type { SerializeFrom } from "@remix-run/server-runtime";
import type { ScheduleData, Session, Talk } from "./schedule.server";

export const deserializeSchedule = (
  data: SerializeFrom<ScheduleData>
): ScheduleData =>
  data.map((day) => ({
    ...day,
    datetime: new Date(day.datetime),
    sessions: day.sessions.map((session) => ({
      ...session,
      datetime: new Date(session.datetime),
    })),
  }));

export const getSessionById = (schedule: ScheduleData, id: Talk["id"]) =>
  schedule
    .flatMap((day) => day.sessions.flatMap((session) => session.talks))
    .find((talk) => talk.id === id);
