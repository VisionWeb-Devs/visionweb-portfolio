import NextLink from "next/link";
import styles from "./Portfolio.module.css";

type ButtonProps = {
  text: string;
  href?: string;
};

const Button = ({ text, href }: ButtonProps) => {
  const content = <>{text}<span aria-hidden="true" className={styles.buttonArrow}>↗</span></>;

  return href ? (
    <NextLink href={href} className={styles.button}>{content}</NextLink>
  ) : (
    <button type="button" className={styles.button}>{content}</button>
  );
};

export default Button;
