import clsx from 'clsx';
import styles from './FormStepper.module.scss';

export default function FormStepper({
  step,
}: {
  step: 'input' | 'confirm' | 'success' | 'error';
}) {
  return (
    <ol className={styles.stepper}>
      <li
        className={clsx(
          styles.stepperItem,
          step === 'input' && styles.stepperItemCurrent,
        )}
        aria-current={step === 'input' ? 'step' : undefined}
      >
        <span className={styles.stepperNumber}>STEP1</span>
        <span className={styles.stepperLabel}>入力</span>
      </li>
      <li
        className={clsx(
          styles.stepperItem,
          step === 'confirm' && styles.stepperItemCurrent,
        )}
        aria-current={step === 'confirm' ? 'step' : undefined}
      >
        <span className={styles.stepperNumber}>STEP2</span>
        <span className={styles.stepperLabel}>確認</span>
      </li>
      <li
        className={clsx(
          styles.stepperItem,
          step === 'success' && styles.stepperItemCurrent,
        )}
        aria-current={step === 'success' ? 'step' : undefined}
      >
        <span className={styles.stepperNumber}>STEP3</span>
        <span className={styles.stepperLabel}>送信完了</span>
      </li>
    </ol>
  );
}
