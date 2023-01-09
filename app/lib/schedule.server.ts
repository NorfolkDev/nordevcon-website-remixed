import { compareAsc, format } from "date-fns";
import type { ScheduleAirtableRecord } from "./airtable.server";
import { TRACKS } from "./constants";

/* @TODO: Here be dragons, refactor!! */

export type Schedule = Array<{
  datetime: Date;
  sessions: Session[];
}>;

export type Session = {
  datetime: Date;
  talks: Talk[];
};

export type Talk = {
  id: string;
  Track: string;
  Title: string;
  Description: string;
  TopicNames: string[];
  Speakers: Speaker[];
  Live: boolean;
  Cancelled: boolean;
  Start: string;
};

export type Speaker = {
  Name: string;
  Website: string;
  LinkedIn: string;
  Twitter: string;
  AvatarUrl: string;
};

/**
 * Parses the airtable schedule into a usable format
 * - groups talks by the Start field to form the tracks
 *   - adds Start field as a datetime prop within each group
 * - groups talks by Day
 *   - adds Start field as a datetime prop within each group
 * - reduces Object to an array
 * - sorts the array by the datetime
 *
 */
export function parseSchedule(
  data: ScheduleAirtableRecord[],
  filter: string[]
): Schedule {
  // Convert ScheduleAirtableRecord[] to Talk[]
  let sessions = data.map(
    ({ fields }: ScheduleAirtableRecord) =>
      ({
        ...fields,
        id: fields.id.toString(),
        Speakers: fields.Speakers.map((_, index) => ({
          Name: fields.SpeakerNames[index],
          Website: fields.Website[index],
          LinkedIn: fields.LinkedIn[index],
          Twitter: fields.Twitter[index],
          AvatarUrl: fields.AvatarUrl[index],
        })),
        Start: fields.Start,
      } as Talk)
  );

  //
  let filtered = filterSchedule(sessions, filter);
  let days = groupSchedule(filtered);
  let flatten = flattenSchedule(days);
  let sorted = sortSchedule(flatten);

  return sorted.map((day) => {
    // Fix the datetime on each day, to the first session
    day.datetime = day.sessions[0].datetime;

    return day;
  });
}

/**
 * Provides the schedule having been filtered by record ids
 */
function filterSchedule(data: Talk[], filter: string[]): Talk[] {
  if (filter.length === 0) return data;

  return data.filter((talk) => talk.Live && filter.includes(talk.id));
}

/**
 * Groups the schedule into day, time & sessions
 */
type GroupedSchedule = Record<
  string,
  {
    datetime: Date;
    sessions: Record<string, Session>;
  }
>;

function groupSchedule(schedule: Talk[]): GroupedSchedule {
  return schedule.reduce((days, talk) => {
    let datetime = new Date(talk.Start);
    let date = format(datetime, "do LLLL");
    let time = format(datetime, "HH:mm");

    // Create Day wrapper
    if (days[date] === undefined) {
      days[date] = {
        datetime,
        sessions: {},
      };
    }

    // Create Talks Wrapper
    if (days[date].sessions[time] === undefined) {
      days[date].sessions[time] = {
        datetime,
        talks: [],
      };
    }

    days[date].sessions[time].talks.push(talk);

    return days;
  }, {} as GroupedSchedule);
}

/**
 * Takes the key'd day/time objects, and reduces to just arrays of objects
 */
function flattenSchedule(days: GroupedSchedule): Schedule {
  return Object.keys(days).map((key) => {
    let day = days[key];

    let sessions = Object.keys(day.sessions).map(
      (session) => day.sessions[session]
    );

    return {
      datetime: day.datetime,
      sessions,
    };
  });
}

/**
 * Takes the arrays and sorts at every depth
 */
function sortSchedule(days: Schedule): Schedule {
  const trackKeys = Object.keys(TRACKS);
  return (
    days
      .map(({ datetime, sessions }) => ({
        datetime,
        sessions: sessions
          .map(({ datetime, talks }) => ({
            datetime,
            // Sort Talks by Track
            talks: talks
              .slice()
              .sort(
                (a, b) =>
                  trackKeys.findIndex((name) => name === a.Track) -
                  trackKeys.findIndex((name) => name === b.Track)
              ),
          }))
          // Sort Sessions by datetime
          .sort((a, b) => compareAsc(a.datetime, b.datetime)),
      }))
      // Sort Days by datetime
      .sort((a, b) => compareAsc(a.datetime, b.datetime))
  );
}
