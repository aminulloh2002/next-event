import EventList from "@/components/events/event-list";
import EventsSearch from "@/components/events/events-search";
import { getAllEvents } from "dummy-data";
import { useRouter } from "next/router";

export default function EventsPage() {
  const events = getAllEvents();
  const router = useRouter();

  function findEventHandler(year: string, month: string) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <div>
      <EventsSearch onSearch={findEventHandler} />
      <EventList items={events} />
    </div>
  );
}
