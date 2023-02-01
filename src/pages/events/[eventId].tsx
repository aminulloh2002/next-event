import EventContent from "@/components/event-detail/event-content";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventSummary from "@/components/event-detail/event-summary";
import ErrorAlert from "@/components/ui/error-alert";
import { getEventById } from "dummy-data";
import { useRouter } from "next/router";

export default function EventDetailPage() {
  const router = useRouter();

  const eventId = router.query.eventId;

  let event = null;

  if (typeof eventId === "string") {
    event = getEventById(eventId);
  }

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics item={event} />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
}
