import styles from './ErrorText.module.scss';

interface ErrorTextProps {
  id: string;
  message: string;
}

export default function ErrorText({ id, message }: ErrorTextProps) {
  return (
    <p className={styles.errorText} role="alert" aria-live="polite" id={id}>
      {message}
    </p>
  );
}
