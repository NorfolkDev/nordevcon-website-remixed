import type { SerializeFrom } from "@remix-run/server-runtime";
import type { ScheduleData } from "./schedule.server";

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

export const getSessionById = (schedule: ScheduleData, id: string) => {
  console.log(schedule);

  return schedule
    .reduce((sessions, day) => [...day.sessions, ...sessions], [])
    .reduce((talks, sessions) => [...sessions.talks, ...talks], [])
    .find(talk => talk.id.toString() === id);

}