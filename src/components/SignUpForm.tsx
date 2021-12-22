import { useMsal } from '@azure/msal-react';
import { useTranslation } from 'react-i18next';
import { FieldValues, useForm } from 'react-hook-form';

import { loginRequest } from 'config';
import { Input, PhoneInput } from 'components/Input';
import Button from 'components/Button';
import withTranslateFn from 'utils/withTranslate';

const emailValidation = {
  required: withTranslateFn('login', 'email.validation.require'),
  pattern: {
    value: /\S+@\S+\.\S+/,
    message: withTranslateFn('login', 'email.validation.message'),
  },
};

interface SignUpFormProps {
  onSubmit?: (value: any) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit }) => {
  const { t } = useTranslation(['login']);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FieldValues>({
    defaultValues: {},
  });
  const { instance } = useMsal();

  const handleMsaLogin = () => {
    instance.loginRedirect(loginRequest);
  };

  return (
    <form
      // onSubmit={handleSubmit()}
      className="mt-9 mb-12 bg-white p-12 rounded-lg"
    >
      <div className="sm:w-82 mb-7">
        <PhoneInput
          label={t('login:phone.label')}
          info={t('login:phone.info')}
          name="phone"
          error={errors?.phone}
          control={control}
        />
      </div>

      <div className="sm:w-82 mb-7">
        <Input
          name="email"
          placeholder={t('login:email.placeholder')}
          label={t('login:email.label')}
          info={t('login:email.info')}
          register={register}
          error={errors?.email}
          validation={emailValidation}
        />
      </div>

      <Button loading={isSubmitting} type="submit" className="mb-9 w-full">
        {t('common:submit')}
      </Button>
      <div className="flex justify-center">
        <Button variant="mslLink" size="medium" onClick={handleMsaLogin}>
          {t('login:enrolled')}
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;
