import { ReactNode } from 'react';
import classNames from 'classnames';
import { LoadingSwitch } from './Loading';

export enum ButtonVariant {
  primary = 'primary',
  link = 'link',
  linkSecondary = 'link-secondary',
  linkRed = 'link-red',
  secondary = 'secondary',
  secondaryOutline = 'secondary-outline',
  text = 'text',
  blueOutline = 'blue-outline',
  yellowOutline = 'yellow-outline',
  redPale = 'red-pale',
  mslLink = 'mslLink',
  red = 'red',
  successOutline = 'success-outline',
}

type ButtonVariantType =
  | 'primary'
  | 'link'
  | 'link-secondary'
  | 'link-red'
  | 'secondary'
  | 'secondary-outline'
  | 'success-outline'
  | 'text'
  | 'blue-outline'
  | 'yellow-outline'
  | 'red-pale'
  | 'mslLink'
  | 'red';

interface ButtonProps {
  type?: 'submit' | 'reset' | 'button';
  size?: 'small' | 'medium' | 'medium-large' | 'large' | 'auto';
  children: ReactNode;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: ButtonVariantType;
  widthClass?: string;
  paddingClass?: string;
  className?: string;
  prefix?: ReactNode;
  ref?: any;
}

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  size = 'large',
  children,
  widthClass = '',
  paddingClass = 'px-6',
  variant = 'primary',
  loading = false,
  disabled = false,
  className,
  onClick = () => {},
  prefix,
  ref,
}) => {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      className={classNames(
        widthClass,
        className,
        paddingClass,
        'font-medium transition-all duration-200 rounded-md focus:outline-none focus:shadow-outline disabled:cursor-not-allowed disabled:opacity-40 inline-flex items-center justify-center',
        {
          'bg-blue-600 text-white hover:bg-blue-500':
            variant === ButtonVariant.primary,
          'bg-red-100 text-red-500 focus:shadow-outline-red':
            variant === 'red-pale',
          'text-gray-700': variant === ButtonVariant.text,
          'leading-5 font-medium text-blue-600 hover:text-blue-500 cursor-pointer':
            variant === ButtonVariant.mslLink,
          'text-blue-600 hover:bg-blue-50': variant === ButtonVariant.link,
          'text-gray-600 hover:bg-gray-100':
            variant === ButtonVariant.linkSecondary,
          'text-red-600 hover:bg-red-100': variant === ButtonVariant.linkRed,
          'text-green-500 border border-green-500 hover:bg-green-500 hover:text-white':
            variant === ButtonVariant.successOutline,
          'text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white':
            variant === ButtonVariant.blueOutline,
          'text-yellow-500 border border-yellow-500 hover:bg-yellow-500 hover:text-white':
            variant === ButtonVariant.yellowOutline,
          'bg-gray-300 text-gray-700': variant === ButtonVariant.secondary,
          'border border-gray-300 hover:bg-gray-100 text-gray-700':
            variant === ButtonVariant.secondaryOutline,
          'bg-red-600 text-white': variant === ButtonVariant.red,
          'h-6': size === 'small',
          'h-9.5': size === 'medium',
          'h-10.5': size === 'medium-large',
          'h-13': size === 'large',
        },
      )}
      onClick={onClick}
    >
      <span
        className={classNames('text-center w-full', {
          'text-xs': size === 'small',
          'text-sm leading-5': size === 'medium' || size === 'medium-large',
          'text-base leading-6': size === 'large',
        })}
      >
        <LoadingSwitch
          loading={loading}
          animationProps={{
            width: 16,
            height: 16,
            className: 'mx-auto',
          }}
        >
          <div
            className={classNames({
              'flex justify-center': prefix,
            })}
          >
            {prefix && <div className={'mr-2'}>{prefix}</div>}
            <div className="flex items-center justify-center leading-6">
              {children}
            </div>
          </div>
        </LoadingSwitch>
      </span>
    </button>
  );
};

export default Button;
