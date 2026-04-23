import { FormWrapper } from './FormWrapper';
import styles from './Form.module.scss';

interface FormProps {
  children: React.ReactNode;
}

export default function Form({ children }: FormProps) {
  return <FormWrapper>{children}</FormWrapper>;
}
