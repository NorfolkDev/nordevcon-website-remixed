import { compareAsc, format } from "date-fns";

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
 * @param array data
 * @return array
 */
export function parseSchedule(data: any[], filter: string[] = []) {
  let filtered = filterSchedule(data, filter);
  let days = groupSchedule(filtered);
  let flatten = flattenSchedule(days);
  let sorted = sortSchedule(flatten);

  return sorted.map((day: any) => {
    // Fix the datetime on each day, to the first session
    day.datetime = day.sessions[0].datetime;

    return day;
  });
}

/**
 * Provides the schedule having been filtered by record ids
 */
export function filterSchedule(data: any[], filter: string[]) {
  if (filter.length === 0) return data;

  return data.filter((talk) => filter.includes(talk.fields.id.toString()));
}

/**
 * Groups the schedule into day, time & sessions
 *
 * {
 *   'do LLLL': {
 *     datetime: Date()
 *     sessions: {
 *       'HH:mm': {
 *         datetime: Date()
 *         talks: []
 *       }
 *     }
 *   }
 * }
 *
 * @param array schedule
 * @return object
 */
function groupSchedule(schedule: any) {
  return schedule.reduce((days: any, talk: any) => {
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
  }, {});
}

/**
 * Takes the key'd day/time objects, and reduces to just arrays of objects
 *
 * [
 *   {
 *     day: 'do LLLL'
 *     sessions: [
 *       datetime: Date()
 *       talks: []
 *     ]
 *   }
 * ]
 *
 * @param object days
 * @return array
 */
function flattenSchedule(days: any) {
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
 *
 * @param array days
 * @return array
 */
function sortSchedule(days: any[]) {
  return (
    days
      .map(({ datetime, sessions }) => ({
        datetime,
        sessions: sessions
          .map(({ datetime, talks }: any) => ({
            datetime,
            // Sort Talks by Track
            talks: talks.sort(
              (a: any, b: any) =>
                Object.keys(Tracks).findIndex((name) => name === a.Track) -
                Object.keys(Tracks).findIndex((name) => name === b.Track)
            ),
          }))
          // Sort Sessions by datetime
          .sort((a: any, b: any) => compareAsc(a.datetime, b.datetime)),
      }))
      // Sort Days by datetime
      .sort((a: any, b: any) => compareAsc(a.datetime, b.datetime))
  );
}
