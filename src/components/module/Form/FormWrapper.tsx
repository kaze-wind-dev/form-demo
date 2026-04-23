import styles from './FormWrapper.module.scss';

export const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.formWrapper}>{children}</div>;
};
