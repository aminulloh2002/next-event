import Image from "next/image";
import Button from "../ui/button";
import classes from "./event-item.module.css";
import {
  HiArrowNarrowRight,
  HiOutlineCalendar,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { eventType } from "@/types/firebaseTypes";

export default function EventItem(props: { item: eventType }) {
  const { title, image, date, location, id } = props.item;

  const humanReadableDate = new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedAddress = location.replace(", ", "\n");

  const exploreLink = `/events/${id}`;

  const imgSrc = image.includes("https") ? image : `/${image}`;

  return (
    <li className={classes.item}>
      <Image src={imgSrc} alt={title} width={375} height={240} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <HiOutlineCalendar />
            <time>{humanReadableDate}</time>
          </div>
          <div className={classes.address}>
            <HiOutlineLocationMarker />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={exploreLink}>
            <div>
              <span>Explore Event</span>
              <span className={classes.icon}>
                <HiArrowNarrowRight />
              </span>
            </div>
          </Button>
        </div>
      </div>
    </li>
  );
}
