import Link from "next/link";
import classes from "./button.module.css"

type buttonProps = {
    link:string,
    children: string | JSX.Element
}

export default function Button(props:buttonProps){
    return <Link href={props.link} className={classes.btn}>{props.children}</Link>
}