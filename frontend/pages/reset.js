import React from 'react';
import { useRouter } from 'next/router';

import Reset from '../components/Reset';

const ResetPage = () => {
  const { query } = useRouter();

  return (
    <div>
      <Reset resetToken={query.resetToken} />
    </div>
  );
};

export default ResetPage;
