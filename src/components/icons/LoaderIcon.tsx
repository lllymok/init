import classNames from 'classnames';

export const LoaderIcon = ({ className }: { className?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={classNames('animate-spin', className)}
  >
    <path
      d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM1.6 8C1.6 11.5346 4.46538 14.4 8 14.4C11.5346 14.4 14.4 11.5346 14.4 8C14.4 4.46538 11.5346 1.6 8 1.6C4.46538 1.6 1.6 4.46538 1.6 8Z"
      fill="#E5E7EB"
    />
    <path
      d="M15.2 8C15.6418 8 16.0041 7.64095 15.96 7.20133C15.8821 6.42473 15.6908 5.66226 15.391 4.93853C14.989 3.96793 14.3997 3.08601 13.6569 2.34315C12.914 1.60028 12.0321 1.011 11.0615 0.608964C10.3377 0.309185 9.57526 0.117887 8.79867 0.0399668C8.35905 -0.00414292 8 0.358172 8 0.8C8 1.24183 8.35954 1.59485 8.79792 1.64994C9.36422 1.72109 9.91966 1.86784 10.4492 2.08717C11.2257 2.4088 11.9312 2.88022 12.5255 3.47452C13.1198 4.06881 13.5912 4.77434 13.9128 5.55083C14.1322 6.08034 14.2789 6.63578 14.3501 7.20208C14.4052 7.64046 14.7582 8 15.2 8Z"
      fill="#2563EB"
    />
  </svg>
);
