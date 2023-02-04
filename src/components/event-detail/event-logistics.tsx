import LogisticsItem from "./logistics-item";
import classes from "./event-logistics.module.css";
import Image from "next/image";
import { HiOutlineCalendar, HiOutlineLocationMarker } from "react-icons/hi";
import { eventType } from "@/types/firebaseTypes";

function EventLogistics(props: { item: eventType }) {
  const { date, location: address, image, title: imageAlt } = props.item;

  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const addressText = address.replace(", ", "\n");

  const imgSrc = image.includes("https") ? image : `/${image}`;

  return (
    <section className={classes.logistics}>
      <div className={classes.image}>
        <Image src={imgSrc} alt={imageAlt} height={300} width={300} />
      </div>
      <ul className={classes.list}>
        <LogisticsItem icon={HiOutlineCalendar}>
          <time>{humanReadableDate}</time>
        </LogisticsItem>
        <LogisticsItem icon={HiOutlineLocationMarker}>
          <address>{addressText}</address>
        </LogisticsItem>
      </ul>
    </section>
  );
}

export default EventLogistics;
