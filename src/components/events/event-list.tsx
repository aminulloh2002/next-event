import { eventsType, eventType } from "@/types/firebaseTypes";
import EventItem from "./event-item";
import classes from "./event-list.module.css";

export default function EventList(props: { items: eventsType }) {
  const { items } = props;
  return (
    <ul className={classes.list}>
      {items.map((item: eventType) => (
        <EventItem item={item} key={item.id} />
      ))}
    </ul>
  );
}
