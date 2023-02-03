import { eventType } from "@/types/firebaseTypes";
import axios from "axios";

export default async function firebaseHelper() {
  type dataType = {
    id: string;
    date: string;
    description: string;
    image: string;
    isFeatured: boolean;
    location: string;
    title: string;
  }[];

  const data: dataType = await axios
    .get(
      "https://next-practice-d9f57-default-rtdb.asia-southeast1.firebasedatabase.app/events.json"
    )
    .then((res) => {
      const events = [];

      for (const key in res.data) {
        events.push({
          id: key,
          ...res.data[key],
        });
      }
      return events;
    });

  function getAllEvents() {
    return data;
  }

  function getFeaturedEvents() {
    if (data) {
      return data.filter((event: eventType) => event.isFeatured);
    }
    return [];
  }

  function getFilteredEvents(dateFilter: { year: number; month: number }) {
    const { year, month } = dateFilter;

    if (data) {
      let filteredEvents = data.filter((event: eventType) => {
        const eventDate = new Date(event.date);
        return (
          eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
        );
      });

      return filteredEvents;
    }
  }

  function getEventById(id: string) {
    if (data) {
      return data.find((event: eventType) => event.id === id);
    }
  }

  return {
    getAllEvents,
    getFeaturedEvents,
    getEventById,
    getFilteredEvents,
  };
}

export async function insertIntoFirebase(payload: any) {
  return await fetch(
    "https://next-practice-d9f57-default-rtdb.asia-southeast1.firebasedatabase.app/events.json",
    {
      method: "POST",
      body: JSON.stringify(payload),
    }
  );
}
