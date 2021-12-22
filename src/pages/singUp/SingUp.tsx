import { useTranslation } from 'react-i18next';

import logo from 'assets/images/logo.svg';
import shield from 'assets/icons/shield.svg';
import SignUpForm from 'components/SignUpForm';
// import { CodeForm } from 'components/CodeForm';
// import { useNavigate } from 'react-router';

const SignUp = () => {
  const { t } = useTranslation('login');
  function onCodeSend(data: { code: string }) {
    console.log(data.code);
    // navigate('/step-1');
  }

  return (
    <div className="h-screen overflow-y-auto flex">
      <div className="flex-1">
        <div className="bg-gray-50 flex flex-col min-h-screen items-center justify-center py-10 px-5">
          <img src={logo} className="mb-2.5" alt="logo" />
          <h2 className="heading-3xl capitalize max-w-sm text-center">
            {t('login:title')}
          </h2>

          {/* {state.codeSent ? (
            <CodeForm onSubmit={onCodeSend} />
          ) : (
            <SignUpForm onSubmit={onSubmit} />
          )} */}

          <SignUpForm onSubmit={() => {}} />

          <div className="p-2.5 flex items-center mb-2">
            <img src={shield} alt="Transcard" />
            <span className="ml-1 text-xs leading-4 font-medium text-gray-800">
              Powered by
              <span className="font-bold text-gray-900 text-sm">Transcard</span>
            </span>
          </div>

          <div className="grid grid-cols-2 divide-x divide-gray-300">
            <div className="text-gray-500 text-xs leading-5 font-medium px-8">
              Terms of Use
            </div>
            <div className="text-gray-500 text-xs leading-5 font-medium px-8">
              Privacy Policy
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
