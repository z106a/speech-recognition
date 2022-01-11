import { useAuth0 } from '@auth0/auth0-react';
import { NextPage } from 'next';

const AuthLayout: NextPage = (props) => {
  const { children } = props;
  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.log(error);
    return <div>Oops... {error.message}</div>;
  }

  if (isAuthenticated) {
    return <>{children}</>;
  } else {
    return <button onClick={loginWithRedirect}>Log in</button>;
  }
};

export default AuthLayout;
