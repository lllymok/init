import React from 'react';

interface ErrorBoundaryProps {
  errorPlug?: string;
  ErrorPage?: any;
  reportFunc?: (value) => void;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, State> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(message, errorInfo) {
    const { reportFunc } = this.props;
    if (reportFunc) {
      reportFunc({ message: `${message}`, stack: errorInfo.componentStack });
    }
  }

  render() {
    const {
      children,
      errorPlug = 'Something went wrong',
      ErrorPage,
    } = this.props;
    const { hasError } = this.state;
    if (hasError) {
      if (ErrorPage) {
        return <ErrorPage />;
      }
      return errorPlug;
    }

    return children;
  }
}

export default ErrorBoundary;
