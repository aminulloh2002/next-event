import Link from "next/link";
import classes from "./button.module.css";

type buttonProps = {
  link?: string;
  children: string | JSX.Element;
  onClick?: () => void;
};

export default function Button(props: buttonProps) {
  if (props.link) {
    return (
      <Link href={props.link} className={classes.btn}>
        {props.children}
      </Link>
    );
  }

  return (
    <button className={classes.btn} onClick={props.onClick}>
      {props.children}
    </button>
  );
}
