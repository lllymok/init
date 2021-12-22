import { Ref, FormEvent, ReactNode, useState } from 'react';
import { default as PNInput } from 'react-phone-number-input/input';
import { isPossiblePhoneNumber } from 'react-phone-number-input';
import { ExclamationCircleIcon } from 'components/icons';
import PopoverOnHover from 'components/PopoverOnHover';
import classNames from 'classnames';
import {
  FieldError,
  UseFormRegister,
  FieldValues,
  RegisterOptions,
  Controller,
  Control,
} from 'react-hook-form';
import { CountryCode } from 'libphonenumber-js/types';

interface InputProps {
  name: string;
  register?: UseFormRegister<FieldValues>;
  label?: string;
  value?: string;
  type?: 'text' | 'password' | 'textarea' | 'number';
  info?: string;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  error?: FieldError | undefined;
  onBlur?: (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onChange?: (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  ref?: Ref<HTMLInputElement & HTMLTextAreaElement>;
  pattern?: RegExp;
  optional?: boolean;
  iconEnd?: ReactNode;
  iconStart?: ReactNode;
  suffix?: string;
  prefix?: string;
  prefixInline?: boolean;
  suffixInline?: boolean;
  rows?: number;
  validation?: RegisterOptions;
  maxLength?: number;
}

const InputAddOn = ({
  inline,
  value,
  type,
}: {
  inline: boolean;
  value: string;
  type: 'prefix' | 'suffix';
}) =>
  inline ? (
    <div
      className={classNames(
        'absolute flex items-center pointer-events-none inset-y-0',
        type === 'prefix' ? 'left-0 pl-3' : 'right-0 pr-3',
      )}
    >
      <span className="text-gray-500">{value}</span>
    </div>
  ) : (
    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
      {value}
    </span>
  );

export const Input = ({
  name,
  register,
  label,
  type = 'text',
  info,
  className,
  inputClassName,
  error,
  pattern,
  optional,
  iconEnd,
  iconStart,
  prefix,
  prefixInline = false,
  suffix,
  suffixInline = false,
  rows = 2,
  validation = {},
  ...otherProps
}: InputProps) => {
  return (
    <div className={className}>
      {label && (
        <div
          className={classNames(
            'flex justify-between items-center',
            info ? 'mb-2' : 'mb-1',
          )}
        >
          <label className="text-sm leading-5 font-medium text-gray-700">
            {label}
          </label>
          {info && <PopoverOnHover info={info} />}
          {optional && (
            <span className="text-sm leading-5 font-medium text-gray-500">
              Optional
            </span>
          )}
        </div>
      )}

      <div
        className={classNames('relative flex', {
          'rounded-md': prefix && !prefixInline,
        })}
      >
        {prefix && (
          <InputAddOn value={prefix} inline={prefixInline} type="prefix" />
        )}

        {iconStart && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {iconStart}
          </div>
        )}

        {type === 'textarea' ? (
          <textarea
            name={name}
            {...(register && register(name, validation))}
            className={classNames(
              inputClassName,
              'w-full shadow-sm border border-gray-300 py-2 px-3 placeholder-gray-400',
              prefix && !prefixInline
                ? 'rounded-r-md focus:ring-1'
                : 'rounded-md',
              {
                'pl-10': iconStart,
                'pr-10': iconEnd,
              },
              error
                ? 'pr-9 border-red-500 focus:ring-red-500 focus:border-red-500 text-red-900'
                : 'border-gray-300 focus:ring-0 focus:border-indigo-500',
            )}
            rows={rows}
            {...otherProps}
          />
        ) : (
          <input
            name={name}
            {...(register && register(name, validation))}
            type={type}
            className={classNames(
              inputClassName,
              'w-full shadow-sm border border-gray-300 py-2 px-3 placeholder-gray-400',
              prefix && !prefixInline
                ? 'rounded-r-md focus:ring-1'
                : 'rounded-md',
              {
                'pl-10': iconStart,
                'pr-10': iconEnd,
              },
              error
                ? 'pr-9 border-red-500 focus:ring-red-500 focus:border-red-500 text-red-900'
                : 'border-gray-300 focus:ring-0 focus:border-indigo-500',
            )}
            {...otherProps}
          />
        )}

        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon className="text-red-500" />
          </div>
        )}

        {iconEnd && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {iconEnd}
          </div>
        )}

        {suffix && (
          <InputAddOn value={suffix} inline={suffixInline} type="suffix" />
        )}
      </div>

      {error && (
        <p className="text-sm leading-4 mt-2 text-red-600">{error.message}</p>
      )}
    </div>
  );
};

const phoneValidation = {
  validate: (val: string) =>
    isPossiblePhoneNumber(val || '') || 'Please enter valid phone number.',
  required: 'The phone is required.',
};

