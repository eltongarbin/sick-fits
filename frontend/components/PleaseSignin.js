import React from 'react';
import PropTypes from 'prop-types';
import useCurrentUserQuery from './hooks/useCurrentUserQuery';
import Signin from './Signin';

const PleaseSignin = ({ children }) => {
  const { data, loading } = useCurrentUserQuery();

  if (loading) return <p>Loading...</p>;
  if (!data.me) {
    return (
      <div>
        <p>Please Sign In before Continuing</p>
        <Signin />
      </div>
    );
  }

  return children;
};

PleaseSignin.propTypes = {
  children: PropTypes.any.isRequired
};

export default PleaseSignin;
