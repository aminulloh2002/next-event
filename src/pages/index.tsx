import EventList from "@/components/events/event-list";
import { eventsType } from "@/types/firebaseTypes";
import firebaseHelper from "helpers/api-util";

function HomePage(props: { events: eventsType }) {
  const featuredEvents = props.events;

  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
}

export async function getStaticProps() {
  const { getFeaturedEvents } = await firebaseHelper();
  return {
    props: {
      events: getFeaturedEvents(),
    },
    revalidate: 60,
  };
}

export default HomePage;
