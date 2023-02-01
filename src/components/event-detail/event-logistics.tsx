import LogisticsItem from './logistics-item';
import classes from './event-logistics.module.css';
import Image from 'next/image';
import { HiOutlineCalendar,HiOutlineLocationMarker } from "react-icons/hi";
import { itemType } from 'dummy-data';

function EventLogistics(props:{item:itemType}) {
  const { date, location:address, image, title:imageAlt } = props.item;

  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const addressText = address.replace(', ', '\n');

  return (
    <section className={classes.logistics}>
      <div className={classes.image}>
        <Image src={`/${image}`} alt={imageAlt} height={300} width={300} />
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
