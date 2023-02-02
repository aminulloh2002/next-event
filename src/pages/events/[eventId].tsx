import EventContent from "@/components/event-detail/event-content";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventSummary from "@/components/event-detail/event-summary";
import { eventType } from "@/types/firebaseTypes";
import firebaseHelper from "helpers/api-util";

export default function EventDetailPage(props: { event: eventType }) {
  let event = props.event;

  if (!event) {
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
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

export async function getStaticProps(context: { params: { eventId: string } }) {
  const { getEventById } = await firebaseHelper();
  const eventId = context.params.eventId;

  const event = getEventById(eventId);

  if (!event) return { notFound: true };

  return {
    props: {
      event,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const { getFeaturedEvents } = await firebaseHelper();
  const events = await getFeaturedEvents();

  const paths = events.map((e: eventType) => ({ params: { eventId: e.id } }));

  return {
    paths,
    fallback: true,
  };
}
