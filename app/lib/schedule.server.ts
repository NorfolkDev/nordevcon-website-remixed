import { compareAsc, format } from "date-fns";
import type { ScheduleRecord } from "./airtable.server";
import { TRACKS } from "./constants";

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
): ScheduleData {
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
function filterSchedule(data: ScheduleRecord[], filter: string[]) {
  if (filter.length === 0) return data;

  return data.filter(
    (talk) => talk.fields.Live && filter.includes(talk.fields.id.toString())
  );
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

export type ScheduleData = Array<{
  datetime: Date;
  sessions: Array<{
    datetime: Date;
    talks: ScheduleRecord["fields"][];
  }>;
}>;

/**
 * Takes the key'd day/time objects, and reduces to just arrays of objects
 */
function flattenSchedule(days: Days): ScheduleData {
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
function sortSchedule(days: ScheduleData): ScheduleData {
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
