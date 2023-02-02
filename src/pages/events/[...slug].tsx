import EventList from "@/components/events/event-list";
import ResultsTitle from "@/components/events/results-title";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert";
import { eventsType } from "@/types/firebaseTypes";
import firebaseHelper from "helpers/api-util";

export default function FilteredEventPage(props: {
  isInvalid?: boolean;
  isNotFound?: boolean;
  date: {
    year: number;
    month: number;
  };
  filteredEvents: eventsType;
}) {
  if (props.isInvalid) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter, please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  if (props.isNotFound) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the choosen filter</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const date = new Date(props.date.year, props.date.month - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={props.filteredEvents} />
    </>
  );
}

export async function getServerSideProps(context: { params: any }) {
  const { params } = context;
  const { getFilteredEvents } = await firebaseHelper();

  const filterData = params.slug;

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (isNaN(numYear) || isNaN(numMonth) || numMonth < 1 || numMonth > 12) {
    return {
      props: {
        isInvalid: true,
      },
    };
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return {
      props: {
        isNotFound: true,
      },
    };
  }

  return {
    props: {
      date: {
        year: numYear,
        month: numMonth,
      },
      filteredEvents,
    },
  };
}
