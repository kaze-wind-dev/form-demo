import type { ButtonHTMLAttributes } from 'react';
import styles from './FormButton.module.scss';

const FormButton = ({
  children,
  ...rest
}: {
  children: React.ReactNode;
  classNames?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>) => {
  return (
    <button className={styles.formButton} {...rest}>
      {children}
    </button>
  );
};

export default FormButton;
