import axios from "axios";
import { useRouter } from "next/router";
import { useRef, FormEvent, useState } from "react";
import ErrorAlert from "../ui/error-alert";
import classes from "./event-form.module.css";
export default function EventForm() {
  const [isValidationError, setIsValidationError] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLTextAreaElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const title = titleRef.current?.value;
    const date = dateRef.current?.value;
    const location = addressRef.current?.value;
    const description = descriptionRef.current?.value;
    const image = imageRef.current?.files && imageRef.current.files[0];

    interface payloadInterface {
      title: string | undefined;
      date: string | undefined;
      location: string | undefined;
      description: string | undefined;
      image?: File | null | undefined;
      isFeatured: boolean;
    }

    const payload: payloadInterface = {
      title,
      date,
      location,
      description,
      isFeatured: false,
    };

    const isInvalid = Object.values(payload).find(
      (value) => typeof value !== "string"
    );

    if (image) {
      payload.image = image;
    }

    if (isInvalid || !image?.type.startsWith("image/")) {
      setIsValidationError(true);
      return;
    }

    const formData = new FormData();

    Object.keys(payload).forEach((key: string) => {
      formData.append(key, payload[key as keyof payloadInterface] as Blob);
    });

    axios.post("/api/add-event", formData).then((res) => {
      return router.replace("/events");
    });
  };

  return (
    <div className={classes.formContainer}>
      <div className={classes.card}>
        <h2 className={classes.formHeader}>Add new Events</h2>
        <form
          action="#"
          onSubmit={submitHandler}
          className={classes.form}
          encType="multipart/form-data"
        >
          <div className={classes.control}>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" ref={titleRef} required />
          </div>
          <div className={classes.control}>
            <label htmlFor="date">Date</label>
            <input type="date" id="date" ref={dateRef} required />
          </div>
          <div className={classes.control}>
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              cols={10}
              rows={3}
              ref={addressRef}
              required
            ></textarea>
          </div>
          <div className={classes.control}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              cols={10}
              rows={3}
              ref={descriptionRef}
              required
            ></textarea>
          </div>
          <div className={classes.control}>
            <label htmlFor="image">Image</label>
            <input
              type="file"
              accept="image/*"
              id="image"
              ref={imageRef}
              required
            />
          </div>

          {isValidationError && (
            <ErrorAlert>
              <p style={{ color: "red" }}>Something is invalid</p>
            </ErrorAlert>
          )}

          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}
