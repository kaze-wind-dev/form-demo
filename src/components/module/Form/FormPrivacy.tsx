import ErrorText from '@/components/module/Form/ErrorText';
import styles from './FormPrivacy.module.scss';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';

interface FormValues {
  name: string;
  email: string;
  address: string;
  tel: string;
  topic: string;
  select: string;
  message: string;
  privacy: boolean;
}

export const FormPrivacy = ({
  register,
  errors,
}: {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
}) => {
  return (
    <div className={styles.container}>
      <p className={styles.lead}>
        <a href="/privacy" target="_blank" className={styles.linkLabel}>
          プライバシーポリシー
        </a>
        に同意して送信してください。
      </p>
      <div className={styles.checkboxWrapper}>
        <input
          {...register('privacy', { required: true })}
          type="checkbox"
          id="privacy"
          aria-describedby="privacy-error"
          className={styles.checkbox}
        />
        <label className={styles.label} htmlFor="privacy">
          プライバシーポリシーに同意する
        </label>
        <span className={styles.required}>必須</span>
      </div>
      {errors.privacy && (
        <ErrorText
          id="privacy-error"
          message="プライバシーポリシーに同意してください"
        />
      )}
    </div>
  );
};
