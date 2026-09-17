import styles from "./Link.module.css";

type LinkProps = {
  text: string;
};

/**
 * Text-roll label used inside anchors.
 *
 * Renders as a span rather than a block element so it stays valid inside the
 * `<a>` tags that wrap it.
 */
const Link = ({ text }: LinkProps) => {
  return (
    <span className={styles.label}>
      <span>{text}</span>
      <span aria-hidden="true">{text}</span>
    </span>
  );
};

export default Link;