interface PhoneInputProps extends Omit<InputProps, 'onChange'> {
  control?: Control;
  country?: CountryCode;
}

const countries = [
  {
    id: 1,
    code: 'US',
    placeholder: '+1 (555) 987-6543',
  },
];

export const PhoneInput = ({
  name,
  control,
  label,
  type = 'text',
  info,
  className,
  error,
  optional,
  country = 'US',
  ...otherProps
}: PhoneInputProps) => {
  const [code, setCode] = useState<CountryCode>(country);

  const handleChangeCountry = (e: FormEvent<HTMLSelectElement>) => {
    setCode(e.currentTarget.value as CountryCode);
  };

  return (
    <div className={className}>
      {label && (
        <div
          className={classNames(
            'flex justify-between items-center',
            info ? 'mb-2' : 'mb-1',
          )}
        >
          <label className="text-sm leading-5 font-medium text-gray-700">
            {label}
          </label>
          {info && <PopoverOnHover info={info} />}
          {optional && (
            <span className="text-sm leading-5 font-medium text-gray-500">
              Optional
            </span>
          )}
        </div>
      )}

      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center">
          <select
            name="country"
            autoComplete="country"
            className="h-full py-0 pl-3 pr-7 border-transparent bg-transparent text-gray-500 text-sm leading-5 rounded-md focus:ring-0 focus:border-indigo-500"
            value={code}
            onChange={handleChangeCountry}
          >
            {countries.map((item) => (
              <option value={item.code} key={item.id}>
                {item.code}
              </option>
            ))}
          </select>
        </div>

        <Controller
          name={name}
          control={control}
          rules={phoneValidation}
          render={({ field: { value, onChange } }) => (
            <PNInput
              value={value}
              onChange={onChange}
              defaultCountry={code}
              className={classNames(
                'rounded-md w-full shadow-sm border border-gray-300 py-2 pl-16 placeholder-gray-400',
                error
                  ? 'pr-9 border-red-500 focus:ring-red-500 focus:border-red-500 text-red-900'
                  : 'pr-3 border-gray-300 focus:ring-0 focus:border-indigo-500',
              )}
              placeholder={countries.find((c) => c.code === code)?.placeholder}
              {...otherProps}
            />
          )}
        />

        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon className="text-red-500" />
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm leading-4 mt-2 text-red-600">{error.message}</p>
      )}
    </div>
  );
};

type CurrencyType = {
  code: string;
  symbol: string;
};

const currencies: Array<CurrencyType> = [
  {
    code: 'USD',
    symbol: '$',
  },
  {
    code: 'EUR',
    symbol: '€',
  },
];

export const CurrencyInput = ({
  label,
  type = 'text',
  info,
  className,
  error,
  pattern,
  optional,
  ...otherProps
}: InputProps) => {
  const [currency, setCurrency] = useState<string>('USD');

  const handleChange = (e: FormEvent<HTMLSelectElement>) => {
    setCurrency(e.currentTarget.value);
  };

  return (
    <div className={className}>
      {label && (
        <div
          className={classNames(
            'flex justify-between items-center',
            info ? 'mb-2' : 'mb-1',
          )}
        >
          <label className="text-sm leading-5 font-medium text-gray-700">
            {label}
          </label>
          {info && <PopoverOnHover info={info} />}
          {optional && (
            <span className="text-sm leading-5 font-medium text-gray-500">
              Optional
            </span>
          )}
        </div>
      )}

      <div className="relative">
        <InputAddOn
          value={currencies.find((c) => c.code === currency)?.symbol || ''}
          inline
          type="prefix"
        />

        <input
          type={type}
          className={classNames(
            'rounded-md w-full shadow-sm border border-gray-300 py-2 pr-16 pl-8 placeholder-gray-400',
            error
              ? 'pr-9 border-red-500 focus:ring-red-500 focus:border-red-500 text-red-900'
              : 'pr-3 border-gray-300 focus:ring-0 focus:border-indigo-500',
          )}
          {...otherProps}
        />

        <div className="absolute inset-y-0 right-0 flex items-center">
          <select
            name="currency"
            autoComplete="currency"
            className="h-full py-0 pl-3 pr-7 border-transparent bg-transparent text-gray-500 text-sm leading-5 rounded-md focus:ring-0 focus:border-indigo-500"
            onChange={handleChange}
          >
            {currencies.map((cur) => (
              <option key={cur.code} value={cur.code}>
                {cur.code}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon className="text-red-500" />
          </div>
        )}
      </div>

      {error && (
        <p className="text-xs leading-4 mt-1 text-red-500">{error.message}</p>
      )}
    </div>
  );
};
