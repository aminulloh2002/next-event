import EventList from "@/components/events/event-list";
import EventsSearch from "@/components/events/events-search";
import { eventsType } from "@/types/firebaseTypes";
import firebaseHelper from "helpers/api-util";
import { useRouter } from "next/router";

export default function EventsPage(props: { events: eventsType }) {
  const router = useRouter();

  function findEventHandler(year: string, month: string) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <div>
      <EventsSearch onSearch={findEventHandler} />
      <EventList items={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  const { getAllEvents } = await firebaseHelper();

  return {
    props: {
      events: getAllEvents(),
    },
    revalidate: 30,
  };
}
