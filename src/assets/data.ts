import { TVote } from "@/app/(public)/dao/[id]/_components/tables/columns";

export const routeNav = [
  { name: "About Us", href: "/about-us" },
  { name: "Feature", href: "/feature" },
  { name: "Dao", href: "/dao" },
  { name: "Chat AI", href: "/chat-ai" },
];

export const SECTION_HEIGHT = 1500;

export const dummyVotes: TVote[] = [
  {
    id: "1",
    profile: "https://placecats.com/200/200",
    token: "0xD246...C675",
    choice: "For",
    dates: {
      day: "5d ago",
      full_date: "Jan 29, 2025",
    },
    voting_power: {
      count: 4,
      total: "80.689%",
    },
  },
  {
    id: "2",
    profile: "https://placecats.com/200/200",
    token: "0xa255...4f4E",
    choice: "For",
    dates: {
      day: "5d ago",
      full_date: "Jan 29, 2025",
    },
    voting_power: {
      count: 4,
      total: "16.891%",
    },
  },
  {
    id: "3",
    profile: "https://placecats.com/200/200",
    token: "0xaeB1...630c",
    choice: "For",
    dates: {
      day: "3d ago",
      full_date: "Feb 1, 2025",
    },
    voting_power: {
      count: 4,
      total: "2.419%",
    },
  },
  {
    id: "4",
    profile: "https://placecats.com/200/200",
    token: "0xC7D2...B89E",
    choice: "Againt",
    dates: {
      day: "2d ago",
      full_date: "Feb 2, 2025",
    },
    voting_power: {
      count: 3,
      total: "12.345%",
    },
  },
  {
    id: "5",
    profile: "https://placecats.com/200/200",
    token: "0xA8D1...D76F",
    choice: "For",
    dates: {
      day: "1d ago",
      full_date: "Feb 3, 2025",
    },
    voting_power: {
      count: 5,
      total: "35.500%",
    },
  },
];
