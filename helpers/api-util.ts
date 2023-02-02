import { eventType } from "@/types/firebaseTypes";
import axios from "axios";

export default async function firebaseHelper() {
  const data = await axios
    .get(
      "https://next-practice-d9f57-default-rtdb.asia-southeast1.firebasedatabase.app/events.json"
    )
    .then((res) => {
      return res.data;
    });

  function getAllEvents() {
    return data;
  }

  function getFeaturedEvents() {
    if (data) {
      return data.filter((event: eventType) => event.isFeatured);
    }
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
