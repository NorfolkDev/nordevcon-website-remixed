export const PRICES = [
  {
    name: "Super Early Bird",
    expires_at: new Date(2022, 10, 22),
    tickets: ["£36", "£63", "£90"],
  },
  {
    name: "Early Bird",
    expires_at: new Date(2023, 0, 22),
    tickets: ["£72", "£126", "£180"],
  },
  {
    name: "Standard",
    expires_at: new Date(2023, 1, 22),
    tickets: ["£90", "£180", "£300"],
  },
];

export type Price = typeof PRICES[number];

export const TRACKS = {
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
