import { compareAsc, format } from "date-fns";
import type { ScheduleRecord } from "./airtable.server";

export const Tracks = {
  "Main Auditorium (Track 1)": {
    background: "#c53030",
    border: "#c53030",
  },
  "Conference Room 1 (Track 2)": {
    background: "#4299e1",
    border: "#4299e1",
  },
  "Conference Room 2 (Track 3)": {
    background: "#68d391",
    border: "#68d391",
  },

  "Training Room 1 (Track 4)": {
    background: "#FBBF24",
    border: "#FBBF24",
  },
};

/* @TODO: Here be dragons, refactor!! */

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
  data: ScheduleRecord[],
  filter: string[]
): FlattenedDays {
  let filtered = filterSchedule(data, filter);
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
export function filterSchedule(data: ScheduleRecord[], filter: string[]) {
  if (filter.length === 0) return data;

  return data.filter((talk) => filter.includes(talk.fields.id.toString()));
}

type Days = Record<
  string,
  {
    datetime: Date;
    sessions: Record<
      string,
      {
        datetime: Date;
        talks: ScheduleRecord["fields"][];
      }
    >;
  }
>;

/**
 * Groups the schedule into day, time & sessions
 */
function groupSchedule(schedule: ScheduleRecord[]): Days {
  return schedule.reduce((days, talk) => {
    let datetime = new Date(talk.fields.Start);

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

    days[date].sessions[time].talks.push(talk.fields);

    return days;
  }, {} as Days);
}

export type FlattenedDays = Array<{
  datetime: Date;
  sessions: Array<{
    datetime: Date;
    talks: ScheduleRecord["fields"][];
  }>;
}>;

/**
 * Takes the key'd day/time objects, and reduces to just arrays of objects
 */
function flattenSchedule(days: Days): FlattenedDays {
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
function sortSchedule(days: FlattenedDays): FlattenedDays {
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
                  Object.keys(Tracks).findIndex((name) => name === a.Track) -
                  Object.keys(Tracks).findIndex((name) => name === b.Track)
              ),
          }))
          // Sort Sessions by datetime
          .sort((a, b) => compareAsc(a.datetime, b.datetime)),
      }))
      // Sort Days by datetime
      .sort((a, b) => compareAsc(a.datetime, b.datetime))
  );
}
