import ErrorText from '@/components/module/Form/ErrorText';
import styles from './FormPrivacy.module.scss';

export const FormPrivacy = ({ register, errors }: { register: any; errors: any }) => {
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
        <ErrorText id="privacy-error" message="プライバシーポリシーに同意してください" />
      )}
    </div>
  );
};
