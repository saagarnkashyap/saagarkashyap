import trophies from "./strava-trophies.json";

// Profile values supplied by Saagar; activity embeds update directly on Strava.
export const stravaTrophies = trophies;
export const stravaMedalPhotos = [
  {
    src: "/strava/WhatsApp Image 2026-11-02 at 1.12.05 PM (1).jpeg",
    width: 1280,
    height: 581,
    alt: "A participant wearing a finisher medal at an outdoor event.",
  },
];
export const stravaProfile = {
  url: "https://www.strava.com/athletes/123068868",
  updated: "2026-11-02",
};

export const allTimeStats = [
  { label: "Activities", value: "204" },
  { label: "Distance", value: "4,159.8", unit: "km" },
  { label: "Elevation gain", value: "20,588", unit: "m" },
  { label: "Time", value: "261h 18m" },
];

export const bikes = [
  {
    name: "bhairavi",
    distance: "166.4 km",
    url: "https://www.strava.com/bikes/17241026",
  },
  {
    name: "hemavati",
    distance: "270.4 km",
    url: "https://www.strava.com/bikes/15365059",
  },
  {
    name: "kali",
    distance: "3,433.4 km",
    url: "https://www.strava.com/bikes/15432345",
  },
];

export const bestEfforts = [
  { label: "Longest ride", value: "109.9 km", activity: "18061270930" },
  { label: "Biggest climb", value: "36 m", activity: "17009286961" },
  { label: "Elevation gain", value: "631 m", activity: "18061270930" },
];

export const bestEffortTimes = [
  { label: "5 mile", value: "10:50", activity: "16647402672" },
  { label: "10K", value: "14:38", activity: "16647402672" },
  { label: "10 mile", value: "28:48", activity: "14166810232" },
  { label: "20K", value: "50:33", activity: "16671827947" },
  { label: "30K", value: "1:23:23", activity: "19531050102" },
  { label: "40K", value: "1:51:26", activity: "19531050102" },
  { label: "50K", value: "2:19:23", activity: "19531050102" },
  { label: "80K", value: "4:58:39", activity: "18061270930" },
  { label: "50 mile", value: "5:00:17", activity: "18061270930" },
  { label: "90K", value: "5:37:54", activity: "18061270930" },
  { label: "100K", value: "6:13:27", activity: "18061270930" },
];

// Keep the supplied activity order, with the newest shared ride first.
export const stravaActivities = [
  { id: "19958146653", token: "8ZMmowtmUYOjwKPp786DOPu-XvPqXsgeefdDkWzWYDc" },
  { id: "19553886327", token: "sgtS4PVe9Ub6cf61cCcwoomQBQuOmZmc6um15jzTtOw" },
  { id: "18686832110", token: "R2SP3Z0ESGQfzCo8k-tFGdJjWK7TfHptpjjR3-A5S_I" },
  { id: "18260083376", token: "bbp5Z2g3EUqTWKPLO8652swPON6yXxjoPws4WS0ATRk" },
  { id: "18061270930", token: "e5OuLJhAWj-TP4l1O1FxccmOCwRo9k8jruwR02IHbnM" },
  { id: "17553633686", token: "l8xARTimQK0UQK9QnHwXmdNwyisEZxys5vjHUe02E00" },
  { id: "17401184048", token: "8u3S6twPkwm2DfZmHbckU8ba7Vk_MvDIzQ7mUNTQ9Ls" },
];
