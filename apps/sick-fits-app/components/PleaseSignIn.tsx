import { ReactNode } from 'react';

import { useUser } from './User';
import { SignIn } from './SignIn';

type PleaseSignInProps = {
  children?: ReactNode;
};

export const PleaseSignIn = ({ children }: PleaseSignInProps) => {
  const me = useUser();

  if (!me) return <SignIn />;

  return <>{children}</>;
};
