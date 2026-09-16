import React from "react";
import type { Surface } from "@/types/content";

type BookNowProps = {
  /** The surface of the card this button sits on; the button inverts it. */
  surface: Surface;
};

const BookNow = ({ surface }: BookNowProps) => {
  const inverted = surface === "ink" ? "bg-paper text-ink" : "bg-ink text-paper";

  return (
    <a
      href="#contact"
      className={`${inverted} w-full py-3 xl:py-5 rounded-full block text-center`}
    >
      Book Now
    </a>
  );
};

export default BookNow;
