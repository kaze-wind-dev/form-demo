import { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { actions } from 'astro:actions';
import ErrorText from './ErrorText';
import { FormPrivacy } from './FormPrivacy';
import FormStepper from './FormStepper';
import FormButton from './FormButton';
import styles from './FormContainer.module.scss';

type FormStepStatus = 'input' | 'confirm' | 'success' | 'error';

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

export default function FormContainer() {
  const [status, setStatus] = useState<FormStepStatus>('input');
  const [formData, setFormData] = useState<FormValues | null>(null);
  const confirmMessageRef = useRef<HTMLParagraphElement>(null);
  const successMessageRef = useRef<HTMLParagraphElement>(null);
  const errorMessageRef = useRef<HTMLParagraphElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      address: '',
      tel: '',
      select: '',
      message: '',
      privacy: false,
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (status === 'confirm' && confirmMessageRef.current) {
      if (!confirmMessageRef.current) return;
      confirmMessageRef.current.focus();
    } else if (status === 'success') {
      if (!successMessageRef.current) return;
      successMessageRef.current.focus();
    } else if (status === 'error') {
      if (!errorMessageRef.current) return;
      errorMessageRef.current.focus();
    }
  }, [status]);

  const onConfirm = async () => {
    setFormData(getValues());
    setStatus('confirm');
  };

  const onSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData) return;

    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'privacy' && value) {
          fd.append(key, 'on');
        } else if (value) {
          fd.append(key, String(value));
        }
      });

      const { error } = await actions.send(fd);

      if (error) {
        throw new Error(error.message);
      }

      setStatus('success');
      reset();
    } catch (error) {
      setStatus('error');

      console.error(error);
    }
  };

  return (
    <>
      {status === 'input' && (
        <>
          <FormStepper step="input" />
          <form onSubmit={handleSubmit(onConfirm)}>
            <div className={styles.formContainer}>
              <div className={styles.formRow}>
                <div className={styles.formLabel}>
                  <label htmlFor="name">名前</label>
                  <span className={styles.required}>必須</span>
                </div>
                <div className={styles.formField}>
                  <input
                    {...register('name', { required: true })}
                    type="text"
                    id="name"
                    aria-describedby="name-error"
                    className={errors.name ? styles.hasError : ''}
                  />
                  {errors.name && (
                    <ErrorText
                      id="name-error"
                      message="名前を入力してください"
                    />
                  )}
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formLabel}>
                  <label htmlFor="email">メールアドレス</label>
                  <span className={styles.required}>必須</span>
                </div>
                <div className={styles.formField}>
                  <input
                    {...register('email', {
                      required: 'メールアドレスを入力してください',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: '正しい形式でメールアドレスを入力してください',
                      },
                    })}
                    type="email"
                    id="email"
                    aria-describedby="email-error"
                    className={errors.email ? styles.hasError : ''}
                  />
                  {errors.email && (
                    <ErrorText
                      id="email-error"
                      message={errors.email.message ?? ''}
                    />
                  )}
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formLabel}>
                  <label htmlFor="address">住所</label>
                </div>
                <div className={styles.formField}>
                  <input {...register('address')} type="text" id="address" />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formLabel}>
                  <label htmlFor="tel">電話番号</label>
                </div>
                <div className={styles.formField}>
                  <input
                    {...register('tel', {
                      pattern: {
                        value: /^[\d-]+$/,
                        message: '正しい形式で電話番号を入力してください',
                      },
                    })}
                    type="tel"
                    id="tel"
                    aria-describedby="tel-error"
                  />
                  {errors.tel && (
                    <ErrorText
                      id="tel-error"
                      message={errors.tel.message ?? ''}
                    />
                  )}
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formLabel}>
                  <label htmlFor="select">選択</label>
                </div>
                <div className={styles.formField}>
                  <select {...register('select')} id="select">
                    <option value="">選択してください</option>
                    <option value="option1">オプション1</option>
                    <option value="option2">オプション2</option>
                    <option value="option3">オプション3</option>
                  </select>
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formLabel}>
                  <label htmlFor="message">お問い合わせ内容</label>
                  <span className={styles.required}>必須</span>
                </div>
                <div className={styles.formField}>
                  <textarea
                    {...register('message', { required: true })}
                    id="message"
                    rows={5}
                    className={errors.message ? styles.hasError : ''}
                  />
                  {errors.message && (
                    <ErrorText
                      id="message-error"
                      message="お問い合わせ内容を入力してください"
                    />
                  )}
                </div>
              </div>
            </div>
            <FormPrivacy register={register} errors={errors} />
            <div className={styles.formButtonContainer}>
              <FormButton type="submit">入力内容を確認する</FormButton>
            </div>
          </form>
        </>
      )}
      {status === 'confirm' && (
        <>
          <FormStepper step="confirm" />
          <p
            className={styles.confirmMessage}
            ref={confirmMessageRef}
            tabIndex={-1}
          >
            入力内容を確認してください
          </p>
          <form onSubmit={onSubmit} className={styles.form}>
            <div className={styles.formContainer}>
              <div className={styles.formRow}>
                <div className={styles.formLabel}>
                  <label htmlFor="name">名前</label>
                </div>
                <div className={styles.formField}>{getValues('name')}</div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formLabel}>
                  <label htmlFor="email">メールアドレス</label>
                </div>
                <div className={styles.formField}>{getValues('email')}</div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formLabel}>
                  <label htmlFor="address">住所</label>
                </div>
                <div className={styles.formField}>{getValues('address')}</div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formLabel}>
                  <label htmlFor="tel">電話番号</label>
                </div>
                <div className={styles.formField}>{getValues('tel')}</div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formLabel}>
                  <label htmlFor="select">選択</label>
                </div>
                <div className={styles.formField}>{getValues('select')}</div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formLabel}>
                  <label htmlFor="message">お問い合わせ内容</label>
                </div>
                <div className={styles.formField}>{getValues('message')}</div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formLabel}>
                  <label htmlFor="privacy">
                    プライバシーポリシーに同意する
                  </label>
                </div>
              </div>
            </div>
            <div className={styles.formButtonContainer}>
              <FormButton
                type="button"
                onClick={() => {
                  setStatus('input');
                }}
              >
                入力画面に戻る
              </FormButton>
              <FormButton type="submit">送信する</FormButton>
            </div>
          </form>
        </>
      )}
      {status === 'success' && (
        <>
          <FormStepper step="success" />
          <p
            className={styles.successMessage}
            ref={successMessageRef}
            tabIndex={-1}
          >
            送信が完了しました
          </p>
        </>
      )}
      {status === 'error' && (
        <>
          <p
            className={styles.errorMessage}
            ref={errorMessageRef}
            tabIndex={-1}
          >
            送信に失敗しました
          </p>
        </>
      )}
    </>
  );
}
