import { itemsType } from "dummy-data"
import EventItem from "./event-item"
import classes from "./event-list.module.css"

export default function EventList(props:{items:itemsType}){
    const {items} = props
    return <ul className={classes.list}>
        {items.map(item =>  <EventItem item={item} key={item.id} />)}
    </ul>
}