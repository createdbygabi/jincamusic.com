// Challenge started: November 8, 2025 (Day 1)
const CHALLENGE_START_DATE = new Date('2025-11-08');

function getDateForDay(dayNumber) {
  const date = new Date(CHALLENGE_START_DATE);
  date.setDate(date.getDate() + (dayNumber - 1));
  return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD format
}

export const songs = [
  {
    id: 1,
    title: "knight's march",
    image: "/images/songs/01.jpg",
    composedDate: getDateForDay(1),
  },
  {
    id: 2,
    title: "silhouettes",
    image: "/images/songs/02.jpg",
    composedDate: getDateForDay(2),
  },
  {
    id: 3,
    title: "mountains, i guess",
    image: "/images/songs/03.jpg",
    composedDate: getDateForDay(3),
  },
  {
    id: 4,
    title: "abuelita",
    image: "/images/songs/04.jpg",
    composedDate: getDateForDay(4),
  },
  {
    id: 5,
    title: "noir romance",
    image: "/images/songs/05.jpg",
    composedDate: getDateForDay(5),
  },
  {
    id: 6,
    title: "on the road",
    image: "/images/songs/06.jpg",
    composedDate: getDateForDay(6),
  },
  {
    id: 7,
    title: "things of life",
    image: "/images/songs/07.jpg",
    composedDate: getDateForDay(7),
  },
  {
    id: 8,
    title: "bloom",
    image: "/images/songs/08.jpg",
    composedDate: getDateForDay(8),
  },
  {
    id: 9,
    title: "davi's waltz",
    image: "/images/songs/09.jpg",
    composedDate: getDateForDay(9),
  },
  {
    id: 10,
    title: "exp1",
    image: "/images/songs/10.jpg",
    composedDate: getDateForDay(10),
  },
  {
    id: 11,
    title: "life's theater",
    image: "/images/songs/11.jpg",
    composedDate: getDateForDay(11),
  },
  {
    id: 12,
    title: "requiem for angels",
    image: "/images/songs/12.jpg",
    composedDate: getDateForDay(12),
  },
];

// Challenge constants
export const CHALLENGE_START = CHALLENGE_START_DATE.toISOString().split('T')[0];
export const getCurrentDay = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // normalize to start of day
  const start = new Date(CHALLENGE_START_DATE);
  start.setHours(0, 0, 0, 0);
  const diffTime = today - start;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
  return diffDays;
};
export const getCurrentDate = () => {
  return new Date(); // Current date
};

