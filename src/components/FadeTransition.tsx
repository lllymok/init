import React, { ReactNode } from 'react';
import { Transition } from 'react-transition-group';

export const FadeTransition = ({
  children,
  ...rest
}: {
  children: ReactNode;
}) => {
  const nodeRef = React.useRef(null);

  return (
    <Transition
      nodeRef={nodeRef}
      {...rest}
      timeout={100}
      unmountOnExit
      mountOnEnter
    >
      {(state) => (
        <div
          ref={nodeRef}
          style={{
            transition: '0.2s',
            opacity: state === 'entered' ? 1 : 0,
            display: state === 'exited' ? 'none' : 'block',
          }}
        >
          {children}
        </div>
      )}
    </Transition>
  );
};
