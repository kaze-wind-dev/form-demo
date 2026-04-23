import styles from './ErrorText.module.scss';

interface ErrorTextProps {
  id: string;
  message: string;
}

export default function ErrorText({ id, message }: ErrorTextProps) {
  return (
    <div
      className={styles.errorText}
      role="alert"
      aria-atomic="true"
      aria-live="assertive"
      id={id}
    >
      <span>{message}</span>
    </div>
  );
}
